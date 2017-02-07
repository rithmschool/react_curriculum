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
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015'] }
      }]
    }]
  }
};

