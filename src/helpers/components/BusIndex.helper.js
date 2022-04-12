export default {
  isRouteNameContainKeywords(routeName, keywords) {
    return routeName && routeName.indexOf(keywords) !== -1;
  },
};
