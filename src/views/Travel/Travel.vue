<template>
  <MapLayout>
    <div class="travel">
      <TravelNavigation />
      <form class="search-form">
        <InputGroup label="城市搜尋">
          <select class="field" v-model="cities" :disabled="!!keyword">
            <option value="">-- 請選擇城市 --</option>
            <option
              v-for="city in $store.getters['getCities']"
              :key="city.CityID"
              :value="city.City"
            >
              {{ city.CityName }}
            </option>
          </select>
        </InputGroup>
        <InputGroup label="關鍵字搜尋">
          <input
            v-model="keyword"
            class="field"
            type="text"
            placeholder="-- 請輸入關鍵字 --"
            :disabled="!!cities"
          />
        </InputGroup>
        <InputGroup>
          <div class="field-button">
            <span>搜尋</span>
          </div>
        </InputGroup>
      </form>
    </div>
  </MapLayout>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import MapLayout from '@/layouts/MapLayout';
import TravelNavigation from '@/components/TravelNavigation';
import InputGroup from '@/components/InputGroup';

export default {
  components: {
    MapLayout,
    TravelNavigation,
    InputGroup,
  },
  setup() {
    const cities = ref('');
    const keyword = ref('');
    const store = useStore();

    store.dispatch('travel/fetchScenicSpot').catch((err) => console.log(err));
    return { cities, keyword };
  },
};
</script>

<style lang="scss" scoped>
@import './Travel.scss';
</style>
