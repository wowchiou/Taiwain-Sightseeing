import axios from 'axios';
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

// Add a request interceptor
httpTDX.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpTDX.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    counterFor403 = 0;
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const res = error.response;
    console.log(res);
    const config = res.config;
    if (res.status === 403) {
      if (counterFor403 < 4) {
        counterFor403++;
        httpTDX(config);
      } else {
        counterFor403 = 0;
      }
    }
    return Promise.reject(error);
  }
);

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
