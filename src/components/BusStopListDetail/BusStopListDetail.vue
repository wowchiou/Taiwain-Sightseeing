<script setup>
import { defineProps } from 'vue';

defineProps({
  stopDetail: {
    type: Array,
  },
});

function formateEstimateTime(busTimeDetail) {
  let detailTimeResult = [];
  busTimeDetail.forEach((bus) => {
    const { EstimateTime, PlateNumb, Estimates, NextBusTime } = bus;
    if (Estimates && Estimates.length !== 0) {
      detailTimeResult.push(...getBusEstimate(Estimates));
    } else if (EstimateTime || EstimateTime === 0) {
      const estimateText = renderEstimateText(EstimateTime, PlateNumb);
      detailTimeResult.push(estimateText);
    } else if (NextBusTime && !EstimateTime && !Estimates) {
      const nextBustTime = renderNextBusTime(NextBusTime, PlateNumb);
      if (nextBustTime) detailTimeResult.push(nextBustTime);
    }

    function getBusEstimate(estimates) {
      const results = [];
      for (const { EstimateTime, NextBusTime } of estimates) {
        if (EstimateTime || EstimateTime === 0) {
          const estimateText = renderEstimateText(EstimateTime, PlateNumb);
          results.push(estimateText);
          break;
        } else if (NextBusTime) {
          const nextBustTime = renderNextBusTime(NextBusTime, PlateNumb);
          if (nextBustTime) results.push(nextBustTime);
          break;
        }
      }
      return results;
    }
  });

  if (detailTimeResult.length === 0) {
    return [{ class: 'error', text: '無發車資料' }];
  } else {
    return detailTimeResult.sort((a, b) => a.time - b.time);
  }

  function renderNextBusTime(nextBusTime, plateNumb) {
    const date = new Date(nextBusTime);
    const time = date.getTime();
    if (time < Date.now()) return false;
    let hours = formateTimeText(date.getHours());
    let minutes = formateTimeText(date.getMinutes());
    const plateNumber = plateNumb || '';
    return {
      class: 'almost',
      text: `${plateNumber}${hours}:${minutes}`,
      time,
    };
  }

  function formateTimeText(time) {
    if (time < 10) return `0${time}`;
    return time;
  }

  function renderEstimateText(time, plate) {
    const minutes = Math.floor(time / 60);
    const plateNumb = plate || '';
    if (time <= 0) return getEstimateInfo('now', '抵達');
    if (minutes === 0) return getEstimateInfo('now', '即將到站');
    return getEstimateInfo('almost', `${plateNumb} ${minutes}分鐘`);

    function getEstimateInfo(className, timeStatus) {
      return { class: className, text: timeStatus, time };
    }
  }
}
</script>

<template>
  <div class="stop-detail">
    <span
      v-for="(bus, idx) in formateEstimateTime(stopDetail)"
      :key="`${bus.StopID}${idx}`"
      :class="bus.class"
      ><p>{{ bus.text }}</p></span
    >
  </div>
</template>

<style lang="scss" scoped>
@import './BusStopListDetail.scss';
</style>
