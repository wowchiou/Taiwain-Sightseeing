import Api from '@/service';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    fetchBikeStation(context, city) {
      return Api.getBikeStation(city)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },

    fetchBikeAvailability(context, city) {
      return Api.getBikeAvailability(city)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },
  },
};
