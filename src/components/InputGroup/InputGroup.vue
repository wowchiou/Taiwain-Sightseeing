<template>
  <div class="input-group">
    <label v-if="label" class="input-label">{{ label }}</label>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './InputGroup.scss';
</style>
