import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './assets/scss/main.scss';

createApp(App).use(store).use(router).mount('#app');
