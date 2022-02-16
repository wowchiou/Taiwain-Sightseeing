<template>
  <div class="Home">
    歡迎來到 Travel Sightseeing
    <AppButton :to="{ name: 'travel' }"> 旅遊查詢 </AppButton>
    <AppButton :to="{ name: 'bike' }"> 單車路線查詢 </AppButton>
    <AppButton :to="{ name: 'bus' }"> 公車/客運時刻查詢 </AppButton>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton';

export default {
  components: {
    AppButton,
  },
};
</script>

<style lang="scss" scoped>
@import './Home.scss';
</style>
