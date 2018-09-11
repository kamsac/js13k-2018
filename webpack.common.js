const path = require('path');
const rootPath = require('app-root-path') + '';

const outputFilename = 'main.js';

module.exports = {
  target: 'web',
  entry: {
    main: path.resolve(rootPath, './src/main.ts'),
  },
  output: {
    filename: outputFilename,
    path: path.resolve(rootPath, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'url-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '3',
                speed: 1
              },
              gifsicle: {
                interlaced: false,
              },
            }
          },
        ],
      },
    ],
  },
};
