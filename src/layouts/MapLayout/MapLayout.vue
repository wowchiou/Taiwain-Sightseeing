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
          resetMap(currentPosition.value);
        }
      }
    );

    if (currentPosition.value) {
      return setMap(currentPosition.value);
    }

    store.dispatch('showLoader', true);

    getUserPosition()
      .then((position) => {
        store.commit('map/SET_CURRENT_POSITION', position);
        setMap(position);
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
      });
      store.dispatch('map/buildMap', OSM);
      store.dispatch('map/setBlueIconMarker', position);
    }

    function resetMap(position) {
      store.commit('travel/SET_SELECT_CITY', '');
      store.commit('travel/SET_TRAVEL_DATA', null);
      store.dispatch('map/setMapView', {
        position: {
          lat: position[0],
          lng: position[1],
        },
        zoom: 15,
      });
    }
  },
};
</script>

<style lang="scss">
@import './MapLayout.scss';
</style>
