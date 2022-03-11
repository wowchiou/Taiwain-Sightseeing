<template>
  <div
    class="theNavigation"
    data-testId="navigation"
    :class="{ active: menuActive }"
  >
    <ul class="menu">
      <TheNavigationList
        data-testId="menu-list"
        v-for="list in menuList"
        :key="list.title"
        :title="list.title"
        :path="list.path"
        :iconClass="list.iconClass"
        :menuActive="menuActive"
        @click="toggleNavigation(false)"
      />
    </ul>
    <div
      class="active-button"
      data-testId="active-button"
      @click="toggleNavigation(!menuActive)"
    >
      <i class="fas fa-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import TheNavigationList from '@/components/TheNavigationList';
import menuList from '@/utils/menu-list.json';

export default {
  components: {
    TheNavigationList,
  },
  data() {
    return {
      menuList,
      menuActive: false,
    };
  },
  methods: {
    toggleNavigation(toggle) {
      this.menuActive = toggle;
    },
  },
};
</script>

<style lang="scss">
@import './TheNavigation.scss';
</style>
