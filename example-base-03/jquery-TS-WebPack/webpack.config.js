const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Function to get all TypeScript files in a directory and its subdirectories
function getTypeScriptFiles(dir) {
  const files = glob.sync(`${dir}/**/*.ts`);
  return files.reduce((entries, file) => {
    const entryName = path.relative(dir, file).replace(/\\/g, '/').replace(/\.ts$/, '');
    entries[entryName] = path.resolve(__dirname, file);
    return entries;
  }, {});
}

module.exports = {
  // Dynamically get all TypeScript files in src/scripts
  entry: getTypeScriptFiles('./src/scripts'), 
  output: {
    // Use [name] to dynamically name output bundles based on entry keys
    filename: '[name].js', 
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,   
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './src/index.html',
  //   }),
  // ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    port: 8083,  // You can adjust this port if needed
  },
  mode: 'development',
  devtool: 'source-map',  // Enable source maps for better debugging
};
