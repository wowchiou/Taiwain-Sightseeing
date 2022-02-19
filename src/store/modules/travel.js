import Travel from '@/service/travel';

export default {
  namespaced: true,
  state: {
    selectCity: '',
    travelData: null,
  },
  mutations: {
    SET_TRAVEL_DATA(state, data) {
      state.travelData = data;
    },
    SET_SELECT_CITY(state, city) {
      state.selectCity = city;
    },
  },
  actions: {
    fetchTravelData({ dispatch }, page) {
      switch (page) {
        case 'ScenicSpot':
          return dispatch('fetchScenicSpot');
        case 'Restaurant':
          break;
        case 'Hotel':
          break;

        default:
          break;
      }
    },

    fetchScenicSpot({ dispatch }) {
      return Travel.getScenicSpot()
        .then((res) => {
          return dispatch('onSuccess', res);
        })
        .catch((err) => {
          throw err;
        });
    },

    onSuccess({ commit }, res) {
      console.log(res);
      commit('SET_TRAVEL_DATA', res.data);
      return res.data;
    },
  },
};
