<template>
  <MapLayout>
    <div class="travel">
      <TravelNavigation />
      <form class="search-form">
        <InputGroup label="城市搜尋">
          <select class="field" v-model="cities">
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

        <InputGroup>
          <div class="field-button" @click="searchData">
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
  async created() {
    await this.$store
      .dispatch('travel/fetchScenicSpot')
      .catch((err) => console.log(err));
  },

  setup() {
    const cities = ref('');
    const store = useStore();

    function searchData() {
      const res = store.state.travel.scenicSpot.filter(
        (itm) => itm.City === cities.value && itm.Picture.PictureUrl1
      );
      console.log(res);
    }

    return { cities, searchData };
  },
};
</script>

<style lang="scss" scoped>
@import './Travel.scss';
</style>
