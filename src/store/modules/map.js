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
      dispatch('setMapView', { position, zoom: 12 });
    },

    setTravelMarker({ dispatch }, data) {
      if (data.length === 0) return;
      const layers = data.map((itm) => {
        return itm;
      });
      dispatch('setMarkers', layers);
    },

    setTravelMarkers({ state, commit }, data) {
      if (state.layerGroup) state.layerGroup.clearLayers();
      let travelIcon = (() => {
        switch (data.page) {
          case 'ScenicSpot':
            return `<i class="fas fa-binoculars"></i>`;
          case 'Restaurant':
            return `<i class="fas fa-utensils"></i>`;
          case 'Hotel':
            return `<i class="fas fa-bed"></i>`;
        }
      })();

      console.log(travelIcon);
      const markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        argumentsspiderfyOnMaxZoom: false,
        maxClusterRadius: 120,
        iconCreateFunction: function (cluster) {
          const markers = cluster.getAllChildMarkers();
          const html = `
            <div class="map-circle" id="map-circle${markers.length}">
              ${travelIcon}
            </div>
            .
          `;
          return L.divIcon({
            html: html,
            className: 'clusterBikeIcon',
            iconSize: L.point(40, 40),
          });
        },
      });
      data.markerData.forEach((itm) => {
        const layer = L.marker(itm.position, { icon: lightMarker });
        markers.addLayer(layer);
      });
      commit('SET_LAYER_GROUP', markers);
      state.OSM.addLayer(markers);

      // const markers = [];
      // data.forEach((itm) => {
      //   const layer = L.marker(itm.position, { icon: lightMarker }).on(
      //     'click',
      //     () => {
      //       console.log(itm.name);
      //     }
      //   );
      //   markers.push(layer);
      // });
      // const layers = L.layerGroup(markers);
      // commit('SET_LAYER_GROUP', layers);
      // state.OSM.addLayer(layers);
    },

    setBlueIconMarker({ state }, position) {
      L.marker(position, { icon: blueMarker }).addTo(state.OSM);
    },
  },
};
