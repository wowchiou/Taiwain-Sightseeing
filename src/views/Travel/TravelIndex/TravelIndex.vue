<template>
  <div class="travel">
    <TravelSearcher v-model="cityName" :searchHandler="searchHandler" />

    <div class="content">
      <p v-if="!hasResult" class="remind">請選擇城市/輸入關鍵字查詢</p>
      <ul v-else class="search-list">
        <li
          v-for="result in searchResult"
          class="search-item"
          :key="result[`${page}ID`]"
        >
          <AppLink
            :to="{
              name: 'travel-detail',
              params: { id: result[`${page}ID`], name: result[`${page}Name`] },
            }"
            @click="showPosition(result.Position)"
          >
            {{ result[`${page}Name`] }}
          </AppLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import AppLink from '@/components/AppLink';
import TravelSearcher from '@/components/TravelSearcher';

export default {
  props: {
    page: {
      type: String,
    },
  },
  components: { AppLink, TravelSearcher },
  setup(props) {
    const cityName = ref('');
    const searchResult = ref([]);
    const store = useStore();
    const hasResult = computed(() => searchResult.value.length !== 0);
    const selectCity = computed(() => store.state.travel.selectCity);
    const travelData = computed(() => store.state.travel.travelData);

    watch(
      () => props.page,
      async (page, prevPage) => {
        if (page !== prevPage) {
          cityName.value = '';
          searchResult.value = [];
          await store
            .dispatch('travel/fetchTravelData', props.page)
            .catch((err) => console.log(err));
        }
      },
      { immediate: true }
    );

    if (selectCity.value) {
      cityName.value = selectCity.value;
      searchHandler();
    }

    async function searchHandler() {
      if (!cityName.value) return;
      console.log(travelData.value);
      const result = travelData.value.filter(
        (itm) => itm.City === cityName.value
      );
      searchResult.value = result;
      console.log(result);
      store.commit('travel/SET_SELECT_CITY', cityName.value);
      await setCityCenter();
      // store.dispatch('map/setTravelMarker', result);
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
