module.exports = {
    entry: './main.js',
    output: {
        path: __dirname,
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' , name :'img/[name].[hash:7].[ext]'}
        ]
    }
}
