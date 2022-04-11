import Leaflet from '@/utils/leaflet.utils.js';
import Wkt from '@/utils/wkt.utils.js';
import helper from '@/helpers/store/map.helper.js';

const stopsFeatureGroup = Leaflet.createFeatureGroup();
const busFeatureGroup = Leaflet.createFeatureGroup();

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
      Leaflet.setTitleLayer(map);
    },

    setLocationOfCityOnMap({ dispatch, rootState }, cityName) {
      dispatch('fetchCityAddress', cityName, {
        root: true,
      }).then(([cityPosition]) => {
        const cityGeometry = Wkt.getCityGeometry(cityPosition.Geometry);
        rootState.map.OSM.setView(cityGeometry, 12);
      });
    },

    clearMarkersCluster({ state }) {
      const markersCluster = state.markersCluster;
      if (markersCluster) markersCluster.clearLayers();
    },

    setCurrentPositionMarker({ state, dispatch, commit }, position) {
      dispatch('clearMarkersCluster');
      const markerHtml = helper.getCurrentMarkerHtml();
      const icon = Leaflet.getDivIcon(markerHtml, 'currentIcon');
      const marker = Leaflet.createMarker(position, { icon });
      commit('SET_MARKER', marker.addTo(state.OSM));
    },

    setTravelMarkers({ state, commit, dispatch }, { page, markers }) {
      dispatch('clearMarkersCluster');
      const markersCluster = Leaflet.createMarkersCluster();
      const travelIcon = helper.getTravelIcon(page);
      markers.forEach((itm) => {
        const { position, name, id } = itm;
        const markerHtml = helper.getTravelMarkerHtml(travelIcon);
        const icon = Leaflet.getDivIcon(markerHtml, 'travelIcon');
        const marker = Leaflet.createMarker(position, { icon });
        const popupOption = { minWidth: 250, className: 'travel-popup' };
        const popupContent = helper.getPopupContent({ name, page, id });
        const popup = Leaflet.getPopup(popupOption, popupContent);
        marker.bindPopup(popup).on('click', () => marker.openPopup());
        markersCluster.addLayer(marker);
      });
      commit('SET_MARKERS_CLUSTER', markersCluster);
      state.OSM.addLayer(markersCluster);
    },

    setBikeMarkers({ state, commit, dispatch }, bikeStations) {
      dispatch('clearMarkersCluster');
      const markersCluster = Leaflet.createMarkersCluster();
      bikeStations.forEach((bike) => {
        const { StationPosition, detail, ServiceType, StationName } = bike;
        const bikePosition = [
          StationPosition.PositionLat,
          StationPosition.PositionLon,
        ];
        const markerHtml = helper.getBikeMarkerHtml();
        const icon = Leaflet.getDivIcon(markerHtml, 'travelIcon');
        const marker = Leaflet.createMarker(bikePosition, { icon });
        const status = helper.getBikeStationStatus(detail.ServiceStatus);
        const type = helper.getBikeType(ServiceType);
        const name = helper.formateBikeStationName(StationName.Zh_tw);
        const popupOption = { minWidth: 250, className: 'bike-popup' };
        const popupContent = getPopupContent();
        const popup = Leaflet.getPopup(popupOption, popupContent);
        marker.bindPopup(popup).on('click', () => marker.openPopup());
        markersCluster.addLayer(marker);

        function getPopupContent() {
          return `
          <div class="bike-header">
            <div class="bike-top">
              <p class="bike-status ${status.class}">${status.text}</p>
              <div class="bike-type">${type}</div>
            </div>
            <p class="bike-name">${name}</p>
          </div>
          <div class="bike-body">
            <p class="bike-rent">可出借<span>${detail.AvailableRentBikes}</span>輛</p>
            <p class="bike-return">可歸還<span>${detail.AvailableReturnBikes}</span>輛</p>
          </div>`;
        }
      });
      commit('SET_MARKERS_CLUSTER', markersCluster);
      state.OSM.addLayer(markersCluster);
    },

    setBusStopsMarker({ state }, stops) {
      stopsFeatureGroup.clearLayers();
      stops.forEach((stop, idx) => {
        const { StopPosition, StopName } = stop;
        const lat = StopPosition.PositionLat;
        const lng = StopPosition.PositionLon;
        if (idx === 0) state.OSM.setView([lat, lng], 14);
        const markerHtml = helper.getBusStopMarkerHtml(idx++);
        const icon = Leaflet.getDivIcon(markerHtml, 'stop-icon', [20, 20]);
        const marker = Leaflet.createMarker([lat, lng], { icon });
        const popupOption = { minWidth: 150, className: 'stop-popup' };
        const popupContent = `<p>${StopName.Zh_tw}</p>`;
        const popup = Leaflet.getPopup(popupOption, popupContent);
        marker.bindPopup(popup).on('click', () => marker.openPopup());
        stopsFeatureGroup.addLayer(marker);
      });
      state.OSM.addLayer(stopsFeatureGroup);
    },

    setBusMarker({ state }, busRealTimeData) {
      busFeatureGroup.clearLayers();
      busRealTimeData.forEach((bus) => {
        const { BusPosition, PlateNumb, DutyStatus } = bus;
        const lat = BusPosition.PositionLat;
        const lng = BusPosition.PositionLon;
        let busStatus = helper.getBusStatus(DutyStatus);
        const markerHtml = helper.getBusMarkerHtml(PlateNumb);
        const markerClass = `bus-icon ${busStatus}`;
        const icon = Leaflet.getDivIcon(markerHtml, markerClass);
        const marker = Leaflet.createMarker([lat, lng], { icon });
        busFeatureGroup.addLayer(marker);
      });
      state.OSM.addLayer(busFeatureGroup);
    },

    setBusRouteShape({ state }, { Geometry }) {
      if (pathLayer) state.OSM.removeLayer(pathLayer);
      const wktShapeGEO = Wkt.getShapeGeometry(Geometry);
      pathLayer = Leaflet.getAntPathLayer(wktShapeGEO);
      state.OSM.addLayer(pathLayer);
      state.OSM.fitBounds(pathLayer.getBounds());
    },

    clearBusMap({ state }) {
      if (pathLayer) state.OSM.removeLayer(pathLayer);
      busFeatureGroup.clearLayers();
      stopsFeatureGroup.clearLayers();
    },
  },
};
