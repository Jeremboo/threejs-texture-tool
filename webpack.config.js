var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var poststylus = require('poststylus');

var node_modules = path.resolve(__dirname, './node_modules/');

var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

var env = process.env.WEBPACK_ENV;

var libraryName = 'threejsTextureTool';

var entry = [];
var output = {};
var externals = {};
var devtool = '';
var plugins = [];

if (env === 'build') {
  entry = {
    app: path.resolve(__dirname, './src/index.js'),
  };
  output = {
    path: path.resolve(__dirname, './dist'),
    filename: libraryName + '.min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  };
  externals = {
    three: true,
  };
  plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: true, drop_console: true },
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true,
    }),
    new UnminifiedWebpackPlugin(),
  ];
} else {
  entry = [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3333',
    path.resolve(__dirname, './demo/app.js'),
  ];
  output = {
    path: path.resolve(__dirname, './demo'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3333/',
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
  };
  devtool = 'eval-source-map';
  plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      // favicon: './app/assets/imgs/favicon.png',
    }),
  ];
}

module.exports = {
  entry: entry,
  output: output,
  devtool: devtool,
  externals: externals,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: node_modules,
      loader: 'babel',
    },
    {
      test: /\.styl$/,
      loader: 'style!css!stylus',
    }],
  },
  stylus: {
    use: [
      poststylus(['autoprefixer']),
    ],
  },
  plugins: plugins,
};
