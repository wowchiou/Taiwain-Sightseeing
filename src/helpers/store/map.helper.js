export default {
  getCurrentMarkerHtml() {
    return `<div class="map-circle current-circle"><i class="fas fa-location-arrow"></i></div>`;
  },

  getTravelMarkerHtml(travelIcon) {
    return `<div class="map-circle marker-circle">${travelIcon}</div>`;
  },

  getTravelPopupContent({ name, page, id }) {
    return `
    <p class="popup-name">${name}</p>
    <a class="popup-link" href="#/travel/${page}/${id}/${name}">
      <i class="fas fa-link"></i>
    </a>`;
  },

  getTravelIcon(page) {
    switch (page) {
      case 'ScenicSpot':
        return `<i class="fas fa-binoculars"></i>`;
      case 'Restaurant':
        return `<i class="fas fa-utensils"></i>`;
      case 'Hotel':
        return `<i class="fas fa-bed"></i>`;
    }
  },

  getBikeMarkerHtml() {
    return `<div class="map-circle marker-circle"><i class="fas fa-bicycle"></i></div>`;
  },

  getBikeStationStatus(status) {
    switch (status) {
      case 0:
        return { class: 'error', text: '停止營運' };
      case 1:
        return { class: 'success', text: '正常營運' };
      case 2:
        return { class: 'warn', text: '暫停營運' };
    }
  },

  getBikeType(type) {
    switch (type) {
      case 1:
        return 'YouBike1.0';
      case 2:
        return 'YouBike2.0';
    }
  },

  formateBikeStationName(name) {
    const stationName = name.split('_');
    return stationName.length > 1
      ? stationName[stationName.length - 1]
      : stationName[0];
  },

  getBusStopMarkerHtml(stopNumber) {
    return `<div class="stop-marker"><span>${stopNumber}</span></div>`;
  },

  getBusStatus(status) {
    if (status === 1) return 'start';
    if (status === 2) return 'finish';
  },

  getBusMarkerHtml(busNumber) {
    return `<div class="bus-marker"><i class="fas fa-bus"></i><span>${busNumber}</span></div>`;
  },
};
