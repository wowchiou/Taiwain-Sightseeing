import { httpGIST, httpAC } from '@/utils/http';

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
    return httpAC.get('/Tourism/ScenicSpot');
  },

  getRestaurant() {
    return httpAC.get('/Tourism/Restaurant');
  },

  getHotel() {
    return httpAC.get('/Tourism/Hotel');
  },

  getBikeStation(city) {
    return httpAC.get(`/Bike/Station?city=${city}`);
  },

  getBikeAvailability(city) {
    return httpAC.get(`/Bike/Availability?city=${city}`);
  },

  getBusCityRoute(city) {
    return httpAC.get(`/Bus/Route?city=${city}`);
  },

  getBusCityStopOfRoute(city) {
    return httpAC.get(`/Bus/StopOfRoute?city=${city}`);
  },

  getRealTimeOfArrival(city, routeName) {
    return httpAC.get(
      `/Bus/RealTimeByFrequency?city=${city}&routeName=${routeName}`
    );
  },

  getBusStopOfRoute(city, routeName) {
    return httpAC.get(
      `/Bus/StopOfRouteByName?city=${city}&routeName=${routeName}`
    );
  },

  getEstimatedTimeOfArrival(city, routeName) {
    return httpAC.get(
      `/Bus/EstimatedTimeOfArrival?city=${city}&routeName=${routeName}`
    );
  },

  getBusShape(city, routeName) {
    return httpAC.get(`/Bus/Shape?city=${city}&routeName=${routeName}`);
  },
};
