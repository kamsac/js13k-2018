const path = require('path');
const rootPath = require('app-root-path') + '';
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputFilename = 'main.js';

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: outputFilename,
    path: path.resolve(rootPath, 'dist'),
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'js13k-2018',
      template: path.resolve(rootPath, 'src/index.html'),
    }),
  ]
});
