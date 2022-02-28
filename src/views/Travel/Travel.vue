<template>
  <MapLayout>
    <div class="travel">
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
  async created() {
    // await this.$store.dispatch('fetchCity').catch((err) => {
    //   console.log(err);
    //   this.$router.push({ name: 'network-error' });
    // });
  },
};
</script>

<style lang="scss" scoped>
@import './Travel.scss';
</style>
