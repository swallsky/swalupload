/**
 * 生产环境部署
 * @type {webpack}
 */
var webpack = require('webpack');

module.exports = {
    entry:{
        swalupload:__dirname+"/src/upload.js",
    },
    output: {//输入文件
        path:__dirname+"/dist", //此处输出的路径必须是绝对路径
        filename:'[name].js'
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
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ]
};