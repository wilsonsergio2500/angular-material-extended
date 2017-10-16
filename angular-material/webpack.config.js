const webpack = require('webpack');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
"use strict";

module.exports = {
    entry: "./app/mainx.tsx",
    output: {
        filename: "./src/bundle.js"
    },
    devtool: isProd ? "source-map" : "cheap-source-map",
    
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },

  

    module: {

        rules: [
              {
                  test: /\.js$/,
                  use: ["source-map-loader"],
                  enforce: "pre"
              },
              { test: /\.tsx?$/, loader: 'ts-loader' },

               {
                   test: /\.css$/,
                   use: ['style-loader', 'css-loader']
               },
               {
                   test: /\.svg$/,
                   use: ['raw-loader' ]
               }
        ],


    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),

    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        //extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        extensions: [".tsx", ".ts", ".js"]
    }
};