<template>
  <div class="wrapper">
    <TheNavigation />
    <slot />
  </div>
  <div class="map-wrap" :class="{ active: isMapActive }">
    <div id="map"></div>
    <div class="map-button" @click="handleMapActive(!isMapActive)">
      <i v-if="!isMapActive" class="icon-map fas fa-map"></i>
      <i v-else class="icon-list fas fa-list"></i>
    </div>
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation';
import { watch, computed } from 'vue';
import { useStore } from 'vuex';
import { getUserPosition } from '@/utils';
import L from 'leaflet';

export default {
  components: { TheNavigation },
  props: {
    page: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const isMapActive = computed(() => store.state.mapActive);
    const currentPosition = computed(() => store.state.map.currentPosition);

    watch(
      () => props.page,
      (page, prevPage) => {
        if (page !== prevPage) {
          clearData();
          if (currentPosition.value) {
            store.state.map.OSM.setView(currentPosition.value, 15);
          }
        }
      }
    );

    clearData();

    store.dispatch('showLoader', true);

    getUserPosition()
      .then((position) => {
        setMap(position);
        store.dispatch('map/setCurrentPositionMarker', position);
        store.commit('map/SET_CURRENT_POSITION', position);
      })
      .catch(() => {
        setMap([25.0467351, 121.5119929]);
      })
      .finally(() => {
        store.dispatch('showLoader', false);
      });

    function setMap(position) {
      const OSM = L.map('map', {
        center: position,
        zoom: 15,
        zoomAnimation: false,
        zoomControl: true,
        markerZoomAnimation: false,
      });
      store.dispatch('map/buildMap', OSM);
    }

    function handleMapActive(toggle) {
      store.commit('SET_MAP_ACTIVE', toggle);
    }

    function clearData() {
      store.commit('travel/SET_SELECT_CITY', '');
      store.commit('travel/SET_TRAVEL_DATA', null);
      handleMapActive(false);
    }

    return { isMapActive, handleMapActive };
  },
};
</script>

<style lang="scss">
@import './MapLayout.scss';
</style>
