const path=require('path')
const webpack=require('webpack')
const HtmlWebPackPluggin=require("html-webpack-plugin") //plugin to dynamically add html files to our dist folder
//const CleanWebpackPlugin = require('clean-webpack-plugin'); //plugin for clean build of dist folder
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const styleLoader=require('style-loader')
const cssLoader=require('css-loader')
const scssLoader=require('sass-loader')

 
module.exports={
    mode:"development",
    entry:"./src/client/index.js",
    output:{
        libraryTarget:'var',
        library:'Client'
    },
    module: {
        rules: [
                {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
                },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
},
plugins:[
    new HtmlWebPackPluggin({
        template:'./src/client/views/index.html',
        filename:'./index.html'
    })
    
]
}