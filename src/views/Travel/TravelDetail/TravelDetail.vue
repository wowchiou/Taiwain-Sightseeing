<template>
  <div v-if="data" class="detail">
    <div class="title">
      <AppButton @click="backHandler">
        <i class="fas fa-arrow-left"></i>
      </AppButton>
      <h1>{{ data[`${page}Name`] }}</h1>
    </div>

    <TravelDetailItem
      v-if="data.Address"
      title="地址"
      :content="data.Address"
    />

    <TravelDetailItem v-if="data.Phone" title="電話" :content="data.Phone" />

    <TravelDetailItem v-if="data.OpenTime" title="營業時間">
      <p v-html="data.OpenTime"></p>
    </TravelDetailItem>

    <TravelDetailItem v-if="data.TravelInfo" title="詳細資訊">
      <p v-html="data.TravelInfo"></p>
    </TravelDetailItem>

    <TravelDetailItem v-if="data.Picture.PictureUrl1">
      <img
        :src="data.Picture.PictureUrl1"
        :alt="data.Picture.PictureDescription1"
      />
    </TravelDetailItem>

    <TravelDetailItem v-if="data.DescriptionDetail">
      <p v-html="data.DescriptionDetail"></p>
    </TravelDetailItem>
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

        console.log(data.value);

        // 繪製地圖marker
        const lat = data.value.Position.PositionLat;
        const lng = data.value.Position.PositionLon;
        store.dispatch('map/setTravelMarkers', [
          {
            name: data.value[`${props.page}Name`],
            position: [lat, lng],
          },
        ]);

        // 設定地圖位置
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
