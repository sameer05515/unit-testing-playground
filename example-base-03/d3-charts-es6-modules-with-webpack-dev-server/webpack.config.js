const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  mode: 'development',
  watch: true, // Optional: Enable watch mode if desired
  // Enable source maps
  devtool: 'inline-source-map',  // This generates source maps in a separate file.
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 6060,
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement
  },
};
