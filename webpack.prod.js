const path=require('path')
const webpack=require('webpack')
const HtmlWebPackPluggin=require("html-webpack-plugin") //plugin to dynamically add html files to our dist folder
//const CleanWebpackPlugin = require('clean-webpack-plugin'); //plugin for clean build of dist folder
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const styleLoader=require('style-loader')
const cssLoader=require('css-loader')
const scssLoader=require('sass-loader')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin'); //service worker pluggin
const TerserPlugin=require('terser-webpack-plugin')
const OptimizeCssAssetPlugin=require('optimize-css-assets-webpack-plugin')

//recall to add the service worker script at index.html
module.exports={
    mode:"production",
    entry:"./src/client/index.js",
    output:{
        libraryTarget:'var',
        library:'Client'
    },
    devtool:'source-map',
    devServer:{
        port: 8080,
        localhost: 8080,
    },
    optimization:{
        minimizer:[new TerserPlugin({}), new OptimizeCssAssetPlugin]
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
                use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            }
        ]
},
plugins:[
    new HtmlWebPackPluggin({
        template:'./src/client/views/index.html',
        filename:'./index.html'
    }),
    new MiniCssExtractPlugin({filename:'[name].css'}),
    new WorkboxPlugin.GenerateSW()
    
]
}