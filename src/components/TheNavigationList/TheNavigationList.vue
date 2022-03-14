<template>
  <li class="theNavigationList">
    <AppLink data-test="list-link" :to="path" :title="title">
      <div>
        <i data-test="icon" :class="iconClass"></i>
      </div>
      <span data-test="title" v-if="menuActive">{{ title }}</span>
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
