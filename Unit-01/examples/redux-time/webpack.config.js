module.exports = {
  context: __dirname + "/",
  entry: './index.js',
  output: {
    path: __dirname + "/",
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};