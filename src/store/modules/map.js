import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import Wkt from 'wicket';

const wkt = new Wkt.Wkt();

const createMarker = (position, icon) => {
  return L.marker(position, icon);
};

const createMarkersCluster = () => {
  return L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    argumentsspiderfyOnMaxZoom: false,
    maxClusterRadius: 120,
    iconCreateFunction: (cluster) => {
      const markers = cluster.getAllChildMarkers();
      const html = `<div class="map-circle cluster-circle">${markers.length}</div>`;
      return L.divIcon({
        html,
        className: 'clusterIcon',
        iconSize: L.point(40, 40),
      });
    },
  });
};

const getTravelIcon = (page) => {
  switch (page) {
    case 'ScenicSpot':
      return `<i class="fas fa-binoculars"></i>`;
    case 'Restaurant':
      return `<i class="fas fa-utensils"></i>`;
    case 'Hotel':
      return `<i class="fas fa-bed"></i>`;
  }
};

export default {
  namespaced: true,
  state: {
    OSM: null,
    marker: null,
    markersCluster: null,
    currentPosition: null,
  },
  mutations: {
    SET_OSM(state, map) {
      state.OSM = map;
    },
    SET_MARKER(state, marker) {
      state.marker = marker;
    },
    SET_MARKERS_CLUSTER(state, markersCluster) {
      state.markersCluster = markersCluster;
    },
    SET_CURRENT_POSITION(state, position) {
      state.currentPosition = position;
    },
  },
  actions: {
    buildMap({ commit }, map) {
      commit('SET_OSM', map);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    },

    readCityGeometry(context, geometry) {
      const cityGeometry = wkt.read(geometry).toJson().coordinates;
      return [cityGeometry[1], cityGeometry[0]];
    },

    clearMarkersCluster({ state }) {
      if (state.markersCluster) {
        state.markersCluster.clearLayers();
      }
    },

    setTravelMarkers({ state, commit, dispatch }, data) {
      dispatch('clearMarkersCluster');
      const markersCluster = createMarkersCluster();
      const travelIcon = getTravelIcon(data.page);
      data.markers.forEach((itm) => {
        const html = `<div class="map-circle marker-circle">${travelIcon}</div>`;
        const layer = createMarker(itm.position, {
          icon: L.divIcon({
            html,
            className: 'travelIcon',
            iconSize: L.point(40, 40),
          }),
        });
        const popup = L.popup({
          minWidth: 250,
          className: 'travel-popup',
        }).setContent(
          `
          <p class="popup-name">${itm.name}</p>
          <a class="popup-link" href="#/travel/${data.page}/${itm.id}/${itm.name}">
            <i class="fas fa-link"></i>
          </a>
          `
        );
        layer.bindPopup(popup);
        markersCluster.addLayer(layer);
      });
      commit('SET_MARKERS_CLUSTER', markersCluster);
      state.OSM.addLayer(markersCluster);
    },

    setCurrentPositionMarker({ state, dispatch, commit }, position) {
      dispatch('clearMarkersCluster');
      const html = `<div class="map-circle current-circle"><i class="fas fa-location-arrow"></i></div>`;
      const marker = createMarker(position, {
        icon: L.divIcon({
          html,
          className: 'currentIcon',
          iconSize: L.point(40, 40),
        }),
      });
      commit('SET_MARKER', marker.addTo(state.OSM));
    },

    clearMarker({ state }) {
      if (state.marker) {
        state.OSM.removeLayer(state.marker);
      }
    },
  },
};
