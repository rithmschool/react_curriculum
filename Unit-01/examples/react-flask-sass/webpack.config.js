const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const scssLoaders = [
  'css-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
]

const config = {
  entry: './src/index',
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', scssLoaders.join('!'))
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './static'),
    publicPath: '/static'
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [path.join(__dirname, './src')]
  }
}

module.exports = config