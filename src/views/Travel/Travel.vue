<template>
  <MapLayout>
    <div class="travel">
      <TravelNavigation />
      <form class="search-form">
        <InputGroup label="城市搜尋">
          <select class="field" v-model="cityName">
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
          <AppButton @click="searchHandler">搜尋</AppButton>
        </InputGroup>
      </form>

      <div class="content">
        <p v-if="!hasResult" class="remind">請選擇城市/輸入關鍵字查詢</p>
        <ul v-else class="search-list">
          <li
            v-for="result in searchResult"
            class="search-item"
            :key="result.ScenicSpotID"
            :data="result"
          >
            <p @click="showPosition(result.Position)">
              {{ result.ScenicSpotName }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </MapLayout>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import MapLayout from '@/layouts/MapLayout';
import TravelNavigation from '@/components/TravelNavigation';
import InputGroup from '@/components/InputGroup';
import AppButton from '@/components/AppButton';

export default {
  components: {
    MapLayout,
    TravelNavigation,
    InputGroup,
    AppButton,
  },
  async created() {
    await this.$store
      .dispatch('travel/fetchScenicSpot')
      .catch((err) => console.log(err));
  },
  setup() {
    const cityName = ref('');
    const searchResult = ref([]);
    const store = useStore();
    const hasResult = computed(() => searchResult.value.length !== 0);

    async function searchHandler() {
      if (!cityName.value) return;
      const result = store.state.travel.scenicSpot.filter(
        (itm) => itm.City === cityName.value && itm.Picture.PictureUrl1
      );
      searchResult.value = result;
      await setCityView();
      store.dispatch('map/setCircleMarker', result);
    }

    async function setCityView() {
      const cityPosition = await store
        .dispatch('fetchCityAddress', cityName.value)
        .catch((err) => console.log(err));
      store.dispatch('map/setCityCenter', cityPosition);
    }

    function showPosition(data) {
      const itemPosition = [data.PositionLat, data.PositionLon];
      store.dispatch('map/setMapView', {
        position: itemPosition,
        zoom: 16,
      });
    }

    return { cityName, searchHandler, searchResult, hasResult, showPosition };
  },
};
</script>

<style lang="scss" scoped>
@import './Travel.scss';
</style>
