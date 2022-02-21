export function getUserPosition() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in window.navigator) {
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
    this.html = document.querySelector('html');
  }
  StopBodyScroll.prototype.fixedBody = function () {
    this.pageTop = window.scrollY;
    this.html.style.height = window.screen.availHeight + 'px';
    this.body.style.position = 'fixed';
    this.body.style.top = -this.pageTop + 'px';
  };
  StopBodyScroll.prototype.scrollBody = function () {
    this.html.style.height = 'auto';
    this.body.style.position = '';
    this.body.style.top = '';
    window.scrollTo(0, this.pageTop);
  };
  return function () {
    if (!instance) {
      instance = new StopBodyScroll();
    }
    return instance;
  };
})();
