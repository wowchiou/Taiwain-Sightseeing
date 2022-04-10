<template>
  <div class="page-top">
    <h1 class="pageTitle">{{ title }}</h1>
    <form class="search-form" @submit.prevent>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './AppSearchBar.scss';
</style>
