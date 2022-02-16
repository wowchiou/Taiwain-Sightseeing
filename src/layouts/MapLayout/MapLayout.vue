<template>
  <div class="wrapper">
    <slot />
  </div>
  <div id="map"></div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { getUserPosition } from '@/utils';
import L from 'leaflet';

export default {
  setup() {
    const store = useStore();
    const currentPosition = store.state.map.currentPosition;

    onMounted(() => {
      if (currentPosition) {
        return setMap(currentPosition);
      }
      getUserPosition()
        .then((position) => {
          store.commit('map/SET_CURRENT_POSITION', position);
          setMap(position);
        })
        .catch(() => {
          setMap([25.05, 121.55]);
        });
    });

    function setMap(position) {
      const OSM = L.map('map', {
        center: position,
        zoom: 15,
      });
      store.dispatch('map/buildMap', OSM);
    }
  },
};
</script>

<style lang="scss">
@import './MapLayout.scss';
</style>
