<template>
  <div class="travelDetailItem">
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="typeof content !== 'object' && content" v-html="content"></p>
    <img
      v-else-if="typeof content === 'object'"
      :src="content.src"
      :alt="content.alt"
    />
    <p v-else>未提供資料</p>
    <slot />
  </div>
</template>

<script>
export default {
  props: ['title', 'content'],
};
</script>

<style lang="scss" scoped>
@import './TravelDetailItem.scss';
</style>
