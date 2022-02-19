<template>
  <form class="search-form">
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
        :disabled="!$store.state.map.OSM"
      >
        <option value="">-- 請選擇城市 --</option>
        <option
          v-for="city in $store.getters['getCities']"
          :key="city.CityID"
          :value="city.CityName"
        >
          {{ city.CityName }}
        </option>
      </select>
    </InputGroup>
  </form>
</template>

<script>
import InputGroup from '@/components/InputGroup';

export default {
  components: {
    InputGroup,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    searchHandler: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './TravelSearcher.scss';
</style>
