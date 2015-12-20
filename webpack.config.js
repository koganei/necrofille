var path = require('path');
module.exports = {
    entry: './js/main.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: __dirname,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    }
};