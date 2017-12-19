/**
 * 基于oss的参数裁剪
 */
/* oss裁剪参数 */
var imagesCrop = '';

/**
 * 获取参数
 * @returns {string}
 */
exports.get = function () {
    return imagesCrop==''?'':
        '?x-oss-process=image/crop,x_'+imagesCrop.x+',y_'+imagesCrop.y+',w_'+imagesCrop.width+',h_'+imagesCrop.height;
};

/**
 * 清空参数
 */
exports.clear = function () {
    imagesCrop = '';
};

/**
 * 设置裁剪参数
 * @param data
 */
exports.set = function (data) {
    var options = {
        x:0,
        y:0,
        width:0,
        height:0
    }
    if(typeof data != 'undefined'){
        for(var i in options){
            if(typeof data[i] != 'undefined'){
                options[i] = data[i]
            }
        }
    }
    imagesCrop = options;
}