import L from 'leaflet';
import Wkt from 'wicket';

const wkt = new Wkt.Wkt();

export default {
  namespaced: true,
  state: {
    OSM: null,
    layerGroup: null,
    currentPosition: null,
  },
  mutations: {
    SET_OSM(state, map) {
      state.OSM = map;
    },
    SET_LAYER_GROUP(state, layerGroup) {
      state.layerGroup = layerGroup;
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

    setCityCenter({ dispatch }, positionData) {
      const cityGeometry = wkt
        .read(positionData[0].Geometry)
        .toJson().coordinates;
      const position = [cityGeometry[1], cityGeometry[0]];
      dispatch('setMapView', { position, zoom: 10 });
    },

    setCircleMarker({ state, commit }, data) {
      if (data.length === 0) return;
      if (state.layerGroup) state.layerGroup.clearLayers();
      const layers = [];
      data.forEach((itm) => {
        const lat = itm.Position.PositionLat;
        const lng = itm.Position.PositionLon;
        const layer = new L.circleMarker([lat, lng], {
          radius: 5,
          className: 'myCircle',
          weight: 1,
          fill: true,
          fillOpacity: 1,
        });
        layers.push(layer);
      });
      commit('SET_LAYER_GROUP', L.layerGroup(layers));
      state.OSM.addLayer(state.layerGroup);
    },
  },
};
