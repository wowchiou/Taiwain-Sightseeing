<template>
  <div class="station-name">
    <div class="start-name">{{ startName || endName }}</div>
    <div class="station-arrow">&#8693;</div>
    <div class="end-name">{{ endName }}</div>
  </div>
</template>

<script>
export default {
  props: ['startName', 'endName'],
};
</script>

<style lang="scss" scoped>
@import './BusStationCard.scss';
</style>
