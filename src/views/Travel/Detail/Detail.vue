<template>
  <div class="Detail">123</div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    console.log(this.id);
  },
};
</script>

<style lang="scss" scoped>
@import './Detail.scss';
</style>
