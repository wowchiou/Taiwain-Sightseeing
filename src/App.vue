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
  mounted() {
    fetch('http://localhost:3000/api/tdx/token')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  },
};
</script>
