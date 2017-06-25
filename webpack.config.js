const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: path.resolve(__dirname, "./web/static/js/app.js"),
  output: {
    path: path.resolve(__dirname, "./priv/static/js"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react',  ['latest', { 'es2015': { 'modules': false } }]],
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?name=../fonts/[name].[ext]&limit=10000'
      },
      {
        test: /\.scss$/,
        use:  ExtractText.extract({
          fallback: "style-loader",
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
        })
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "web/static/images",
      to: "../images"
    }]),
    new ExtractText({
      filename: '../css/app.css',
      disable: false,
      allChunks: true
    })
  ]
};
