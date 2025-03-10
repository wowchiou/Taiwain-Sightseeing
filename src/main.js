import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './assets/scss/main.scss';

// createApp(App).use(store).use(router).use(ElementPlus).mount('#app');
createApp(App).use(store).use(router).mount('#app');
