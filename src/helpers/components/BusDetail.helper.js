export default {
  getCityChineseName(cityData, cityEnglishName) {
    return cityData.find((city) => city.City === cityEnglishName).CityName;
  },

  getCurrentRouteBusStops(totalBusStops, currentRouteID) {
    return totalBusStops.filter((stop) => stop.RouteUID === currentRouteID);
  },

  getCurrentRouteEstimateTime(estimatedTime, currentRoute) {
    return estimatedTime.filter((bus) => bus.RouteName.Zh_tw === currentRoute);
  },

  getCurrentDirectionBusTime(busTime, currentDirection) {
    return busTime.filter((itm) => itm.Direction === currentDirection);
  },

  isCurrentDirectionShape({
    shapeRouteID,
    shapeDirection,
    currentRouteID,
    currentDirection,
  }) {
    return (
      (shapeRouteID === currentRouteID &&
        String(shapeDirection) === 'undefined') ||
      shapeDirection === currentDirection
    );
  },

  isCurrentDirectionStop({
    estimatedStopName,
    estimatedDirection,
    currentStopName,
    currentDirection,
  }) {
    return (
      estimatedStopName === currentStopName &&
      (String(estimatedDirection) === 'undefined' ||
        estimatedDirection === currentDirection)
    );
  },
};
