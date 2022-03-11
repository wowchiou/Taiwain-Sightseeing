<template>
  <li class="theNavigationList">
    <AppLink :to="path" :title="title">
      <div>
        <i data-testId="icon" :class="iconClass"></i>
      </div>
      <span data-testId="title" v-if="menuActive">{{ title }}</span>
    </AppLink>
  </li>
</template>

<script>
import AppLink from '@/components/AppLink';

export default {
  components: {
    AppLink,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: Object,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
    menuActive: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './TheNavigationList.scss';
</style>
