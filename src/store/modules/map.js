import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import { antPath } from 'leaflet-ant-path';
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

const stationStatus = (status) => {
  switch (status) {
    case 0:
      return { class: 'error', text: '停止營運' };
    case 1:
      return { class: 'success', text: '正常營運' };
    case 2:
      return { class: 'warn', text: '暫停營運' };
  }
};

const bikeType = (type) => {
  switch (type) {
    case 1:
      return 'YouBike1.0';
    case 2:
      return 'YouBike2.0';
  }
};

const formateStationName = (name) => {
  const stationName = name.split('_');
  return stationName.length > 1
    ? stationName[stationName.length - 1]
    : stationName[0];
};

const stopsFeatureGroup = L.featureGroup();
const busFeatureGroup = L.featureGroup();
let pathLayer = null;

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

    // clearMarker({ state }) {
    //   if (state.marker) {
    //     state.OSM.removeLayer(state.marker);
    //   }
    // },

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
        layer.bindPopup(popup).on('click', () => {
          layer.openPopup();
        });
        markersCluster.addLayer(layer);
      });
      commit('SET_MARKERS_CLUSTER', markersCluster);
      state.OSM.addLayer(markersCluster);
    },

    setBikeMarkers({ state, commit, dispatch }, data) {
      dispatch('clearMarkersCluster');
      const markersCluster = createMarkersCluster();
      data.forEach((bike) => {
        const html = `<div class="map-circle marker-circle"><i class="fas fa-bicycle"></i></div>`;
        const bikePosition = [
          bike.StationPosition.PositionLat,
          bike.StationPosition.PositionLon,
        ];
        const layer = createMarker(bikePosition, {
          icon: L.divIcon({
            html,
            className: 'travelIcon',
            iconSize: L.point(40, 40),
          }),
        });
        const status = stationStatus(bike.detail.ServiceStatus);
        const type = bikeType(bike.ServiceType);
        const name = formateStationName(bike.StationName.Zh_tw);
        const popup = L.popup({
          minWidth: 250,
          className: 'bike-popup',
        }).setContent(
          `
          <div class="bike-header">
            <div class="bike-top">
              <p class="bike-status ${status.class}">${status.text}</p>
              <div class="bike-type">${type}</div>
            </div>
            <p class="bike-name">${name}</p>
          </div>
          <div class="bike-body">
            <p class="bike-rent">可出借<span>${bike.detail.AvailableRentBikes}</span>輛</p>
            <p class="bike-return">可歸還<span>${bike.detail.AvailableReturnBikes}</span>輛</p>
          </div>
          `
        );
        layer.bindPopup(popup).on('click', () => {
          layer.openPopup();
        });
        markersCluster.addLayer(layer);
      });
      commit('SET_MARKERS_CLUSTER', markersCluster);
      state.OSM.addLayer(markersCluster);
    },

    setBusStopsMarker({ state }, stops) {
      // console.log(stops);
      stopsFeatureGroup.clearLayers();
      stops.forEach((stop, idx) => {
        const lat = stop.StopPosition.PositionLat;
        const lng = stop.StopPosition.PositionLon;
        if (idx === 0) {
          state.OSM.setView([lat, lng], 14);
        }
        const html = `<div class="stop-marker"><span>${idx + 1}</span></div>`;
        const marker = createMarker([lat, lng], {
          icon: L.divIcon({
            html,
            className: 'stop-icon',
            iconSize: L.point(20, 20),
          }),
        });
        const popup = L.popup({
          minWidth: 150,
          className: 'stop-popup',
        }).setContent(`<p>${stop.StopName.Zh_tw}</p>`);
        marker.bindPopup(popup).on('click', () => {
          marker.openPopup();
        });
        stopsFeatureGroup.addLayer(marker);
      });
      state.OSM.addLayer(stopsFeatureGroup);
    },

    setBusMarker({ state }, busRealTimeData) {
      busFeatureGroup.clearLayers();
      busRealTimeData.forEach((bus) => {
        const lat = bus.BusPosition.PositionLat;
        const lng = bus.BusPosition.PositionLon;
        const html = `<div class="bus-marker"><i class="fas fa-bus"></i><span>${bus.PlateNumb}</span></div>`;
        const marker = createMarker([lat, lng], {
          icon: L.divIcon({
            html,
            className: 'bus-icon',
            iconSize: L.point(40, 40),
          }),
        });
        busFeatureGroup.addLayer(marker);
      });
      state.OSM.addLayer(busFeatureGroup);
    },

    setBusRouteShape({ state }, busShape) {
      if (pathLayer) {
        state.OSM.removeLayer(pathLayer);
      }
      const shapeGEO = busShape.Geometry;
      const wktShapeGEO = wkt
        .read(shapeGEO)
        .toJson()
        .coordinates.map((itm) => itm.reverse());
      pathLayer = antPath(wktShapeGEO, {
        delay: 800,
        dashArray: [15, 30],
        weight: 5,
        color: '#58c5d7',
        pulseColor: '#FFFFFF',
        paused: false,
        reverse: false,
        hardwareAccelerated: true,
        opacity: 0.9,
      });
      state.OSM.addLayer(pathLayer);
      state.OSM.fitBounds(pathLayer.getBounds());
    },
  },
};
