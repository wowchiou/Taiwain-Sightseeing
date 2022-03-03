import Api from '@/service';

export default {
  namespaced: true,
  state: {
    busCity: null,
    busRoutes: null,
    busKeyWords: '',
  },
  mutations: {
    SET_BUS_CITY(state, city) {
      state.busCity = city;
    },
    SET_BUS_ROUTES(state, routes) {
      state.busRoutes = routes;
    },
    SET_BUS_KEYWORDS(state, keywords) {
      state.busKeyWords = keywords;
    },
  },
  actions: {
    resetBusState({ commit }) {
      commit('SET_BUS_CITY', null);
      commit('SET_BUS_ROUTES', null);
      commit('SET_BUS_KEYWORDS', '');
    },

    // 獲取指定城市所有客運路線
    fetchBusCityRoute(context, city) {
      return Api.getBusCityRoute(city)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    // 獲取指定城市所有客運路線的站牌資訊
    fetchBusCityStopOfRoute(context, city) {
      return Api.getBusCityStopOfRoute(city)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    // 獲取指定路線上各個客運當前位置
    fetchRealTimeOfArrival(context, bus) {
      return Api.getRealTimeOfArrival(bus.city, bus.route)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    // 獲取指定客運路線的站牌資訊
    fetchBusStopOfRoute(context, bus) {
      return Api.getBusStopOfRoute(bus.city, bus.route)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    // 獲取指定客運路線的預估到站資料
    fetchEstimatedTimeOfArrival(context, bus) {
      return Api.getEstimatedTimeOfArrival(bus.city, bus.route)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    // 獲取指定客運路線線型
    fetchBusShape(context, bus) {
      return Api.getBusShape(bus.city, bus.route)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },
  },
};
