/**
 * webpack基础配置
 */

const glob = require("glob");
const path = require("path");
const Rules = require("./common/Rules");
const Plugins = require("./common/plugins");

// 简化了HTML文件的创建，以便为你的webpack包提供服务
const HtmlWebpackPlugin = require("html-webpack-plugin");

const outputPath = path.resolve(__dirname, "../dist");

module.exports = (mode) => {
  // 多页应用
  const setMPA = () => {
    let entry = {};
    let htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, '../src/pages/*/index.js'));
    Object.keys(entryFiles).map(index => {
      const matchKey = entryFiles[index].match(/src\/pages\/(.*)\/index.js/);
      const pageName = matchKey[1];
      entry[pageName] = [
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000",
        entryFiles[index]
      ];
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, `../src/pages/${pageName}/index.html`),
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

  return {
    mode: mode, // 配置webpack构建模式(development production)
    entry: entry,  //入口(SPA默认值：./src/index.js, 此处配置为MPA)
    output: {
      path: outputPath,
      filename: "pages/[name]/[name]_[hash:16].js",
      publicPath: "/"
    },  // 输出构建
    // module 关于模块配置
    module: {
      // rules 模块规则（配置 loader、解析器等选项）
      rules: Rules(mode)
    },
    plugins: Plugins(mode).concat(htmlWebpackPlugins),
    // 解析
    resolve: {
      // 自动解析确定的扩展
      extensions: ['.wasm', '.mjs', '.js', '.json'],
      alias: {
        '@': path.join(__dirname, '..', 'src'), // @映射到src目录
        'react-dom': '@hot-loader/react-dom'  // 该包支持对React hook热更新
      }
    },
  }
};