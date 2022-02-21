import axios from 'axios';
import jsSHA from 'jssha';

export const httpTDX = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC',
  headers: GetAuthorizationHeader(),
});

export const httpGIST = axios.create({
  baseURL: 'https://gist.motc.gov.tw/gist_api',
  headers: GetAuthorizationHeader(),
});

export default {
  getCity() {
    return httpGIST.get('/V3/Map/Basic/City');
  },
  getCityAddress(cityName) {
    return httpGIST.get(
      '/V3/Map/GeoCode/Coordinate/Address/' + cityName + '政府'
    );
  },
};

function GetAuthorizationHeader() {
  var AppID = process.env.VUE_APP_TDX_ID;
  var AppKey = process.env.VUE_APP_TDX_KEY;
  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return {
    Authorization: Authorization,
    'X-Date': GMTString,
    /*,'Accept-Encoding': 'gzip'*/
  };
}
