module.exports = {
    context: __dirname,
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            loader: 'babel-loader',
            exclude: /node_modules/,
            test: /\.jsx?$/
        }]
    }
}