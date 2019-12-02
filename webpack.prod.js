"use strict";
// product

const glob = require("glob");

const path = require("path");
// 简化了HTML文件的创建，以便为你的webpack包提供服务
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 每次构建前清理webpack配置的output目录，这样只会生成用到的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 将CSS提取到单独的文件中 它为每个包含CSS的JS文件创建一个CSS文件 它支持CSS和SourceMap的按需加载
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩JS文件(webpack在构建时内置了该插件 如果需要对该插件进行配置 就需要安装)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 压缩CSS文件
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 可视化构建分析
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const outputPath = path.resolve(__dirname, "dist");

// 多页应用
const setMPA = () => {
  let entry = {};
  let htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'));
  Object.keys(entryFiles).map(index => {
    const matchKey = entryFiles[index].match(/src\/pages\/(.*)\/index.js/);
    const pageName = matchKey[1];
    entry[pageName] = entryFiles[index];
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `./src/pages/${pageName}/index.html`),
        filename: `pages/${pageName}/${pageName}.html`,
        chunks: [pageName],
        inject: true, // 将js放在body底部
        minify: {
          html5: true
        }
      }));
  });

  return {
    entry,
    htmlWebpackPlugins
  }
};

const {entry, htmlWebpackPlugins} = setMPA();

module.exports = {
  mode: "production", // 配置webpack模式
  entry: entry,  //入口(SPA默认值：./src/index.js, 此处配置为MPA)
  output: {
    path: outputPath,
    filename: "pages/[name]/[name]_[hash:16].js"
    // publicPath: "/"
  },  // 输出构建
  //优化
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true, //多进程打包 提升构建速度
        sourceMap: true
      })
    ]
  },
  // module 关于模块配置
  module: {
    // rules 模块规则（配置 loader、解析器等选项）
    rules: [
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
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "px2rem-loader",  //放在less-loader之后执行(处理css文件 less等预处理器报错)
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
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [outputPath]
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano")
    }),
    new MiniCssExtractPlugin({
      filename: 'pages/[name]/[name].[contenthash:8].css',
    }), //用来抽离css文件 不用打包到js文件里
    new BundleAnalyzerPlugin()
  ].concat(htmlWebpackPlugins),
  devtool: 'source-map'
};