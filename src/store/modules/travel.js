import Travel from '@/service/travel';

export default {
  namespaced: true,
  state: {
    selectCity: '',
    travelData: null,
    scenicSpotData: null,
    restaurantData: null,
    hotelData: null,
  },
  mutations: {
    SET_TRAVEL_DATA(state, data) {
      state.travelData = data;
    },
    SET_SCENIC_SPOT_DATA(state, data) {
      state.scenicSpotData = data;
    },
    SET_RESTAURANT_DATA(state, data) {
      state.restaurantData = data;
    },
    SET_HOTEL_DATA(state, data) {
      state.hotelData = data;
    },
    SET_SELECT_CITY(state, city) {
      state.selectCity = city;
    },
  },
  actions: {
    fetchTravelData({ state, dispatch }, page) {
      switch (page) {
        case 'ScenicSpot':
          if (state.scenicSpotData) {
            return state.scenicSpotData;
          }
          return dispatch('fetchScenicSpot');
        case 'Restaurant':
          if (state.restaurantData) {
            return state.restaurantData;
          }
          return dispatch('fetchRestaurant');
        case 'Hotel':
          if (state.hotelData) {
            return state.hotelData;
          }
          return dispatch('fetchHotel');
      }
    },

    fetchScenicSpot({ commit }) {
      return Travel.getScenicSpot()
        .then((res) => {
          commit('SET_SCENIC_SPOT_DATA', res.data);
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },

    fetchRestaurant({ commit }) {
      return Travel.getRestaurant()
        .then((res) => {
          commit('SET_RESTAURANT_DATA', res.data);
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },

    fetchHotel({ commit }) {
      return Travel.getHotel()
        .then((res) => {
          commit('SET_HOTEL_DATA', res.data);
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
