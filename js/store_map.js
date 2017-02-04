;( function (w) {
    /**
     * 全局配置信息
     * @param   String  key     高德API KEY
     * @param   String  tableid 高德云图ID
     * @param   String  map     地图元素容器ID名称
     */
    var def_config = {
        key : '',
        tableid : '',
        map : '#map'
    }

    /**
     * 远程创建云图
     * @param   String  name    云图名称
     * @param   String  key     高德API KEY 默认不填读取全局配置的key
     * @param   Boolen  key     高德API KEY 默认不填读取全局配置的key
     * @method  init()  初始化请求创建云图 return 云图创建结果
     */
    var def_create = {
        name : 'test',
        key : '',
        init : function () {
            smap.tools.ajax({
                url: 'https://yuntuapi.amap.com/datamanage/table/create',
                type: 'post',
                dataType: 'json',
                data: {
                    key: smap.config.key,
                    name : this.name
                },
                success : function (data) {
                    if(data.status !== 1) {
                        this.success(data);
                    }else{
                        this.fail(data);
                    }
                },
                error : function (data) {
                    this.error(data);
                }
            })
        },
        success : function (data) {
            console.success("create success : "+data.tableid);
        },
        fail : function (data) {
            console.error("create fail : "+data.info + " code : " + data.infocode)
        },
        error : function (XMLHttpRequest, textStatus, errorThrown) {
            console.error(textStatus + errorThrown);
        }
    }

    /**
     * 主方法
     */
    w.smap = {
        setting : def_config,
        create_setting : def_create,
        config : function (option) {
            this.setting = this.tools.extend(this.setting, option);
        },
        create : function (option) {
            this.create_setting.key = this.setting.key;
            this.create_setting = this.tools.extend(this.create_setting , option);
            this.create_setting.init();
        },
    }

    /**
     * 工具类 参考网络
     */
    w.smap.tools = {
        extend : function (obj, obj2) {
            for (var key in obj2) {
                 obj[key] = obj2[key];
            }
            return obj;
        },
        ajax : function (obj){
            obj = obj||{};
            obj.type = (obj.type||'GET').toUpperCase();
            obj.dataType = obj.dataType||'json';
            var params = formatParams(obj.data);//参数格式化

            //step1:兼容性创建对象
            if(window.XMLHttpRequest){
                var xhr = new XMLHttpRequest();
            }
            else{
                var xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            //step4: 接收
            xhr.onreadystatechange = function(){
                if(xhr.readtState == 4){
                    alert(xhr.state+xhr.status)
                    if(xhr.state>=200 && xhr.status<300){
                        obj.success&&obj.success(xhr.responseText,xhr.responseXML);
                    }
                    else{
                        obj.error&&obj.error(xhr.status);
                    }
                }
            }

            //step2 step3:连接 和 发送
            if(obj.type == 'GET'){
                xhr.open('GET',obj.url+'?'+params,true);
                xhr.send(null);
            }
            else if(obj.type == 'POST'){
                xhr.open('POST',obj.url,true);
                //设置请求头，以表单形式提交数据
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr.send(params);
            }

            //辅助函数，格式化参数
            function formatParams(data){
                var arr = [];
                for(var name in data){
                    arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]));
                }
                //设置随机数，防止缓存
                arr.push("t="+Math.random());
                return arr.join("&");
            }
        }
    }
})(window);
