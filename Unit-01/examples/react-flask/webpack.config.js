module.exports = {
  entry: {
    index: "./js/index.js",
    new: "./js/new.js",
  },
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/static',
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
};
