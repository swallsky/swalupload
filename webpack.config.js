/**
 * 开发环境
 * @type {webpack}
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html插件
var path = require('path');
var appdir = path.resolve(__dirname,'./app'); //应用目录
var builddir = path.resolve(__dirname,'./build'); //编译后的目录
//入口文件
module.exports.entry = {
    swalupload:appdir+"/js/swalupload.js"
};
//加载器
module.exports.module = {//模块加载
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
};

if(process.env.NODE_ENV == 'development') {//开发环境
    //输出文件
    module.exports.output = {
        path:builddir+"/js", //开发编译后的目录
        filename:'[name].[hash].js'
    };
    //插件管理
    module.exports.plugins = [
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
    ];
}else{//生产环境
    //输出文件
    module.exports.output = {//输入文件
        path:__dirname+"/dist", //生产环境目录
        filename:'[name].js'
    };
    //编译压缩打包程序
    module.exports.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ];
}