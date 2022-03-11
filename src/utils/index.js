import jsSHA from "jssha";

export function getUserPosition() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in window.navigator) {
      /* geolocation is available */
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          reject(false);
        }
      );
    } else {
      /* geolocation is NOT available */
      reject(false);
    }
  });
}

export const StopBodyScroll = (function () {
  let instance = null;
  function StopBodyScroll() {
    this.pageTop = 0;
    this.body = document.body;
    this.html = document.querySelector("html");
  }
  StopBodyScroll.prototype.fixedBody = function () {
    this.pageTop = window.scrollY;
    this.html.style.height = window.screen.availHeight + "px";
    this.body.style.position = "fixed";
    this.body.style.top = -this.pageTop + "px";
  };
  StopBodyScroll.prototype.scrollBody = function () {
    this.html.style.height = "auto";
    this.body.style.position = "";
    this.body.style.top = "";
    window.scrollTo(0, this.pageTop);
  };
  return function () {
    if (!instance) {
      instance = new StopBodyScroll();
    }
    return instance;
  };
})();

export const GetAuthorizationHeader = () => {
  var AppID = process.env.VUE_APP_TDX_ID;
  var AppKey = process.env.VUE_APP_TDX_KEY;
  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  var HMAC = ShaObj.getHMAC("B64");
  var Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return {
    Authorization: Authorization,
    "X-Date": GMTString,
    /*,'Accept-Encoding': 'gzip'*/
  };
};
