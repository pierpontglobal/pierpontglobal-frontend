const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  context: __dirname,

  devtool: 'cheap-eval-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/styles/main.scss',
    './src/Index.jsx'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  devServer: {
    hot: true,
    publicPath: '/public/',
    historyApiFallback: true
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },

  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },

  module: {
    rules: [{
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // sass / scss loader for webpack
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      // define where to save the file
      filename: "main.bundle.css"
    })
  ],

};

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  config.entry = './src/App.jsx';
  config.devtool = false;
  config.plugins = [];
}

module.exports = config;
