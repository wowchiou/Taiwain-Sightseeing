<template>
  <a
    v-if="isExternal"
    :href="to === 'false' ? 'javascript:;' : to"
    :target="to === 'false' ? '_self' : '_blank'"
    rel="noopener"
    class="appLink"
    v-bind="$props"
  >
    <slot />
  </a>
  <router-link v-else v-bind="$props" class="appLink">
    <slot />
  </router-link>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: {
    ...RouterLink.props,
  },
  computed: {
    isExternal() {
      return (
        typeof this.to === 'string' &&
        (this.to.startsWith('http') || this.to === 'false')
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import './AppLink.scss';
</style>
