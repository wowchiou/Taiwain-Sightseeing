import axios from 'axios';
import { GetAuthorizationHeader } from '@/utils';

export const httpTDX = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC',
  headers: GetAuthorizationHeader(),
});

export const httpGIST = axios.create({
  baseURL: 'https://gist.motc.gov.tw/gist_api',
  headers: GetAuthorizationHeader(),
});

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

  getBusTimeOfArrival(city, routeName) {
    return httpTDX.get(`/v2/Bus/RealTimeByFrequency/City/${city}/${routeName}`);
  },

  getBusStopOfRoute(city, routeName) {
    return httpTDX.get(`/v2/Bus/StopOfRoute/City/${city}/${routeName}`);
  },

  getBusCityStop(city) {
    return httpTDX.get(`/v2/Bus/Stop/City/${city}`);
  },

  getDisplayStopOfRoute(city, routeName) {
    return httpTDX.get(`/v2/Bus/DisplayStopOfRoute/City/${city}/${routeName}`);
  },
};
