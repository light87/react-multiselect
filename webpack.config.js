const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname);
console.log(srcPath);
module.exports = {
  devtool: 'eval',//default
  devServer: {
    contentBase: srcPath,
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  },
  context: srcPath,
  cache: true,
  entry: {
    app: ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server','babel-polyfill','./index']
  },
  output: {
    path:'/build/static',
    publicPath: '/static/',
    filename: '[name].js',
    chunkFilename: "[name].js",
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),

  ],
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react'),
      'babel-polyfill': path.join(__dirname, 'node_modules',"babel-polyfill/dist/polyfill.min.js"),
    },
    extensions: ['.js', '.styl', '.jsx']
  },
  module: {
    noParse: [/babel-polyfill/],
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ],
        exclude: [/node_modules/]
      }
    ]
  }
};
