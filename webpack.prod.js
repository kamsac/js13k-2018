const path = require('path');
const rootPath = require('app-root-path') + '';
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const IgnoreAssetsWebpackPlugin = require('ignore-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const outputFilename = 'main.js';

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: outputFilename,
    path: path.resolve(rootPath, 'dist'),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: {
            arguments: true,
            hoist_funs: true,
            module: true,
            toplevel: true
          },
          mangle: true
        },
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'js13k-2018',
      template: path.resolve(rootPath, 'src/index.html'),
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
        minifyCSS: true,
      },
      showErrors: false,
      inlineSource: '.(js|css)$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new IgnoreAssetsWebpackPlugin({
      ignore: outputFilename,
    })
  ]
});
