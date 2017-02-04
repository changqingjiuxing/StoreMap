<?php
    require_once("./tools.php");

    /**
     * CURL创建新云图
     * @param string    key     高德云图API KEY
     */
    function create_new_map(){
        $data['key'] = '8edbb813fca4cb8b0b82299a86cbafba';
        $data['name'] = 'asd';

        return curl_data("https://yuntuapi.amap.com/datamanage/table/create",'post',ToUrlParams($data));
    }
?>
