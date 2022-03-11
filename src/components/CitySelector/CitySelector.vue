<template>
  <InputGroup label="城市搜尋">
    <select
      class="field"
      :value="modelValue"
      v-bind="{
        ...$attrs,
        onChange: ($event) => {
          $emit('update:modelValue', $event.target.value);
          searchHandler();
        },
      }"
      :disabled="!initMap"
    >
      <option disabled value="">-- 請選擇城市 --</option>
      <option v-for="city in cities" :key="city.City" :value="city.City">
        {{ city.CityName }}
      </option>
    </select>
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
      type: String,
      default: "",
    },
    searchHandler: {
      type: Function,
      required: true,
    },
    cities: {
      type: Array,
      required: true,
    },
  },
  computed: {
    initMap() {
      return this.$store.state.map.OSM;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./CitySelector.scss";
</style>
