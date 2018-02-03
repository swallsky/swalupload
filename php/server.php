<?php
/**
 * 远程非oss接受文件
 */
defined('DS') or define('DS', DIRECTORY_SEPARATOR); //路径分隔符

class FileUpload
{
    /**
     * @return array 充许的扩展名
     */
    public static function allowExt()
    {
        return ['jpg','gif','png','zip','rar','doc','docx','xls','xlsx','ppt','pptx','pdf'];
    }

    /**
     * 上传文件
     * @return string
     */
    public function save()
    {
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
        header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
        header("Cache-Control: no-store, no-cache, must-revalidate");
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");
        // Settings
        $targetDir = __DIR__.DS.'uploads'; //存储目录

        $cleanupTargetDir = true; // Remove old files
        $maxFileAge = 5 * 3600; // Temp file age in seconds

        // 5 minutes execution time
        @set_time_limit(5 * 60);

        // Uncomment this one to fake upload time
        // usleep(5000);

        // Get parameters
        $chunk = isset($_REQUEST["chunk"]) ? intval($_REQUEST["chunk"]) : 0;
        $chunks = isset($_REQUEST["chunks"]) ? intval($_REQUEST["chunks"]) : 0;
        $fileName = isset($_REQUEST["name"]) ? $_REQUEST["name"] : '';
        $oldfileName = $fileName;
        // Clean the fileName for security reasons
        $fileName = preg_replace('/[^\w\._]+/', '_', $fileName);
        // Make sure the fileName is unique but only if chunking is disabled
        if ($chunks < 2 && file_exists($targetDir . DS . $fileName)) {
            $ext = strrpos($fileName, '.');
            $fileName_a = substr($fileName, 0, $ext);
            $fileName_b = substr($fileName, $ext);

            $count = 1;
            while (file_exists($targetDir . DS . $fileName_a . '_' . $count . $fileName_b))
                $count++;

            $fileName = $fileName_a . '_' . $count . $fileName_b;
        }

        $filePath = $targetDir.DS.$fileName;

        $pathinfo = pathinfo($filePath);
        $ext = strtolower($pathinfo['extension']);
        if(!in_array($ext,self::allowExt())){
            die('{"jsonrpc":"2.0","error":"上传文件为非法文件!"}');
        }

        // Create target dir
//        File::createDirectory($targetDir);

        // Remove old temp files
        if ($cleanupTargetDir && is_dir($targetDir) && ($dir = opendir($targetDir))) {
            while (($file = readdir($dir)) !== false) {
                $tmpfilePath = $targetDir . DS . $file;

                // Remove temp file if it is older than the max age and is not the current file
                if (preg_match('/\.part$/', $file) && (filemtime($tmpfilePath) < time() - $maxFileAge) && ($tmpfilePath != "{$filePath}.part")) {
                    @unlink($tmpfilePath);
                }
            }
            closedir($dir);
        } else
            die('{"jsonrpc":"2.0","error":"无法创建资源文件夹"}');


        // Look for the content type header
        if (isset($_SERVER["HTTP_CONTENT_TYPE"]))
            $contentType = $_SERVER["HTTP_CONTENT_TYPE"];

        if (isset($_SERVER["CONTENT_TYPE"]))
            $contentType = $_SERVER["CONTENT_TYPE"];

        // Handle non multipart uploads older WebKit versions didn't support multipart in HTML5
        if (strpos($contentType, "multipart") !== false) {
            if (isset($_FILES['file']['tmp_name']) && is_uploaded_file($_FILES['file']['tmp_name'])) {
                // Open temp file
                $out = fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");
                if ($out) {
                    // Read binary input stream and append it to temp file
                    $in = fopen($_FILES['file']['tmp_name'], "rb");
                    if ($in) {
                        while($buff = fread($in, 4096))
                            fwrite($out, $buff);
                    } else
                        die('{"jsonrpc":"2.0","error":"写入文件资源失败!"}');
                    fclose($in);
                    fclose($out);
                    @unlink($_FILES['file']['tmp_name']);
                } else
                    die('{"jsonrpc":"2.0","error":"输出文件资源失败!"}');
            } else
                die('{"jsonrpc":"2.0","error":"上传文件资源失败"}');
        } else {
            // Open temp file
            $out = fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");
            if ($out) {
                // Read binary input stream and append it to temp file
                $in = fopen("php://input", "rb");

                if ($in) {
                    while ($buff = fread($in, 4096))
                        fwrite($out, $buff);
                } else
                    die('{"jsonrpc":"2.0","error":"写入文件资源失败!"}');

                fclose($in);
                fclose($out);
            } else
                die('{"jsonrpc":"2.0","error":"输出文件资源失败!"}');
        }

        $filePath = str_replace('\\','/',$filePath);
        if ($chunks==0 || $chunk == $chunks - 1){ //文件结束
            //改写文件名
            $fpath = $pathinfo['dirname'];
            $newname = 'up'.microtime();
            $newname = str_replace('.','',$newname);
            $newname = str_replace(' ','',$newname);
            $newname = $newname.'.'.$ext;
            $newpath = $fpath.'/'.$newname;
            if(file_exists($newpath)){
                $newname = 'up'.microtime().mt_rand(1000,9999);
                $newname = str_replace('.','',$newname);
                $newname = str_replace(' ','',$newname);
                $newname = $newname.'.'.$ext;
                $newpath = $fpath.'/'.$newname;
            }
            rename($filePath.".part",$newpath);


            //数据整理
            $data['name'] = $oldfileName; //文件名
            $data['path'] = '/php/uploads/'.$newname; //文件路径
            echo json_encode(array(
                'jsonrpc'	=>	'2.0',
                'name'		=>	$oldfileName,
                'path'		=>	$data['path']
            ));
        }else{
            die('{"jsonrpc" : "2.0", "result":""}');
        }
    }

    /**
     * Converts bytes into human readable file size.
     *
     * @param string $bytes
     * @return string human readable file size (2,87 Мб)
     * @author Mogilev Arseny
     */
    public function FileSizeConvert($file)
    {
        $bytes = filesize($file);
        $arBytes = array(
            0 => array(
                "UNIT" => "TB",
                "VALUE" => pow(1024, 4)
            ),
            1 => array(
                "UNIT" => "GB",
                "VALUE" => pow(1024, 3)
            ),
            2 => array(
                "UNIT" => "MB",
                "VALUE" => pow(1024, 2)
            ),
            3 => array(
                "UNIT" => "KB",
                "VALUE" => 1024
            ),
            4 => array(
                "UNIT" => "B",
                "VALUE" => 1
            ),
        );

        foreach($arBytes as $arItem)
        {
            if($bytes >= $arItem["VALUE"])
            {
                $result = $bytes / $arItem["VALUE"];
                $result = strval(round($result, 2))." ".$arItem["UNIT"];
                break;
            }
        }
        return $result;
    }
}

//初始化
$obj = new FileUpload();
$obj->save();