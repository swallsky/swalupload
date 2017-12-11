/**
 * 上传文件格式、大小等过滤规则
 * @param opts
 * @returns {{mime_types: [*,*], max_file_size: string, prevent_duplicates: boolean}}
 */
/* 默认上传格式 */
var defaultFileFormat = [
    {title: "Image files", extensions: "jpg,gif,png,bmp"},
    {title: "Zip files", extensions: "zip,rar"}
];
/* 默认文件大小 */
var defaultFileSize = '10mb';

/* 是否可以重复选择文件 */
var defaultDuplicates = false;

module.exports = function (opts) {
    if(typeof opts.filters == 'undefined'){//没有设置过滤文件、大小等过滤规则
        var filters = {//充许上传的文件
                mime_types: defaultFileFormat,
                max_file_size: defaultFileSize, //最大只能上传10mb的文件
                prevent_duplicates: defaultDuplicates //不允许选取重复文件,默认可以添加重复文件
            },
            userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        if (userAgent.indexOf("Chrome") > -1) {
            //因为谷歌浏览器选择文件慢，所以只能放开文件类型选择
            filters.mime_types = [];
        } else {
            filters.mime_types = defaultFileFormat;
        }
        opts.filters = filters;
    }else{//有部分设置
        if(typeof opts.filters.mime_types == 'undefined'){//设置默认上传格式
            opts.filters.mime_types = defaultFileFormat;
        }
        if(typeof opts.filters.max_file_size == 'undefined'){//设置默认上传文件大小
            opts.filters.max_file_size = defaultFileSize;
        }
        if(typeof opts.filters.prevent_duplicates == 'undefined'){//设置默认是否重复选择文件
            opts.filters.prevent_duplicates = defaultDuplicates;
        }
    }
    return opts;
};