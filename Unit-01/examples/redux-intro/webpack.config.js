module.exports = {
    context: __dirname,
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
    },
    devtool: 'eval',
    module: {
        rules: [{
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    }
}