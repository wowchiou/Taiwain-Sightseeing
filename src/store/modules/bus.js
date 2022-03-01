import Api from '@/service';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
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
    fetchBusTimeOfArrival(context, bus) {
      return Api.getBusTimeOfArrival(bus.city, bus.route)
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
  },
};
