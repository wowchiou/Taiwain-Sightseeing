<template>
  <div class="travelDetailItem">
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="content">{{ content }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './TravelDetailItem.scss';
</style>
