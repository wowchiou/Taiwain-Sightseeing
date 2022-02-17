import { createStore } from 'vuex';
import Service from '@/service';

import map from './modules/map';
import travel from './modules/travel';

export default createStore({
  modules: { map, travel },
  state: {
    cities: null,
  },
  mutations: {
    SET_CITIES(state, cities) {
      state.cities = cities;
    },
  },
  getters: {
    getCities(state) {
      return state.cities || [];
    },
  },
  actions: {
    fetchCity({ commit }) {
      return Service.getCity()
        .then((cities) => {
          commit('SET_CITIES', cities.data);
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchCityAddress(context, cityName) {
      return Service.getCityAddress(cityName)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
