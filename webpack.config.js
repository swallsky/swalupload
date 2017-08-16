/**
 * 开发环境
 * @type {webpack}
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html插件
var path = require('path');
var appdir = path.resolve(__dirname,'./app'); //应用目录
var builddir = path.resolve(__dirname,'./build'); //编译后的目录

module.exports = {
    entry:{
        swalupload:appdir+"/js/swalupload.js",
    },
    output: {//输入文件
        path:builddir+"/js", //开发编译后的目录
        filename:'[name].[hash].js'
    },
    module: {//模块加载
        loaders:[
            {
                test: /\.json$/,
                loader : "json"
            },
            {
                test: /\.css$/,
                loader : "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'简单实例',
            filename:builddir+'/simple.html',
            template:appdir+'/tpls/simple.html',
            inject:false //不让自动注入
        }),
        new HtmlWebpackPlugin({
            title:'多文件上传',
            filename:builddir+'/list.html',
            template:appdir+'/tpls/list.html',
            inject:false //不让自动注入
        })
    ]
};