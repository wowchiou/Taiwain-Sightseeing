import { httpTDX } from './index';

export default {
  getScenicSpot() {
    return httpTDX.get('/v2/Tourism/ScenicSpot');
  },
  getRestaurant() {
    return httpTDX.get('/v2/Tourism/Restaurant');
  },
  getHotel() {
    return httpTDX.get('/v2/Tourism/Hotel');
  },
};
