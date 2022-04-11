import Wkt from 'wicket';

const wkt = new Wkt.Wkt();

export default {
  getCityGeometry(geometry) {
    const cityGeometry = wkt.read(geometry).toJson().coordinates;
    return [cityGeometry[1], cityGeometry[0]];
  },

  getShapeGeometry(shapeGeometry) {
    return wkt
      .read(shapeGeometry)
      .toJson()
      .coordinates.map((geo) => geo.reverse());
  },
};
