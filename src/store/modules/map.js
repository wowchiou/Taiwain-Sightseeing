import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import Wkt from 'wicket';

const wkt = new Wkt.Wkt();

const lightMarker = L.icon({
  iconUrl: '/images/marker-light.png',
  iconSize: [40, 40],
  iconAnchor: [20, 35],
  popupAnchor: [-3, -76],
});

const blueMarker = L.icon({
  iconUrl: '/images/marker-blue.png',
  iconSize: [40, 40],
  iconAnchor: [20, 35],
  popupAnchor: [-3, -76],
});

const createMarker = (position, icon) => {
  return L.marker(position, icon);
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

    setMapView({ state }, data) {
      state.OSM.setView(data.position, data.zoom);
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
      dispatch('clearMarker');
      const travelIcon = getTravelIcon(data.page);
      const markersCluster = L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        argumentsspiderfyOnMaxZoom: false,
        maxClusterRadius: 120,
        iconCreateFunction: (cluster) => {
          const markers = cluster.getAllChildMarkers();
          const html = `
              <div class="map-circle">
                ${travelIcon}
                <p>${markers.length}</p>
              </div>
              .
            `;
          return L.divIcon({
            html: html,
            className: 'clusterTravelIcon',
            iconSize: L.point(40, 40),
          });
        },
      });
      data.markers.forEach((itm) => {
        const layer = createMarker(itm.position, { icon: lightMarker });
        markersCluster.addLayer(layer);
      });
      commit('SET_MARKERS_CLUSTER', markersCluster);
      state.OSM.addLayer(markersCluster);
    },

    setDetailMarker({ state, dispatch }, position) {
      dispatch('clearMarkersCluster');
      dispatch('clearMarker');
      const marker = createMarker(position, { icon: lightMarker });
      marker.addTo(state.OSM);
    },

    setCurrentPositionMarker({ state, dispatch, commit }, position) {
      dispatch('clearMarkersCluster');
      dispatch('clearMarker');
      const marker = createMarker(position, { icon: blueMarker });
      commit('SET_MARKER', marker.addTo(state.OSM));
    },

    clearMarker({ state }) {
      if (state.marker) {
        state.OSM.removeLayer(state.marker);
      }
    },
  },
};
