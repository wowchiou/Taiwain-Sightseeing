<script setup>
import { ref, watchEffect, computed, defineProps } from 'vue';
import { useStore } from 'vuex';

import ButtonBackToFrontPage from '@/components/ButtonBackToFrontPage';
import TravelDetailItem from '@/components/TravelDetailItem';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
});

const { state, dispatch } = useStore();

const detailInfo = ref(null);
const isMapInit = computed(() => state.map.OSM || null);

watchEffect(async () => {
  if (!isMapInit.value) return;
  dispatch('showLoader', true);
  const page = props.page;
  dispatch('travel/fetchTravelData', page).then((travelData) => {
    detailInfo.value = travelData.find((itm) => itm[`${page}ID`] === props.id);
    const { PositionLat, PositionLon } = detailInfo.value.Position;
    dispatch('map/setTravelMarkers', {
      page,
      markers: [
        {
          position: [PositionLat, PositionLon],
          name: detailInfo.value[`${page}Name`],
          id: detailInfo.value[`${page}ID`],
        },
      ],
    });
    state.map.OSM.setView([PositionLat, PositionLon], 15);
    dispatch('showLoader', false);
  });
});

function isEmptyObject(data) {
  return JSON.stringify(data) === '{}';
}
</script>

<template>
  <div v-if="detailInfo" class="detail">
    <div class="title">
      <ButtonBackToFrontPage />
      <h1>{{ detailInfo[`${page}Name`] }}</h1>
    </div>
    <div class="content">
      <TravelDetailItem title="地址" :content="detailInfo.Address" />
      <TravelDetailItem title="電話" :content="detailInfo.Phone" />
      <TravelDetailItem title="營業時間" :content="detailInfo.OpenTime" />
      <TravelDetailItem title="旅遊資訊" :content="detailInfo.TravelInfo" />
      <TravelDetailItem
        v-if="!isEmptyObject(detailInfo.Picture)"
        title="旅遊圖片"
        :content="{
          src: detailInfo.Picture.PictureUrl1,
          alt: detailInfo.Picture.PictureDescription1,
        }"
      />
      <TravelDetailItem
        v-if="detailInfo.DescriptionDetail"
        title="地點說明"
        :content="detailInfo.DescriptionDetail"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './TravelDetail.scss';
</style>
