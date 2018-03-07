/**
 * Created by cshampur on 4/10/17.
 */

/**
 * Created by vjain3 on 1/13/17.
 */
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    debug: true,

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        stats: 'minimal'
    }
});
