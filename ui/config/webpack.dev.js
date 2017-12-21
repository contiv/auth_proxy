/**
 * Created by vjain3 on 1/13/17.
 */
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity })
    ],
    devtool: 'cheap-module-eval-source-map',
    debug: true,

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        stats: 'minimal'
    }
});
