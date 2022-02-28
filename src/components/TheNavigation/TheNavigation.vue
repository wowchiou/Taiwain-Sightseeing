<template>
  <div class="theNavigation" :class="{ active: isActive }">
    <ul class="menu">
      <li>
        <AppLink
          :to="{ name: 'travel-index', params: { page: 'ScenicSpot' } }"
          @click="toggleNavigation(false)"
          title="景點查詢"
        >
          <div>
            <i class="fas fa-binoculars"></i>
          </div>
          <span v-if="isActive">景點查詢</span>
        </AppLink>
      </li>
      <li>
        <AppLink
          :to="{ name: 'travel-index', params: { page: 'Restaurant' } }"
          @click="toggleNavigation(false)"
          title="餐飲查詢"
        >
          <div>
            <i class="fas fa-utensils"></i>
          </div>
          <span v-if="isActive">餐飲查詢</span>
        </AppLink>
      </li>
      <li>
        <AppLink
          :to="{ name: 'travel-index', params: { page: 'Hotel' } }"
          @click="toggleNavigation(false)"
          title="旅宿查詢"
        >
          <div>
            <i class="fas fa-bed"></i>
          </div>
          <span v-if="isActive">旅宿查詢</span>
        </AppLink>
      </li>
      <li>
        <AppLink
          :to="{ name: 'bike' }"
          @click="toggleNavigation(false)"
          title="YouBike即時車位查詢"
        >
          <div>
            <i class="fas fa-bicycle"></i>
          </div>
          <span v-if="isActive">YouBike即時車位查詢</span>
        </AppLink>
      </li>
      <li>
        <AppLink
          :to="{ name: 'bus' }"
          @click="toggleNavigation(false)"
          title="公車/客運時間查詢"
        >
          <div>
            <i class="fas fa-bus"></i>
          </div>
          <span v-if="isActive">公車/客運時間查詢</span>
        </AppLink>
      </li>
    </ul>
    <div class="active-button" @click="toggleNavigation(!isActive)">
      <i class="fas fa-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import AppLink from '@/components/AppLink';

export default {
  components: {
    AppLink,
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleNavigation(toggle) {
      this.isActive = toggle;
    },
  },
};
</script>

<style lang="scss">
@import './TheNavigation.scss';
</style>
