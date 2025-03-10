import Api from '@/service';

export default {
  namespaced: true,
  state: {
    busCity: '',
    busRoutes: [],
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

    async getBusTotalData({ commit, dispatch }, city) {
      try {
        const busCityRoutes = await dispatch('fetchBusCityRoute', city);
        const busCityStopOfRoute = await dispatch(
          'fetchBusCityStopOfRoute',
          city
        );

        const busTotalResult = busCityRoutes.map((route) => {
          return {
            ...route,
            detail: busCityStopOfRoute.find(
              (stop) => stop.RouteUID === route.RouteUID
            ),
          };
        });
        console.log(busTotalResult);
        commit('SET_BUS_ROUTES', busTotalResult);
      } catch (error) {
        throw new Error(error);
      }
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
    fetchRealTimeOfArrival(context, { city, route }) {
      return Api.getRealTimeOfArrival(city, route)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    // 獲取指定客運路線的站牌資訊
    fetchBusStopOfRoute(context, { city, route }) {
      return Api.getBusStopOfRoute(city, route)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    // 獲取指定客運路線的預估到站資料
    fetchEstimatedTimeOfArrival(context, { city, route }) {
      return Api.getEstimatedTimeOfArrival(city, route)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    // 獲取指定客運路線線型
    fetchBusShape(context, { city, route }) {
      return Api.getBusShape(city, route)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },
  },
};
