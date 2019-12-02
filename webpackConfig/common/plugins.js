"use strict";
/**
 * plugins
 */

const webpack = require("webpack");

// 每次构建前清理webpack配置的output目录，这样只会生成用到的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 将CSS提取到单独的文件中 它为每个包含CSS的JS文件创建一个CSS文件 它支持CSS和SourceMap的按需加载
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩CSS文件
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 可视化构建分析
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = (mode) => {
  const isDev = mode === "development";
  let modePlugins = [];
  if (isDev) {
    modePlugins.push(
      new webpack.HotModuleReplacementPlugin() //HMR 热替换模块 开发模式搭配WDS WDM使用
    )
  } else {
    modePlugins.push(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["../../dist"]
      }),
      new OptimizeCssAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano")
      }),
      new MiniCssExtractPlugin({
        filename: 'pages/[name]/[name].[contenthash:8].css',
      }), //用来抽离css文件 不用打包到js文件里
      new BundleAnalyzerPlugin()
    )
  }
  return [].concat(modePlugins);
};