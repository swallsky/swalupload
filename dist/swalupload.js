!function(e){function t(o){if(r[o])return r[o].exports;var a=r[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var r={};t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(module,exports,__webpack_require__){!function($,plupload){function send_request(){var e={};return $.ajax({type:"GET",url:server_sign_url,async:!1,dataType:"json",success:function(t){e=t}}),e}function check_object_radio(e){g_object_name_type=1==e?"random_name":"local_name"}function get_signature(){if(now=timestamp=Date.parse(new Date)/1e3,expire<now+3){var e=send_request();return host=e.host,policyBase64=e.policy,accessid=e.accessid,signature=e.signature,expire=parseInt(e.expire),callbackbody=e.callback,key=e.dir,!0}return!1}function random_string(e){e=e||32;var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",r=t.length,o="";for(i=0;i<e;i++)o+=t.charAt(Math.floor(Math.random()*r));return o}function get_suffix(e){return pos=e.lastIndexOf("."),suffix="",-1!=pos&&(suffix=e.substring(pos)),suffix}function calculate_object_name(e){return"local_name"==g_object_name_type?g_object_name+="${filename}":"random_name"==g_object_name_type&&(suffix=get_suffix(e),g_object_name=key+random_string(10)+suffix),""}function get_uploaded_object_name(e){return"local_name"==g_object_name_type?(tmp_name=g_object_name,tmp_name=tmp_name.replace("${filename}",e),tmp_name):"random_name"==g_object_name_type?g_object_name:void 0}function set_upload_param(e,t,r,o){o==ossServerUrl&&(0==r&&(r=get_signature()),g_object_name=key,""!=t&&(suffix=get_suffix(t),calculate_object_name(t)),new_multipart_params={key:g_object_name,policy:policyBase64,OSSAccessKeyId:accessid,success_action_status:"200",callback:callbackbody,signature:signature},e.setOption({url:host,multipart_params:new_multipart_params})),e.start()}var previewdata=__webpack_require__(1),cropParas=__webpack_require__(2),accessid="",host="",policyBase64="",signature="",callbackbody="",filename="",key="",expire=0,g_object_name="",g_object_name_type="",server_sign_url="../php/config.php",now=timestamp=Date.parse(new Date)/1e3,ossServerUrl="http://oss.aliyuncs.com";$.fn.swalupload=function(options){var defaults={flash:"lib/plupload-2.1.2/js/Moxie.swf",silverlight:"lib/plupload-2.1.2/js/Moxie.xap",serverSignUrl:"",rename:!0,maxfilesize:"10mb",postButton:null,multi:!1,serverSaveUrl:ossServerUrl,FilesAdded:function(e,t,r){},UploadProgress:function(e,t,r){},FileUploaded:function(e,t,r,o){},UploadComplete:function(e,t,r){},Error:function(e,t,r){alert(e)}},me=this,opts=jQuery.extend(defaults,options);return""!=opts.serverSignUrl&&(server_sign_url=opts.serverSignUrl),opts=__webpack_require__(3)(opts),$(this).each(function(i,o){var uploader=new plupload.Uploader({runtimes:"html5,flash,silverlight,html4",multi_selection:1!=opts.multi,browse_button:$(o)[0],container:$(me).parent()[0],url:opts.serverSaveUrl,flash_swf_url:opts.flash,silverlight_xap_url:opts.silverlight,filters:opts.filters,init:{PostInit:function(){null!=opts.postButton?$(opts.postButton).click(function(){return set_upload_param(uploader,"",!1,opts.serverSaveUrl),!1}):set_upload_param(uploader,"",!1,opts.serverSaveUrl)},FilesAdded:function(e,t){plupload.each(t,function(t){t.ext=get_suffix(t.name).substring(1),t.ratio=plupload.formatSize(t.size),-1==$.inArray(t.ext.toLowerCase(),["jpg","png","gif"])?(t.previewdata="",opts.FilesAdded(t,o,e)):previewdata(t,function(r){t.previewdata=r,opts.FilesAdded(t,o,e)})}),null==opts.postButton&&set_upload_param(uploader,"",!1,opts.serverSaveUrl)},BeforeUpload:function(e,t){check_object_radio(opts.rename),set_upload_param(e,t.name,!0,opts.serverSaveUrl)},UploadProgress:function(e,t){opts.UploadProgress(t,o,e)},FileUploaded:function(up,file,info){if(ossServerUrl==opts.serverSaveUrl)file.ext=get_suffix(file.name).substring(1),file.path=get_uploaded_object_name(file.name)+cropParas.get();else{var data=eval("("+info.response+")");file.name=data.name,file.path=data.path}opts.FileUploaded(file,info,o,up),cropParas.clear()},UploadComplete:function(e,t){t.length>0&&(opts.UploadComplete(t,o,e),cropParas.clear())},Error:function(e,t){-600==t.code?opts.Error("选择的文件超过了"+opts.filters.max_file_size,o,e):-601==t.code?opts.Error("不能上传该类型的文件",o,e):-602==t.code?opts.Error("该文件已经上传过了",o,e):opts.Error(t.response,o,e)}}});uploader.init()}),{setCrop:function(e){cropParas.set(e)},getCrop:function(){return cropParas.get()},clearCrop:function(){cropParas.clear()}}}}(jQuery,plupload)},function(e,t){e.exports=function(e,t){if(e&&/image\//.test(e.type))if("image/gif"==e.type){var r=new mOxie.FileReader;r.onload=function(){t(r.result),r.destroy(),r=null},r.readAsDataURL(e.getSource())}else{var o=new mOxie.Image;o.onload=function(){var e="image/jpeg"==o.type?o.getAsDataURL("image/jpeg",80):o.getAsDataURL();t&&t(e),o.destroy(),o=null},o.load(e.getSource())}}},function(e,t){var r="";t.get=function(){return""==r?"":"?x-oss-process=image/crop,x_"+r.x+",y_"+r.y+",w_"+r.width+",h_"+r.height},t.clear=function(){r=""},t.set=function(e){var t={x:0,y:0,width:0,height:0};if(void 0!==e)for(var o in t)void 0!==e[o]&&(t[o]=Math.floor(e[o]));r=t}},function(e,t){var r=[{title:"Image files",extensions:"jpg,gif,png,bmp"},{title:"Zip files",extensions:"zip,rar"}];e.exports=function(e){if(void 0===e.filters){var t={mime_types:r,max_file_size:"10mb",prevent_duplicates:!1};navigator.userAgent.indexOf("Chrome")>-1?t.mime_types=[]:t.mime_types=r,e.filters=t}else void 0===e.filters.mime_types&&(e.filters.mime_types=r),void 0===e.filters.max_file_size&&(e.filters.max_file_size="10mb"),void 0===e.filters.prevent_duplicates&&(e.filters.prevent_duplicates=!1);return e}}]);