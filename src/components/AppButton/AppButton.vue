<template>
  <div class="appButton">
    <AppLink :to="to">
      <slot />
    </AppLink>
  </div>
</template>

<script>
import AppLink from "@/components/AppLink";

export default {
  components: { AppLink },
  props: {
    to: {
      type: [String, Object],
      default: "false",
    },
    icon: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./AppButton.scss";
</style>
