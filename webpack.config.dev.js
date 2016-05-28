var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [ './src/index.js', './src/style/index.less'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/devtool.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css?-url!less'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/assets/manifest.dev.json', 'to': 'manifest.json' },
      { from: 'src/assets/index.html', 'to': 'index.html' },
      { from: 'src/assets/devtool.dev.html', 'to': 'devtool.html' },
      { from: 'src/assets/images', 'to': 'images' },
      { from: 'src/assets/js', 'to': 'js' }
    ])
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};