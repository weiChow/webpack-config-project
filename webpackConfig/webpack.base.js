/**
 * webpack基础配置
 */

const glob = require("glob");
const path = require("path");
const Rules = require("./common/Rules");
const Plugins = require("./common/plugins");

// 简化了HTML文件的创建，以便为你的webpack包提供服务
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (mode) => {
  // 多页应用
  const setMPA = () => {
    let entry = {};
    let htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, "../src/pages/*/index.js"));
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
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true //删除空白符与换行符
          }
        }));
    });

    return {
      entry,
      filename: "pages/[name]/[name]_[hash:16].js",
      htmlWebpackPlugins
    }
  };

  // 单页应用
  const setSPA = () => {
    return {
      entry: path.resolve(__dirname, "../index.tsx"),
      filename: "js/[name]_[hash:16].js",
      htmlWebpackPlugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, `../index.html`),
          filename: `index.html`,
          inject: true, // 将js放在body底部
          minify: {
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true //删除空白符与换行符
          }
        })
      ]
    }
  };

  const {entry, filename, htmlWebpackPlugins} = process.env.appMode === "SPA" ? setSPA() : setMPA();

  return {
    mode: mode, // 配置webpack构建模式(development production)
    entry,  //入口
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename,
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
      extensions: [".wasm", ".mjs", ".ts", ".tsx", ".js", ".json"],
      alias: {
        "@": path.join(__dirname, "..", "src"), // @映射到src目录
        "react-dom": "@hot-loader/react-dom"  // 该包支持对React hook热更新
      }
    },
  }
};