const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');


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
    new ExtractText({
      filename: '../css/app.css',
      disable: false,
      allChunks: true
    })
  ]
};
