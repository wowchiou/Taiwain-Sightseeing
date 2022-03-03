<template>
  <MapLayout>
    <div class="bus">
      <router-view></router-view>
    </div>
  </MapLayout>
</template>

<script>
import MapLayout from '@/layouts/MapLayout';

export default {
  components: {
    MapLayout,
  },
};
</script>

<style lang="scss" scoped>
@import './Bus.scss';
</style>
