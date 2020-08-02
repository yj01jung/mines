const isProd = (process.env.NODE_ENV || 'production') === 'production';

module.exports = {
  assetPrefix: isProd ? '/mine' : '',
};
