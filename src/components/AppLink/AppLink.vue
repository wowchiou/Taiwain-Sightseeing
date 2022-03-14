<template>
  <a
    v-if="isExternal"
    :href="to === 'false' ? 'javascript:;' : to"
    :target="to === 'false' ? '_self' : '_blank'"
    rel="noopener"
    class="appLink"
    v-bind="$props"
    data-test="external-link"
  >
    <slot />
  </a>
  <RouterLink v-else data-test="internal-link" v-bind="$props" class="appLink">
    <slot />
  </RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: {
    ...RouterLink.props,
  },
  components: { RouterLink },
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
