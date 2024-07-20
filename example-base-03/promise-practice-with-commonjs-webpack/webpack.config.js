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
  mode: 'development', // or 'production'
  entry: getJavaScriptFiles('./src/scripts'), // Dynamically get all JS files in src/js/lib and its subdirectories
  output: {
    filename: '[name].js', // Dynamically name output bundles based on entry keys
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  watch: true, // Optional: Enable watch mode if desired
  // Enable source maps
  devtool: 'inline-source-map',  // This generates source maps in a separate file.
};
