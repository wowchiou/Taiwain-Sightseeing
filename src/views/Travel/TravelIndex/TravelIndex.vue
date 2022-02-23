<template>
  <div class="travel">
    <h1>{{ page.toUpperCase() }}</h1>
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
import { useRouter } from 'vue-router';
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
    const store = useStore();
    const router = useRouter();
    const cityName = ref('');
    const searchResult = ref([]);
    const hasResult = computed(() => searchResult.value.length !== 0);
    const selectCity = computed(() => store.state.travel.selectCity);

    let travelData = null;

    console.log(router);

    watch(
      () => props.page,
      async (page, prevPage) => {
        if (page !== prevPage) {
          cityName.value = '';
          searchResult.value = [];
          travelData = await store
            .dispatch('travel/fetchTravelData', props.page)
            .catch((err) => console.log(err));

          if (selectCity.value) {
            cityName.value = selectCity.value;
            searchHandler();
          }
        }
      },
      { immediate: true }
    );

    async function searchHandler() {
      store.dispatch('showLoader', true);
      const result = travelData.filter(
        (itm) => itm.City === cityName.value && itm.Picture.PictureUrl1
      );
      searchResult.value = result;

      // 抓取市中心位置
      store.commit('travel/SET_SELECT_CITY', cityName.value);
      const cityPosition = await store
        .dispatch('fetchCityAddress', cityName.value)
        .catch((err) => console.log(err));
      store.dispatch('map/setCityCenter', cityPosition);

      // 繪製地圖marker
      const dataPosition = result.map((itm) => {
        return {
          name: itm[`${props.page}Name`],
          position: [itm.Position.PositionLat, itm.Position.PositionLon],
          id: itm[`${props.page}ID`],
          router,
        };
      });
      store.dispatch('map/setTravelMarkers', dataPosition);
      store.dispatch('showLoader', false);
    }

    // function showPosition(data) {
    //   const itemPosition = [data.PositionLat, data.PositionLon];
    //   store.dispatch('map/setMapView', {
    //     position: itemPosition,
    //     zoom: 15,
    //   });
    // }

    return {
      cityName,
      searchHandler,
      searchResult,
      hasResult,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './TravelIndex.scss';
</style>
