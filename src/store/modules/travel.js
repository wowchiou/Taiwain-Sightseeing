import Travel from '@/service/travel';

export default {
  namespaced: true,
  state: {
    selectCity: '',
    scenicSpot: null,
  },
  mutations: {
    SET_SCENIC_SPOT(state, spots) {
      state.scenicSpot = spots;
    },
    SET_SELECT_CITY(state, city) {
      state.selectCity = city;
    },
  },
  actions: {
    fetchScenicSpot({ commit }) {
      return Travel.getScenicSpot()
        .then((res) => {
          console.log(res);
          commit('SET_SCENIC_SPOT', res.data);
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
