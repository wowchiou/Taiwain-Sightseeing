import Travel from '@/service/travel';

export default {
  namespaced: true,
  state: {
    scenicSpot: null,
  },
  mutations: {
    SET_SCENIC_SPOT(state, spots) {
      state.scenicSpot = spots;
    },
  },
  actions: {
    fetchScenicSpot({ state, commit }) {
      if (state.scenicSpot) return;
      return Travel.getScenicSpot()
        .then((res) => {
          console.log(res);
          commit('SET_SCENIC_SPOT', res.data);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
