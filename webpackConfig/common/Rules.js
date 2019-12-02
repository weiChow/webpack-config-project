"use strict";
/**
 * module.rules 模块规则（配置 loader、解析器等选项）
 */

// 将CSS提取到单独的文件中 它为每个包含CSS的JS文件创建一个CSS文件 它支持CSS和SourceMap的按需加载
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (mode) => (
  [
    {
      test: /\.js$/,  //文件匹配规则
      use: "babel-loader"   //通过babel-loader与.babel文件建立联系
    },
    {
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader"
      ]
    },
    {
      test: /\.less$/,
      //loader 从右到左地取值(evaluate)/执行(execute)
      use: [
        mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: "px2rem-loader",  //放在less-loader之后执行
          options: {
            //1rem=多少(75)像素 结合lib-flexible的方案，我们将remUnit设置成设计稿宽度的 1/10，这里我们假设设计稿宽为750px
            remUnit: 75, //设计图是1920的宽度 这里你就1920/10=192
            remPrecision: 8 //换算的rem保留几位小数点
          }
        },
        {
          //postcss-loader 执行顺序必须保证在 css-loader 之前，建议还是放在less或者sass等预处理器之后更好
          //less-loader -> postcss-loader -> css-loader -> style-loader或者MiniCssExtractPlugin.loader
          loader: "postcss-loader",
          options: {
            plugins: () => [
              require('autoprefixer')({
                overrideBrowserslist: ["last 2 versions", "> 5%"]
              })
            ]
          }
        },
        "less-loader"
      ]
    },
    {
      test: /\.(jpg|jpeg|png|gif)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name]_[hash:8].[ext]",  //默认compilers使用[hash:8].[ext]
          outputPath: "assets/images", // 该路径相对于html输出路径
          publicPath: "assets/images"
        }
      }
    },
    {
      test: /\.(ttf|eot|woff|woff2|otf)$/,
      use: [
        {
          loader: "url-loader", //url-loader(可进行构建配置)作用与file-loader相同 内部使用file-loader
          options: {
            limit: 30720,  //30KB(limit使用字节作单位)
            name: "[name]_[hash:8].[ext]",  //默认compilers使用[hash:8].[ext]
            outputPath: "assets/fonts", // 该路径相对于html输出路径
            publicPath: "assets/fonts"
          }
        }
      ]
    }
  ]
);