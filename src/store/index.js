import { createStore as vuexCreateStore } from 'vuex';
import Api from '@/service';
import { StopBodyScroll } from '@/utils';

import map from './modules/map';
import travel from './modules/travel';
import bike from './modules/bike';
import bus from './modules/bus';

const stopBodyScroll = new StopBodyScroll();

const storeConfiguration = {
  modules: { map, travel, bike, bus },
  state: {
    loader: false,
    cities: null,
    cityAddress: {},
    mapActive: false,
  },
  mutations: {
    SET_LOADER(state, loading) {
      state.loader = loading;
    },
    SET_CITIES(state, cities) {
      state.cities = cities;
    },
    SET_CITY_ADDRESS(state, { name, data }) {
      state.cityAddress[name] = data;
    },
    SET_MAP_ACTIVE(state, active) {
      state.mapActive = active;
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
      return Api.getCity()
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
      return Api.getCityAddress(cityName)
        .then((res) => {
          commit('SET_CITY_ADDRESS', { name: cityName, data: res.data });
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};

const defaultOverrides = {
  state: () => {
    return {};
  },
};

function makeState(initialState, overrideState) {
  return {
    ...(typeof initialState === 'function' ? initialState() : initialState),
    ...overrideState(),
  };
}

export function createStore(storeOverrides = defaultOverrides) {
  return vuexCreateStore({
    ...storeConfiguration,
    ...storeOverrides,
    ...{
      state: makeState(storeConfiguration.state, storeOverrides.state),
    },
  });
}

export default createStore();
