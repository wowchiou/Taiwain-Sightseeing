<template>
  <div class="theNavigation">
    <ul class="menu">
      <li>
        <AppLink
          :to="{ name: 'travel', params: { page: 'scenicSpot' } }"
          title="旅遊查詢"
        >
          <i class="fas fa-backpack"></i>
        </AppLink>
      </li>
      <li>
        <AppLink :to="{ name: 'bike' }" title="單車路線查詢">
          <i class="fas fa-bicycle"></i>
        </AppLink>
      </li>
      <li>
        <AppLink :to="{ name: 'bus' }" title="公車/客運時間查詢">
          <i class="fas fa-bus"></i>
        </AppLink>
      </li>
    </ul>
  </div>
</template>

<script>
import AppLink from '@/components/AppLink';

export default {
  components: {
    AppLink,
  },
};
</script>

<style lang="scss">
@import './TheNavigation.scss';
</style>
