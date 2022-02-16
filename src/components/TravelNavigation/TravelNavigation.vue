<template>
  <ul class="nav">
    <li class="nav-item">
      <AppLink :to="'false'">
        <i class="fas fa-binoculars"></i>
        <span>風景區</span>
      </AppLink>
    </li>
    <li class="nav-item">
      <AppLink :to="'false'">
        <i class="fas fa-utensils"></i>
        <span>餐飲</span>
      </AppLink>
    </li>
    <li class="nav-item">
      <AppLink :to="'false'">
        <i class="fas fa-bed"></i>
        <span>旅宿</span>
      </AppLink>
    </li>
  </ul>
</template>

<script>
import AppLink from '@/components/AppLink';

export default {
  components: {
    AppLink,
  },
};
</script>

<style lang="scss" scoped>
@import './TravelNavigation.scss';
</style>
