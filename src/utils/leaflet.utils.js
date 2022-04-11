import L from 'leaflet';
import { antPath } from 'leaflet-ant-path';

const CLUSTER_OPRIONS = {
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  argumentsspiderfyOnMaxZoom: false,
  maxClusterRadius: 120,
};

const ANT_PATH_OPTIONS = {
  delay: 800,
  dashArray: [15, 30],
  weight: 5,
  color: '#58c5d7',
  pulseColor: '#FFFFFF',
  paused: false,
  reverse: false,
  hardwareAccelerated: true,
  opacity: 0.9,
};

const getClusterIcon = (html) => {
  return L.divIcon({
    html,
    className: 'clusterIcon',
    iconSize: L.point(40, 40),
  });
};

export default {
  setTitleLayer(map) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
      foo: 'bar',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  },

  createMarkersCluster() {
    return L.markerClusterGroup({
      ...CLUSTER_OPRIONS,
      iconCreateFunction: (cluster) => {
        const markers = cluster.getAllChildMarkers();
        const html = `<div class="map-circle cluster-circle">${markers.length}</div>`;
        return getClusterIcon(html);
      },
    });
  },

  createMarker(position, icon) {
    return L.marker(position, icon);
  },

  getDivIcon(html, className, iconSize) {
    const [x, y] = iconSize || [40, 40];
    return L.divIcon({
      html,
      className,
      iconSize: L.point(x, y),
    });
  },

  getAntPathLayer(geometry) {
    return antPath(geometry, ANT_PATH_OPTIONS);
  },

  getPopup(option, content) {
    return L.popup(option).setContent(content);
  },

  createFeatureGroup() {
    return L.featureGroup();
  },
};
