<template>
  <div class="container">
    <TheNavigation />
    <router-view></router-view>

    <teleport to="#portal-loader">
      <AppLoader v-if="$store.state.loader" />
    </teleport>
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation';
import AppLoader from '@/components/AppLoader';

export default {
  components: {
    TheNavigation,
    AppLoader,
  },
  async created() {
    await this.$store.dispatch('fetchCity').catch((err) => console.log(err));
  },
};
</script>
