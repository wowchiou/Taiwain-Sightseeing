import Api from '@/service';

export default {
  namespaced: true,
  state: {
    selectCity: '',
    travelData: null,
    scenicSpotData: null,
    restaurantData: null,
    hotelData: null,
    keywords: '',
    activeID: '',
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
    SET_KEYWORDS(state, keywords) {
      state.keywords = keywords;
    },
    SET_ACTIVE_ID(state, id) {
      state.activeID = id;
    },
  },
  actions: {
    clearSearchBar({ commit }) {
      commit('SET_SELECT_CITY', '');
      commit('SET_KEYWORDS', '');
      commit('SET_TRAVEL_DATA', null);
      commit('SET_ACTIVE_ID', '');
    },

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
      return Api.getScenicSpot()
        .then((res) => {
          commit('SET_SCENIC_SPOT_DATA', res.data);
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },

    fetchRestaurant({ commit }) {
      return Api.getRestaurant()
        .then((res) => {
          commit('SET_RESTAURANT_DATA', res.data);
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },

    fetchHotel({ commit }) {
      return Api.getHotel()
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
