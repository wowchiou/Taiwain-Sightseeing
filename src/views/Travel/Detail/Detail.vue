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
  data() {
    return {
      data: null,
    };
  },
  methods: {
    backHandler() {
      this.$router.back();
    },
  },
  async mounted() {
    const result = await this.$store
      .dispatch('travel/fetchScenicSpot')
      .catch((err) => console.log(err));
    const data = result.find((itm) => itm.ScenicSpotID === this.id);
    console.log(data);
    this.data = data;
    this.$store.dispatch('map/setCircleMarker', [data]);
    this.$store.dispatch('map/setMapView', {
      position: {
        lat: data.Position.PositionLat,
        lng: data.Position.PositionLon,
      },
      zoom: 15,
    });
  },
};
</script>

<style lang="scss" scoped>
@import './Detail.scss';
</style>
