<template>
  <ul v-if="busStops" class="bus-result">
    <li
      class="bus-stop"
      v-for="(stop, stopIDX) in busStops"
      :key="stop.StopUID"
      @click="setStopView(stop.StopPosition)"
    >
      <div class="stop-number">{{ stopIDX + 1 }}</div>

      <div class="stop-status">
        <div class="stop-detail">
          <span
            v-for="(bus, idx) in formateEstimateTime(stop.detail)"
            :key="`${bus.StopID}${idx}`"
            :class="bus.class"
            ><p>{{ bus.text }}</p></span
          >
        </div>
      </div>

      <div class="stop-name">{{ stop.StopName.Zh_tw }}</div>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex';

export default {
  props: ['busStops'],
  setup() {
    const store = useStore();

    function formateEstimateTime(detail) {
      let detailTimeResult = [];

      detail.forEach((bus) => {
        const { EstimateTime, PlateNumb, Estimates, NextBusTime } = bus;
        if (Estimates && Estimates.length > 0) {
          for (const time of Estimates) {
            const {
              timeEstimateTime = EstimateTime,
              timeNextBusTime = NextBusTime,
            } = time;
            if (timeEstimateTime || timeEstimateTime === 0) {
              const estimateText = renderEstimateText(
                timeEstimateTime,
                PlateNumb
              );
              detailTimeResult.push(estimateText);
              break;
            } else if (timeNextBusTime) {
              const nextBustTime = renderNextBusTime(
                timeNextBusTime,
                PlateNumb
              );
              if (nextBustTime) {
                detailTimeResult.push(nextBustTime);
              }
              break;
            }
          }
        } else if (EstimateTime || EstimateTime === 0) {
          const estimateText = renderEstimateText(EstimateTime, PlateNumb);
          detailTimeResult.push(estimateText);
        } else if (NextBusTime && !EstimateTime && !Estimates) {
          const nextBustTime = renderNextBusTime(NextBusTime, PlateNumb);
          if (nextBustTime) {
            detailTimeResult.push(nextBustTime);
          }
        }
      });

      if (detailTimeResult.length === 0) {
        detailTimeResult.push({ class: 'error', text: '無發車資料' });
      }

      detailTimeResult.sort((a, b) => a.time - b.time);
      return detailTimeResult;
    }

    function renderNextBusTime(nextBusTime, plateNumb) {
      const date = new Date(nextBusTime);
      const time = date.getTime();
      if (time < Date.now()) return false;
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const plateNumber = `${plateNumb}` || '';
      if (hours < 10) hours = `0${hours}`;
      if (minutes < 10) minutes = `0${minutes}`;
      return {
        class: 'almost',
        text: `${plateNumber}${hours}:${minutes}`,
        time,
      };
    }

    function renderEstimateText(time, plate) {
      const minutes = Math.floor(time / 60);
      const plateNumb = plate || '';
      if (time <= 0) {
        return { class: 'now', text: '抵達', time };
      }
      if (minutes === 0) {
        return { class: 'now', text: '即將到站', time };
      }
      return { class: 'almost', text: `${plateNumb} ${minutes}分鐘`, time };
    }

    function setStopView(position) {
      const { PositionLat, PositionLon } = position;
      store.state.map.OSM.setView([PositionLat, PositionLon], 18);
      store.commit('SET_MAP_ACTIVE', true);
    }

    return { formateEstimateTime, setStopView };
  },
};
</script>

<style lang="scss">
@import './BusStopsList.scss';
</style>
