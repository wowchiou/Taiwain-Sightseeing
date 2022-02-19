<template>
  <div class="travel">
    <form class="search-form">
      <InputGroup label="城市搜尋">
        <select
          class="field"
          v-model="cityName"
          @change="searchHandler"
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
    <div class="content">
      <p v-if="!hasResult" class="remind">請選擇城市/輸入關鍵字查詢</p>
      <ul v-else class="search-list">
        <li
          v-for="result in searchResult"
          class="search-item"
          :key="result.ScenicSpotID"
        >
          <AppLink
            :to="{
              name: 'travel-detail',
              params: { id: result.ScenicSpotID, name: result.ScenicSpotName },
            }"
            @click="showPosition(result.Position)"
          >
            {{ result.ScenicSpotName }}
          </AppLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, watchEffect } from 'vue';
import { useStore } from 'vuex';
import InputGroup from '@/components/InputGroup';
import AppLink from '@/components/AppLink';

export default {
  props: {
    page: {
      type: String,
    },
  },
  components: { InputGroup, AppLink },
  setup(props) {
    const cityName = ref('');
    const searchResult = ref([]);
    const store = useStore();
    const hasResult = computed(() => searchResult.value.length !== 0);
    const selectCity = store.state.travel.selectCity;

    watch(
      () => props.page,
      (page, prevPage) => {
        if (page !== prevPage) {
          cityName.value = '';
          searchResult.value = [];
        }
      }
    );

    watchEffect(async () => {
      if (!store.state.travel.travelData) {
        await store
          .dispatch('travel/fetchTravelData', props.page)
          .catch((err) => console.log(err));
      }
    });

    if (selectCity) {
      cityName.value = selectCity;
      searchHandler();
    }

    async function searchHandler() {
      if (!cityName.value) return;
      const result = store.state.travel.travelData.filter(
        (itm) => itm.City === cityName.value && itm.Picture.PictureUrl1
      );
      searchResult.value = result;
      store.commit('travel/SET_SELECT_CITY', cityName.value);
      await setCityCenter();
      store.dispatch('map/setTravelMarker', result);
    }

    async function setCityCenter() {
      const cityPosition = await store
        .dispatch('fetchCityAddress', cityName.value)
        .catch((err) => console.log(err));
      store.dispatch('map/setCityCenter', cityPosition);
    }

    function showPosition(data) {
      const itemPosition = [data.PositionLat, data.PositionLon];
      store.dispatch('map/setMapView', {
        position: itemPosition,
        zoom: 11,
      });
    }

    return {
      cityName,
      searchHandler,
      searchResult,
      hasResult,
      showPosition,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './TravelIndex.scss';
</style>
