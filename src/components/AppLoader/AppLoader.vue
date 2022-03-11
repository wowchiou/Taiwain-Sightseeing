<template>
  <div
    class="appLoader"
    data-testId="app-loader"
    v-if="$store.state.loader || !$store.state.map.OSM"
  >
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import './AppLoader.scss';
</style>
