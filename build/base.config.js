const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    app: './source/App.ts',
  },  
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, `../dist`),
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../source'),
      'assets': path.resolve(__dirname, '../source/assets'),
      'vue$': 'vue/dist/vue.common.js',
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      })      
    ]
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.pug$/,
      oneOf: [{
        resourceQuery: /^\?vue/,
        use: ['pug-plain-loader']
      }, {
        use: ['raw-loader', 'pug-plain-loader']
      }] 
    }, {
      test: /\.ts$/,
      use: [{
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }],
      exclude: /node_modules/ 
    }, {
      test: /\.(eot|ttf|woff)$/, 
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/fonts/'
        }        
      }]      
    }]    
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin({
      title: 'Econophysica Test',
      language: 'ru',
      template: '!!pug-loader!source/index.template.pug'   
    })    
  ]
};