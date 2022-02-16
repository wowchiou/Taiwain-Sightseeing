<template>
  <div class="group">
    <label v-if="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="field"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import './AppInput.scss';
</style>
