<template>
  <ul class="busSearchList">
    <li v-for="bus in busResult" :key="bus.RouteUID">
      <AppLink
        :to="{
          name: 'bus-detail',
          params: { city, route: bus.RouteName.Zh_tw, id: bus.RouteUID },
        }"
      >
        <p class="route">{{ bus.RouteName.Zh_tw }}</p>
        <p class="name">{{ formateBusName(bus) }}</p>
      </AppLink>
    </li>
  </ul>
</template>

<script>
import { watch } from "vue";
import AppLink from "@/components/AppLink";

export default {
  components: { AppLink },
  props: {
    busResult: {
      type: Array,
    },
    city: {
      type: String,
    },
  },
  setup(props) {
    watch(
      () => props.busResult,
      () => {
        window.scrollTo({ top: 0 });
      }
    );

    function formateBusName(bus) {
      let startName = bus.DepartureStopNameZh;
      let endName = bus.DestinationStopNameZh;
      const stops = bus.detail.Stops;
      const stopsLength = stops.length;
      if (!startName) {
        startName = stops[stopsLength - 1].StopName.Zh_tw;
      }
      if (!endName) {
        endName = stops[0].StopName.Zh_tw;
      }
      if (bus.Direction === 2) return startName;
      return `${startName}－${endName}`;
    }

    return { formateBusName };
  },
};
</script>

<style lang="scss" scoped>
@import "./BusSearchList.scss";
</style>
