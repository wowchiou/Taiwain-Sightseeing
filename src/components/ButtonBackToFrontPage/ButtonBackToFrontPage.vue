<template>
  <AppButton class="back-button" @click="backHandler">
    <i class="fas fa-arrow-left"></i>
  </AppButton>
</template>

<script>
import AppButton from "@/components/AppButton";

export default {
  components: {
    AppButton,
  },
  methods: {
    backHandler() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./ButtonBackToFrontPage.scss";
</style>
