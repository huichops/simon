const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


process.env.AUTH0_CLIENT_ID = 'f4to0gzhJ4eWYx7MaquQdPFxu873B5Pc';
process.env.AUTH0_DOMAIN = 'liushh.auth0.com';

module.exports = {
  context: __dirname,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    stats: 'errors-only'
  },
  entry: path.join(__dirname, 'scripts/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'scripts'),
    filename: 'index.processed.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.html',
    title: 'Simon dice'
  })]
};
