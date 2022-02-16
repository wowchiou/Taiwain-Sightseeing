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
