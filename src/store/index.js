import { createStore } from 'vuex';
import Service from '@/service';
import { StopBodyScroll } from '@/utils';

import map from './modules/map';
import travel from './modules/travel';

const stopBodyScroll = new StopBodyScroll();

export default createStore({
  modules: { map, travel },
  state: {
    loader: false,
    cities: null,
    cityAddress: {},
  },
  mutations: {
    SET_LOADER(state, loading) {
      state.loader = loading;
    },
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
    showLoader({ commit }, loading) {
      if (loading) {
        stopBodyScroll.fixedBody();
      } else {
        stopBodyScroll.scrollBody();
      }
      commit('SET_LOADER', loading);
    },

    fetchCity({ commit }) {
      return Service.getCity()
        .then((city) => {
          commit('SET_CITIES', city.data);
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
          throw err;
        });
    },
  },
});
