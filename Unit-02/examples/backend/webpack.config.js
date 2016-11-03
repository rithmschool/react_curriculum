var path = require('path');

module.exports = {
    context: __dirname + '/client',
    entry: './js/index.js',
    output: {
        filename: 'bundle.js'
      },

    devtool: 'inline-source-map',

    module: {
      loaders: [{
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/
        }]
    },

    devServer: {
        // publicPath: './client',
        // port: 3000,
        hot: true,
        contentBase: './client',
        stats: {
          colors: true
        },

        historyApiFallback: true,

        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'X-Requested-With'
        },

        proxy: {
          '/api/*': 'http://localhost:3001'
        }
    }
};