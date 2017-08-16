<?php
require('policy.php');
echo Policy::config([
    'id'    =>  '', //aliyun id
    'key'   =>  '', //aliyun key
    'host'  =>  '', //oss host
    'dir'   =>  'user-dir/' //上传文件路径
]);
?>