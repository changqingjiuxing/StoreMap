<?php
    require_once("./tools.php");

    function __construct(){
        $fun_name = $_G['fun'];
        if (function_exists('fun_name'))
            call_user_func($fun_name);
    }

    function create_new_map(){
        $data['key'] = '8edbb813fca4cb8b0b82299a86cbafba';
        $data['name'] = 'asd';

        $return_data = curl_data("https://yuntuapi.amap.com/datamanage/table/create",'post',ToUrlParams($data));
        var_dump($return_data);
    }
    create_new_map();
?>
