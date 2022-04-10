import Api from '@/service';

export default {
  namespaced: true,
  state: {
    selectCity: '',
    travelData: [],
    scenicSpotData: [],
    restaurantData: [],
    hotelData: [],
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
      const scenicSpotData = state.scenicSpotData;
      const restaurantData = state.restaurantData;
      const hotelData = state.hotelData;
      switch (page) {
        case 'ScenicSpot':
          if (scenicSpotData.length !== 0) {
            return scenicSpotData;
          }
          return dispatch('fetchScenicSpot');
        case 'Restaurant':
          if (restaurantData.length !== 0) {
            return restaurantData;
          }
          return dispatch('fetchRestaurant');
        case 'Hotel':
          if (hotelData.length !== 0) {
            return hotelData;
          }
          return dispatch('fetchHotel');
      }
    },

    setTravelData({ state, commit }, page) {
      let travelData = null;
      switch (page) {
        case 'ScenicSpot':
          travelData = state.scenicSpotData;
          break;
        case 'Restaurant':
          travelData = state.restaurantData;
          break;
        case 'Hotel':
          travelData = state.hotelData;
          break;
      }
      commit('SET_TRAVEL_DATA', travelData);
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
