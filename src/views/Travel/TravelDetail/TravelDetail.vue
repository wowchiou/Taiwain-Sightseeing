<template>
  <div v-if="data" class="detail">
    <div class="title">
      <AppButton @click="backHandler">
        <i class="fas fa-arrow-left"></i>
      </AppButton>
      <h1>{{ data.ScenicSpotName }}</h1>
    </div>

    <TravelDetailItem title="地址" :content="data.Address" />
    <TravelDetailItem title="電話" :content="data.Phone" />
    <TravelDetailItem title="營業時間" :content="data.OpenTime" />
    <TravelDetailItem title="詳細資訊" :content="data.TravelInfo" />

    <TravelDetailItem>
      <img
        :src="data.Picture.PictureUrl1"
        :alt="data.Picture.PictureDescription1"
      />
    </TravelDetailItem>

    <TravelDetailItem :content="data.DescriptionDetail" />
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
          .catch((err) => console.log(err));
        data.value = result.find((itm) => itm[`${props.page}ID`] === props.id);
        const lat = data.value.Position.PositionLat;
        const lng = data.value.Position.PositionLon;
        store.dispatch('map/setCircleMarker', [[lat, lng]]);
        store.dispatch('map/setMapView', {
          position: { lat, lng },
          zoom: 15,
        });
      }
    });

    function backHandler() {
      router.back();
    }

    return { data, backHandler };
  },
};
</script>

<style lang="scss" scoped>
@import './TravelDetail.scss';
</style>
