const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname);
module.exports = {
  devtool: 'cheap-module-source-map',//default
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
    app: ['babel-polyfill', './index']
  },
  output: {
    path:path.join(srcPath, 'dist/'),
    publicPath: './',
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
      }
    }),
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
