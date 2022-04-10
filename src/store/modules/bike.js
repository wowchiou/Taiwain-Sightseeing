import Api from '@/service';
import BIKE_CITY_STATIONS from '@/utils/bikeCityStations.json';

export default {
  namespaced: true,
  state: {
    bikeStations: null,
    bikeCities: BIKE_CITY_STATIONS,
  },
  mutations: {
    SET_BIKE_STATIONS(state, stations) {
      state.bikeStations = stations;
    },
  },
  actions: {
    fetchBikeStationData({ commit, dispatch }, city) {
      return Promise.all([
        dispatch('fetchBikeStation', city),
        dispatch('fetchBikeAvailability', city),
      ])
        .then(([bikeStations, bikeAvailability]) => {
          const bikes = bikeStations.map((station) => {
            return {
              ...station,
              detail: bikeAvailability.find(
                (bike) => bike.StationUID === station.StationUID
              ),
            };
          });
          commit('SET_BIKE_STATIONS', bikes);
        })
        .catch((err) => {
          throw err;
        });
    },

    fetchBikeStation(context, city) {
      return Api.getBikeStation(city)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    fetchBikeAvailability(context, city) {
      return Api.getBikeAvailability(city)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },
  },
};
