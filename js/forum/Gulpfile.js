var flarum = require('flarum-gulp');

flarum({
  modules: {
    'beeta-dev/ext-quickavatar': [
      'src/**/*.js'
    ]
  }
});