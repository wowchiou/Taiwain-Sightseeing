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
          return dispatch('fetchRestaurant');
        case 'Hotel':
          return dispatch('fetchHotel');
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

    fetchRestaurant({ dispatch }) {
      return Travel.getRestaurant()
        .then((res) => {
          return dispatch('onSuccess', res);
        })
        .catch((err) => {
          throw err;
        });
    },

    fetchHotel({ dispatch }) {
      return Travel.getHotel()
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
