var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var packageJson = require('./package.json');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index.js',
    './src/style/index.less'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/devtool.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        loader: 'file?name=images/[name].[ext]'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'APP_VERSION': JSON.stringify(packageJson.version),
      'COMPAT_MIN_VERSION': JSON.stringify(packageJson.compatibility.min),
      'COMPAT_MAX_VERSION': JSON.stringify(packageJson.compatibility.max)
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/assets/manifest.dev.json', 'to': 'manifest.json' },
      { from: 'src/assets/index.html', 'to': 'index.html' },
      { from: 'src/assets/devtool.dev.html', 'to': 'devtool.html' },
      { from: 'src/assets/images', 'to': 'images' },
      { from: 'src/assets/js', 'to': 'js' }
    ])
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    noInfo: true,
    hot: true,
    contentBase: path.resolve(__dirname, './build')
  }
};