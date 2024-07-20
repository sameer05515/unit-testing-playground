const path = require('path');
const glob = require('glob');

// Function to get all JavaScript files in a directory and its subdirectories
function getJavaScriptFiles(dir) {
  const files = glob.sync(`${dir}/**/*.js`);
  return files.reduce((entries, file) => {
    const entryName = path.relative(dir, file).replace(/\\/g, '/').replace(/\.js$/, '');
    entries[entryName] = path.resolve(__dirname, file);
    return entries;
  }, {});
}

module.exports = {
  // entry: './src/index.js',
  entry: getJavaScriptFiles('./src/scripts'), // Dynamically get all JS files in src/js/lib and its subdirectories
  output: {
    // filename: 'bundle.js',
    filename: '[name].js', // Dynamically name output bundles based on entry keys
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
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  mode: 'development',
  devtool: 'source-map', // Enable source maps
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 6060,
    open: true,
    hot: true,
  },
};
