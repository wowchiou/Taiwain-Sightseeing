<template>
  <MapLayout>
    <div class="layout">
      <TravelNavigation />
      <router-view></router-view>
    </div>
  </MapLayout>
</template>

<script>
import MapLayout from '@/layouts/MapLayout';
import TravelNavigation from '@/components/TravelNavigation';

export default {
  components: {
    MapLayout,
    TravelNavigation,
  },
};
</script>

<style lang="scss" scoped>
@import './Layout.scss';
</style>
