module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/Taiwain-Sightseeing/' : '/',
  devServer: {
    proxy: 'https://wowchiou.github.io/Taiwain-Sightseeing/',
  },
};
