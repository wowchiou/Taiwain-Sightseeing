<template>
  <div class="container">
    <router-view></router-view>
    <teleport to="#portal-loader">
      <AppLoader />
    </teleport>
  </div>
</template>

<script>
import AppLoader from '@/components/AppLoader';

export default {
  components: {
    AppLoader,
  },
};
</script>
