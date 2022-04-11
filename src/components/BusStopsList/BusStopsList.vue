<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import BusStopListDetail from '@/components/BusStopListDetail';

defineProps({
  busStops: {
    type: Array,
  },
});

const { state, commit } = useStore();

function setStopView(position) {
  const { PositionLat, PositionLon } = position;
  state.map.OSM.setView([PositionLat, PositionLon], 18);
  commit('SET_MAP_ACTIVE', true);
}
</script>

<template>
  <ul v-if="busStops" class="bus-result">
    <li
      class="bus-stop"
      v-for="(stop, stopIDX) in busStops"
      :key="stop.StopUID"
      @click="setStopView(stop.StopPosition)"
    >
      <div class="stop-number">{{ stopIDX + 1 }}</div>
      <div class="stop-status">
        <BusStopListDetail :stopDetail="stop.detail" />
      </div>
      <div class="stop-name">{{ stop.StopName.Zh_tw }}</div>
    </li>
  </ul>
</template>

<style lang="scss">
@import './BusStopsList.scss';
</style>
