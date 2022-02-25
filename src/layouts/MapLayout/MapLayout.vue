<template>
  <div class="wrapper">
    <slot />
  </div>
  <div id="map"></div>
</template>

<script>
import { watch, computed } from 'vue';
import { useStore } from 'vuex';
import { getUserPosition } from '@/utils';
import L from 'leaflet';

export default {
  props: {
    page: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const currentPosition = computed(() => store.state.map.currentPosition);

    watch(
      () => props.page,
      (page, prevPage) => {
        if (page !== prevPage) {
          store.commit('travel/SET_SELECT_CITY', '');
          store.commit('travel/SET_TRAVEL_DATA', null);
          store.state.map.OSM.setView(currentPosition.value, 15);
        }
      }
    );

    if (currentPosition.value) {
      return setMap(currentPosition.value);
    }

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
  },
};
</script>

<style lang="scss">
@import './MapLayout.scss';
</style>
