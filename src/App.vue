<template>
  <div class="container">
    <router-view></router-view>

    <teleport to="#portal-loader">
      <AppLoader v-if="loader && initMap" />
    </teleport>
  </div>
</template>

<script>
import AppLoader from '@/components/AppLoader';

export default {
  components: {
    AppLoader,
  },
  computed: {
    loader() {
      return this.$store.state.loader;
    },
    initMap() {
      return this.$store.state.map.OSM;
    },
  },
};
</script>
