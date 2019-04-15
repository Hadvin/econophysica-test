const webpackConfig = require("./base.config");
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(webpackConfig, {
  module: {
    rules: [{
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('cssnano')({ preset: 'default' }),
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
    }),
    new UglifyJsPlugin({test: /\.js(\?.*)?$/i}),
    new CompressionPlugin({test: /\.js(\?.*)?$/i})    
  ] 
});