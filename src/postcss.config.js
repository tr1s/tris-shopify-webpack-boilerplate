const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require("autoprefixer"),
    require('cssnano')({
        preset: 'default',
    }),
    purgecss({
      content: ['./**/*.html', './**/*.liquid'],
      keyframes: true
    })
  ],
};