/**
 * Created by vjain3 on 1/13/17.
 */
var webpack = require('webpack');
var path = require('path');


// Webpack Config
var webpackConfig = {
    entry: {
        'polyfills': './app/polyfills.browser.ts',
        'vendor':    './app/vendor.browser.ts',
        'main':       './app/main.browser.ts',
    },

    output: {
        path: './app',
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true)
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.jpe?g$|\.gif$|\.png$/, loader: 'file?name=assets/[name].[hash].[ext]' }
        ]
    }

};


// Our Webpack Defaults
var defaultConfig = {
    cache: true,
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        root: [ path.join(__dirname, 'src') ],
        extensions: ['', '.ts', '.js']
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    }
};

var webpackMerge = require('webpack-merge');

module.exports = webpackMerge(defaultConfig, webpackConfig);