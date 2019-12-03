const path = require("path");
const os = require('os');
const open = require('open');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpackConfig/webpack.dev.js');
const compiler = webpack(config);

// 告诉 express 使用 webpack-dev-middleware，
// 以及将 webpack.dev.js 配置文件作为基础配置
app.use(webpackDevMiddleware(compiler, {
  //server 脚本使用 publicPath，以确保文件资源能够正确地 serve 在 http://localhost:8000
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }// 统计信息
}));

// 使用webpack-hot-middleware中间件，配置在console台输出日志
app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000  // 心跳检测(一般为timeout一半)
}));

// 路由
app.get('/:pageName?', function (req, res, next) {

  const pageName = `${req.params.pageName
    ? `${req.params.pageName}/${req.params.pageName}.html`
    : 'index.html'}`;

  const filepath = path.join(compiler.outputPath, 'pages', pageName);

  // 使用webpack提供的outputFileSystem
  compiler.outputFileSystem.readFile(filepath, function (err, result) {
    if (err) {
      // something error
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

// 将文件 serve 到 port 8000
app.listen(8000, function () {
  console.log(`app listening on \n http://localhost:8000! \n http://${getIPAddress()}:8000!`);
  (async () => {
    await open('http://localhost:8000/index');
  })();
});

/**
 * 获取本机IP
 * @returns {string}
 */
function getIPAddress() {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}