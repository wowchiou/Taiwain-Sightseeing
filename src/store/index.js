import { createStore } from 'vuex';

import map from './modules/map';
import travel from './modules/travel';

const baseRout =
  process.env.NODE_ENV === 'production' ? '/Taiwain-Sightseeing/' : '/';

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
      return fetch(baseRout + 'data/city.json')
        .then((res) => res.json())
        .then((cities) => {
          console.log(cities);
          commit('SET_CITIES', cities);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
});
