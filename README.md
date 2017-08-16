# SwalUpload
基于


## 开始使用

### composer

- `composer require swallsky/alioss`


### 使用方法1

```php
//require('../vendor/autoload.php'); //加载composer,一般情况下这个都是框架集成

$res = SwaSky\Alisms\Send::verifyCode('手机号',mt_rand(1000,9999),[
    'accessKeyId'   =>  '', //阿里云 acess key
    'accessKeySecret'  => '', //阿里云 access secret
    'signName'  =>  '', //短信签名
    'templateCode'  =>  '', //短信模板code
    'logfile'   =>  '' //短信异常信息日志文件信息
]);
if($res==0){
    echo '发送失败!';
}else{
    echo '发送成功!';
}
```

### 使用方法2
默认配置文件在app/config/alisms.php,可以通过设置verifyCode第三个参数改变配置信息路径
```alisms.php
/**
 * 短信配置信息
 */
return [
    'accessKeyId'   =>  env('ALI_ACCESSKEY'), //阿里云Access ID
    'accessKeySecret'  => env('ALI_ACCESSKEYSECRET'), //阿里云Access Key
    'signName'  =>  env('ALI_SIGNNAME'), //短信签名
    'templateCode'  =>  env('ALI_TEMPCODE'), //短信模板code
    'logfile'   =>  storage_path('logs/alisms-'.date('Y-m-d').'.log') //日志保存目录
];
```

```send.php
//require('../vendor/autoload.php'); //加载composer,一般情况下这个都是框架集成

$res = SwaSky\Alisms\Send::verifyCode('手机号',mt_rand(1000,9999));
if($res==0){
    echo '发送失败!';
}else{
    echo '发送成功!';
}
```

## 获取Access ID和Access Key
[如何获取Access ID和Access Key](https://help.aliyun.com/knowledge_detail/38738.html)

## 短信相关操作
[短信签名](https://help.aliyun.com/document_detail/55327.html?spm=5176.8195934.507901.5.KZkgsL)
[短信模板](https://help.aliyun.com/document_detail/55330.html?spm=5176.doc55327.6.544.lhzuXh)

