
var plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('autoprefixer'), require('cssnano'));
}

if (process.env.NODE_ENV === 'development') {
  plugins.push(require('autoprefixer'));
}

module.exports = {
  plugins
};
