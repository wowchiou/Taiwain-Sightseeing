<template>
  <div v-if="data" class="detail">
    <div class="title">
      <AppButton @click="backHandler">
        <i class="fas fa-arrow-left"></i>
      </AppButton>
      <h1>{{ data[`${page}Name`] }}</h1>
    </div>

    <TravelDetailItem title="地址" :content="data.Address" />
    <TravelDetailItem title="電話" :content="data.Phone" />
    <TravelDetailItem title="營業時間" :content="data.OpenTime" />
    <TravelDetailItem title="旅遊資訊" :content="data.TravelInfo" />
    <TravelDetailItem
      v-if="!isEmptyObject(data.Picture)"
      title="旅遊圖片"
      :content="{
        src: data.Picture.PictureUrl1,
        alt: data.Picture.PictureDescription1,
      }"
    />
    <TravelDetailItem
      v-if="data.DescriptionDetail"
      title="地點說明"
      :content="data.DescriptionDetail"
    />
  </div>
</template>

<script>
import { ref, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppButton from '@/components/AppButton';
import TravelDetailItem from '@/components/TravelDetailItem';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
  components: {
    AppButton,
    TravelDetailItem,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const data = ref(null);
    const isMapInit = computed(() => store.state.map.OSM || null);

    watchEffect(async () => {
      if (isMapInit.value) {
        const result = await store
          .dispatch('travel/fetchTravelData', props.page)
          .catch((err) => {
            console.log(err);
            router.push({ name: 'network-error' });
          });

        data.value = result.find((itm) => itm[`${props.page}ID`] === props.id);

        // 繪製地圖marker
        const lat = data.value.Position.PositionLat;
        const lng = data.value.Position.PositionLon;
        store.dispatch('map/setTravelMarkers', {
          page: props.page,
          markers: [
            {
              position: [lat, lng],
              name: data.value[`${props.page}Name`],
              id: data.value[`${props.page}ID`],
            },
          ],
        });

        // 設定地圖位置
        store.state.map.OSM.setView([lat, lng], 15);
      }
    });

    function backHandler() {
      router.back();
    }

    function isEmptyObject(data) {
      return JSON.stringify(data) === '{}';
    }

    return { data, backHandler, isEmptyObject };
  },
};
</script>

<style lang="scss" scoped>
@import './TravelDetail.scss';
</style>
