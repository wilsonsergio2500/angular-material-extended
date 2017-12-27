const webpack = require('webpack');
const path = require('path');

const compileDir = path.join(__dirname, '..', 'landmark-app');
const isProd = process.env.NODE_ENV === 'production';
"use strict";

module.exports = {
    entry: {
        'src/bundle': './app/mainx.tsx',
        'src/lazy-modules/admin/bundle': './app/lazy-modules/admin/index.ts',
        'src/lazy-modules/public/bundle': './app/lazy-modules/public/index.ts',
        'src/lazy-modules/posts/bundle': './app/lazy-modules/posts/index.ts',
    }, 
    output: {
        path: isProd ? compileDir : __dirname,
        filename: "[name].js"
    },
    devtool: isProd ? "cheap-source-map":  "source-map",
    
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
        new webpack.EnvironmentPlugin(['NODE_ENV'])

    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        //extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        extensions: [".tsx", ".ts", ".js"]
    }
};