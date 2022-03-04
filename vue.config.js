module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/Taiwain-Sightseeing/' : '/',
  devServer: {
    proxy: 'https://wowchiou.github.io/Taiwain-Sightseeing/',
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '台灣觀光查詢網';
      args[0].description =
        '此網站提供台灣風景區、餐飲、旅宿、YouBike即時車位以及公車/客運時刻表的查詢服務。';
      args[0].keywords =
        '台灣,觀光,查詢,風景,餐飲,旅宿,YouBike,即時車位,公車,客運,時刻表';
      return args;
    });
  },
};
