<?php
    require_once("./tools.php");
    function create_new_map(){
        $data['key'] = '8edbb813fca4cb8b0b82299a86cbafba';
        $data['name'] = 'asd';

        $return_data = curl_data("https://yuntuapi.amap.com/datamanage/table/create",'post',ToUrlParams($data));
        var_dump($return_data);
    }
    create_new_map();
?>
