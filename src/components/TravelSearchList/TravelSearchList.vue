<template>
  <ul class="travelSearchList">
    <li
      v-for="result in searchResult"
      class="search-item"
      :class="{ active: activeID === result[`${page}ID`] }"
      :key="result[`${page}ID`]"
    >
      <p @click="listActiveHandler(result)">{{ result[`${page}Name`] }}</p>
      <AppLink
        :to="{
          name: 'travel-detail',
          params: { id: result[`${page}ID`], name: result[`${page}Name`] },
        }"
        @click="listActiveHandler(result)"
      >
        <i class="fas fa-link"></i>
      </AppLink>
    </li>
  </ul>
</template>

<script>
import AppLink from "@/components/AppLink";

export default {
  components: {
    AppLink,
  },
  props: {
    searchResult: {
      type: Array,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
  created() {
    if (this.activeID) {
      const result = this.searchResult.find(
        (itm) => itm[`${this.page}ID`] === this.activeID
      );
      this.listActiveHandler(result);
    }
  },
  computed: {
    activeID() {
      return this.$store.state.travel.activeID;
    },
  },
  watch: {
    searchResult() {
      window.scrollTo({ top: 0 });
    },
  },
  methods: {
    listActiveHandler(itemData) {
      const lat = itemData.Position.PositionLat;
      const lng = itemData.Position.PositionLon;
      this.$store.commit("travel/SET_ACTIVE_ID", itemData[`${this.page}ID`]);
      this.$store.state.map.OSM.setView([lat, lng], 18);
      this.$store.state.map.markersCluster.eachLayer((layer) => {
        const layerPosition = layer._latlng;
        if (layerPosition.lat === lat && layerPosition.lng === lng) {
          layer.openPopup();
        }
      });
      this.$store.commit("SET_MAP_ACTIVE", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./TravelSearchList.scss";
</style>
