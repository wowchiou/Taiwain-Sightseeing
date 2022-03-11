<template>
  <InputGroup class="cityKeywordInput" label="關鍵字搜尋">
    <div class="keyword-wrap">
      <input
        class="field"
        type="text"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="hasResult ? '請輸入關鍵字' : '請先選擇城市'"
      />
      <button class="search" @click="keywordSearch">搜尋</button>
    </div>
  </InputGroup>
</template>

<script>
import InputGroup from "@/components/InputGroup";

export default {
  components: {
    InputGroup,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    result: {
      type: Array,
    },
    keywordSearch: {
      type: Function,
    },
  },
  computed: {
    hasResult() {
      return this.result.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./CityKeywordInput.scss";
</style>
