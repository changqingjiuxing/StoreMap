<?php
    /**
    * curl数据传输函数
    * @param 		string 		$url 		curl地址
    * @param 		string 		$type 		传输方式get/post
    * @param 		string 		$post_data 	post方式的传输数据
    * @return 		mix 		$return_data 	数据传输返回的相应数据
    */
    function curl_data($url,$type,$post_data){
        $type = !$type ? 'get' : $type;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30); //30秒超时

        //post传输
        if($type == 'post'){
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        }
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $return_data = curl_exec($ch);
        curl_close($ch);
        return $return_data;
    }

    /**
     *
     * 参数数组转换为url参数
     * @param array $urlObj
     */
    function ToUrlParams($urlObj){
        $buff = "";
        foreach ($urlObj as $k => $v)
        {
            $buff .= $k . "=" . $v . "&";
        }

        $buff = trim($buff, "&");
        return $buff;
    }
?>
