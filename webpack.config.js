const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  alwaysWriteToDisk: true,
  inject: 'body'
})

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.coffee',
    network: './network.coffee',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      {
        test: /\.coffee$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'coffee-loader',
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    HtmlWebpackHarddiskPlugin
  ]
};
