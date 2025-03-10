import { httpGIST, httpTDX } from '@/utils/http';

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
