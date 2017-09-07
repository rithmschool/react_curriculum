module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: './'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: './'
  },
}
