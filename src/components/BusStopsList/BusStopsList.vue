<template>
  <ul v-if="busStopTime" class="bus-result">
    <li
      class="bus-stop"
      v-for="(stop, stopIDX) in busStopTime"
      :key="stop.StopUID"
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
export default {
  props: ['busStopTime'],
  setup() {
    function formateEstimateTime(detail) {
      const detailTimeResult = [];
      if (detail.length <= 0) {
        detailTimeResult.push({ class: 'error', text: '無預估資料' });
        return detailTimeResult;
      }
      detail.forEach((bus) => {
        const { EstimateTime, PlateNumb, Estimates } = bus;
        if (Estimates && Estimates.length > 0) {
          const times = Estimates.filter((time) => time.EstimateTime);
          if (times.length === 0) return;
          times.forEach((time) => {
            const estimateText = renderEstimateText(
              time.EstimateTime,
              time.PlateNumb
            );
            return detailTimeResult.push(estimateText);
          });
        } else if (EstimateTime || EstimateTime === 0) {
          const estimateText = renderEstimateText(EstimateTime, PlateNumb);
          return detailTimeResult.push(estimateText);
        }
      });
      if (detailTimeResult.length === 0) {
        detailTimeResult.push({ class: 'notYet', text: '尚未發車' });
      }
      return detailTimeResult;
    }
    function renderEstimateText(time, plate) {
      const minutes = Math.floor(time / 60);
      const plateNumb = plate || '';
      if (time <= 0) {
        return { class: 'now', text: '抵達' };
      }
      if (minutes === 0) {
        return { class: 'now', text: '即將到站' };
      }
      return { class: 'almost', text: `${plateNumb} ${minutes}分鐘` };
    }

    // function formateEstimateTime(detail) {
    //   if (detail.length < 1) {
    //     return '<span class="error">無出車資料</span>';
    //   }
    //   let statusString = '';
    //   detail.forEach((bus) => {
    //     const { EstimateTime, PlateNumb, Estimates } = bus;
    //     if (Estimates && Estimates.length > 0) {
    //       const times = Estimates.filter((time) => time.EstimateTime);
    //       if (times.length === 0) {
    //         return (statusString += `<span class="notYet">尚未發車</span>`);
    //       }
    //       times.forEach((time) => {
    //         const estimateText = renderEstimateText(
    //           time.EstimateTime,
    //           time.PlateNumb
    //         );
    //         return (statusString += estimateText);
    //       });
    //     } else if (EstimateTime) {
    //       const estimateText = renderEstimateText(EstimateTime, PlateNumb);
    //       return (statusString += estimateText);
    //     }
    //     if (!statusString) {
    //       return (statusString += `<span class="notYet">尚未發車</span>`);
    //     }
    //   });
    //   return statusString;
    // }
    // function renderEstimateText(time, plate) {
    //   const minutes = Math.floor(time / 60);
    //   const plateNumb = plate || '';
    //   if (time <= 0) {
    //     return `<span class="now"><p>${plateNumb} 抵達</p></span>`;
    //   }
    //   if (minutes === 0) {
    //     return `<span class="now"><p>${plateNumb} 即將到站</p></span>`;
    //   }
    //   return `<span class="almost">${plateNumb} ${minutes}分鐘</span>`;
    // }
    return { formateEstimateTime };
  },
};
</script>

<style lang="scss">
@import './BusStopsList.scss';
</style>
