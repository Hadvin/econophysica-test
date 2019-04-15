const webpackConfig = require("./base.config");
const merge = require('webpack-merge');

module.exports = merge(webpackConfig, {
  module: {
    rules: [{
      test: /\.scss$/,
      use: ['vue-style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('postcss-short'),
            require('postcss-assets'),
            require('postcss-preset-env'),
          ]
        }
      }, {
        loader: 'sass-loader',
        options: {
          data: `
            @import '@/stylesheets/_variables.scss';
            @import '@/stylesheets/_mixins.scss';
          `       
        }        
      }]
    }]    
  },
  devServer: {
    port: 3000,
    host: "localhost",
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000},
    contentBase: '/dist',
    open: true,
  }
});