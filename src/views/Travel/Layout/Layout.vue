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
  props: {
    page: {
      type: String,
    },
  },
  created() {
    console.log(this.page);
  },
};
</script>

<style lang="scss" scoped>
@import './Layout.scss';
</style>
