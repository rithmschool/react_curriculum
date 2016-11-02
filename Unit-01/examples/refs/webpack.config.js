module.exports = {
    entry: './js/index.js',
    output: {
        path: './',
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        loaders:[{
            loader: 'babel',
            exclude: /node_modules/,
            test: /\.jsx?$/
        }]
    }
}