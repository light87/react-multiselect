const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const localConfig = require('./webpack.config.js');
const PORT = require('./package.json').webpackDevServerPort;
function startDevServer() {
  new WebpackDevServer(webpack(localConfig), {
    publicPath: localConfig.output.publicPath,
    contentBase: localConfig.devServer.contentBase,
    hot: true,
    noInfo: false,
    quiet: true,
    https: false,
    historyApiFallback: true,
  }).listen(PORT, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Listening at localhost:${PORT}`);
  });
}
startDevServer();












