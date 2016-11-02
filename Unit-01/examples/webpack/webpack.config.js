module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: './'
    },
    module: {
        loaders:[{
            loader: 'babel',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    devtool: 'inline-source-map'
}