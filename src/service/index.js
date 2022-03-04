import axios from 'axios';
import router from '@/router';
import store from '@/store';
import { GetAuthorizationHeader } from '@/utils';

const getAuthorizationHeader = GetAuthorizationHeader();
let counterFor403 = 0;

export const httpTDX = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC',
  headers: getAuthorizationHeader,
});

export const httpGIST = axios.create({
  baseURL: 'https://gist.motc.gov.tw/gist_api',
  headers: getAuthorizationHeader,
});

// Add a response interceptor
httpGIST.interceptors.response.use(
  function onSuccess(response) {
    counterFor403 = 0;
    return response;
  },
  function onFailed(error) {
    console.log(error);
    const { status, config } = error.response;
    if (status === 403) {
      http403Error(httpGIST, config);
    }
    return Promise.reject(error);
  }
);

httpTDX.interceptors.response.use(
  function onSuccess(response) {
    counterFor403 = 0;
    return response;
  },
  function onFailed(error) {
    console.log(error);
    const { status, config } = error.response;
    if (status === 403) {
      http403Error(httpTDX, config);
    }
    return Promise.reject(error);
  }
);

function http403Error(instance, config) {
  if (counterFor403 < 4) {
    counterFor403++;
    instance(config);
  } else {
    counterFor403 = 0;
    store.dispatch('showLoader', false);
    router.push({ name: 'network-error' });
  }
}

export default {
  getCity() {
    return httpGIST.get('/V3/Map/Basic/City');
  },

  getCityAddress(cityName) {
    return httpGIST.get(
      '/V3/Map/GeoCode/Coordinate/Address/' + cityName + '政府'
    );
  },

  getScenicSpot() {
    return httpTDX.get('/v2/Tourism/ScenicSpot');
  },

  getRestaurant() {
    return httpTDX.get('/v2/Tourism/Restaurant');
  },

  getHotel() {
    return httpTDX.get('/v2/Tourism/Hotel');
  },

  getBikeStation(city) {
    return httpTDX.get(`/v2/Bike/Station/${city}`);
  },

  getBikeAvailability(city) {
    return httpTDX.get(`/v2/Bike/Availability/${city}`);
  },

  getBusCityRoute(city) {
    return httpTDX.get(`/v2/Bus/Route/City/${city}`);
  },

  getBusCityStopOfRoute(city) {
    return httpTDX.get(`/v2/Bus/StopOfRoute/City/${city}`);
  },

  getRealTimeOfArrival(city, routeName) {
    return httpTDX.get(`/v2/Bus/RealTimeByFrequency/City/${city}/${routeName}`);
  },

  getBusStopOfRoute(city, routeName) {
    return httpTDX.get(`/v2/Bus/StopOfRoute/City/${city}/${routeName}`);
  },

  getEstimatedTimeOfArrival(city, routeName) {
    return httpTDX.get(
      `/v2/Bus/EstimatedTimeOfArrival/City/${city}/${routeName}`
    );
  },

  getBusShape(city, routeName) {
    return httpTDX.get(`/v2/Bus/Shape/City/${city}/${routeName}`);
  },
};
