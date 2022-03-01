import Api from '@/service';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    fetchBusCityRoute(context, city) {
      return Api.getBusCityRoute(city)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    fetchBusStopOfRoute(context, city) {
      return Api.getBusStopOfRoute(city)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },
  },
};
