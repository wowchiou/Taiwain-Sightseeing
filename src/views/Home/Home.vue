<template>
  <MapLayout>
    <div class="home">
      <div class="wrap">
        <h1>歡迎來到台灣觀光查詢網</h1>
        <p>-- 請至左列選擇查詢項目 --</p>
      </div>
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
@import './Home.scss';
</style>
