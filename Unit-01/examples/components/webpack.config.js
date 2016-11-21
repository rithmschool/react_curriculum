module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: './'
    },
    module: {
        loaders:[{
            loader: 'babel',
            test: /\.jsx?$/,
            exclude: /node_modules/
        }]
    },
    devtool: 'inline-source-map'
}