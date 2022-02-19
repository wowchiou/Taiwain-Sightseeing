<template>
  <div class="container">
    <TheNavigation />
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation';

export default {
  components: {
    TheNavigation,
  },
  async created() {
    await this.$store.dispatch('fetchCity').catch((err) => console.log(err));
  },
};
</script>
