'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtJSReactorWebpackPlugin = require('@extjs/reactor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',

    entry: [
        './src/index'
    ],

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    },

    resolve: {
        alias: {
            "react-dom": path.resolve('./node_modules/react-dom')
        }
    },

    plugins: [
        new ExtJSReactorWebpackPlugin({
            sdk: 'ext', // you need to copy the Ext JS SDK to the root of this package, or you can specify a full path to some other location
            theme: './ext-material',
            packages: []
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            hash: true
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                exclude: /\/favicon.ico$/,
                loader: 'file',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    },

    devServer: {
        contentBase: "./build",
        noInfo: true,
        hot: true
    }
};
