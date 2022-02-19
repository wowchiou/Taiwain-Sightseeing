<template>
  <div v-if="data" class="detail">
    <AppButton @click="backHandler">返回</AppButton>
    <p>{{ data.City }}</p>
    <p>{{ data.ScenicSpotName }}</p>
    <p>{{ data.Address }}</p>
    <p>{{ data.Phone }}</p>
    <p>{{ data.OpenTime }}</p>
    <p v-html="data.TravelInfo"></p>
    <img
      :src="data.Picture.PictureUrl1"
      :alt="data.Picture.PictureDescription1"
    />
    <p>{{ data.DescriptionDetail }}</p>
  </div>
</template>

<script>
import { ref, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppButton from '@/components/AppButton';

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
