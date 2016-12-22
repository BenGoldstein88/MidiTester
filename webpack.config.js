var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
  './src/index'
  ],
  module: {
    loaders: [
    { test: /\.js?$/, loader: 'babel', exclude: /node_modules/ },
    { test: /\.s?css$/, loader: 'style!css!sass' },
    { test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
loader : 'file-loader' },
    {test: /\.mid$/, loader: 'file-loader'}     
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  node: {
    fs: "empty"
  },
  plugins: [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
  ]
};
