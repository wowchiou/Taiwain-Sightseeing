<template>
  <div class="refresh" @click="refreshHandler">
    <span>
      <img src="images/refresh.svg" alt="" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    refreshHandler: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './RefreshButton.scss';
</style>
