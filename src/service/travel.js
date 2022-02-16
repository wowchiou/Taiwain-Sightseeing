import { http } from './index';

export default {
  getScenicSpot() {
    return http.get('/v2/Tourism/ScenicSpot');
  },
};
