import { httpTDX } from './index';

export default {
  getScenicSpot() {
    return httpTDX.get('/v2/Tourism/ScenicSpot');
  },
};
