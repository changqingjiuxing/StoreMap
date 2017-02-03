/**
 * StoreMap
 * @author Kyosee
 * 2017-2-3 16:01:54
 */

(function(w){
    var def_option = {
        key : '',                       //高德API Key
        tableid : '',                   //云图tableid
        map_selector : '#map',          //地图选择器名称
        init_fun : function(){
            this.importJS("http://webapi.amap.com/maps?v=1.3&key="+smap.config.key);
        }
    }
    w.smap = {
        option : def_option,
        config : function(option){
            this.option = $.extend({}, this.option , option);
            this.option.init_fun();
        },
        create_map : function(){
            layer.prompt({title: 'Please input your Map Name', formType: 0}, function(name, index){
                layer.close(index);
                if(!smap.config.key){
                    layer.msg("please config your key");
                }
                $.ajax({
                    url: 'http://yuntuapi.amap.com/datamanage/table/create',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        key: smap.config.key,
                        name : name
                    },
                    success:function(data){
                        if(data.status != 1){
                            layer.msg(data.info + " code : " + data.infocode);
                        }else{
                            smap.config.tableid = data.tableid;
                            return data;
                        }
                    }
                })
            });
        },
        /**
         * 初始化创建地图
         */
        init_map : function(){
            // var map = new AMap.Map("map", {
            //         resizeEnable: true,
            //         center: [116.397428, 39.90923],//地图中心点
            //         zoom: 12 //地图显示的缩放级别
            // });
        },
        importJS : function(filename){
            document.write('<script language=\"javascript\" src='+filename+'> <\/script>');
        }
    }
}(window))
