import { createStore } from 'vuex';
import Service from '@/service';

import map from './modules/map';
import travel from './modules/travel';

export default createStore({
  modules: { map, travel },
  state: {
    cities: null,
    cityAddress: {},
  },
  mutations: {
    SET_CITIES(state, cities) {
      state.cities = cities;
    },
    SET_CITY_ADDRESS(state, address) {
      state.cityAddress[address.name] = address.data;
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
    fetchCityAddress({ state, commit }, cityName) {
      if (state.cityAddress[cityName]) {
        return state.cityAddress[cityName];
      }
      return Service.getCityAddress(cityName)
        .then((res) => {
          commit('SET_CITY_ADDRESS', { name: cityName, data: res.data });
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
