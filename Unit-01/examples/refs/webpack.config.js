module.exports = {
  context: __dirname + "/js",
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
      use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015'] }
      }]
    }]
  }
};

