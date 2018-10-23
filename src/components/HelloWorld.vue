<template>
  <div>
    <video :src="captureSrc" id="capture" width="760" height="360" autoplay></video>
    <h3 class="notice">请把脸伸过来，我瞅瞅(*^▽^*)</h3>
    <div class="control">
        <span class="open" @click="invokingCamera()">开启摄像头</span>
        <span class="recognition" @click="screenShot()">人脸识别</span>
        <span class="close">关闭摄像头</span>
    </div>
    <canvas id="canvas" width="531" height="395"></canvas>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      canvas: document.getElementById('canvas'),
      buffer: '',
      captureSrc: '',
    }
  },
  methods: {
    invokingCamera: function(){
      window.navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
      if(navigator.getUserMedia){
        navigator.getUserMedia({
            'video':true,
            'audio':false
        },this.getVideoStream,this.failToGet)
      }else{
          alert('您的浏览器不支持调用摄像头')
      }
    },
    getVideoStream: function(stream){
      this.buffer = stream;
      this.captureSrc = window.URL && window.URL.createObjectURL(this.buffer)||buffer;
    },
    failToGet: function(err){
      console.log('error：', err)
    },
    screenShot: function(){
      // 创建画布绘制上下文
      let ctx = canvas.getContext('2d');
      ctx.drawImage(document.getElementById('capture'), 0,0, 531,395);
      let basePath = canvas.toDataURL(); //把当前canvas转化为base64
      function Post(opt){
        this.init(opt);
        this.format(opt);
      }
      Post.prototype = {
        construct:'Post',
        init:function(opt){
            this.url = opt.url || '';
            this.data = opt.data || {};
            this.method = 'POST';
            this.async = true;
            this.success = opt.success || function(){};
        },
        format:function(){
            var data = this.data;
            var params = [];
            for(var key in data){
                params.push(key+'='+data[key]);
            }
            this.postData = params.join('&');
            this.xhr();
        },
        xhr:function(){
            var that = this;
            var xhr = new XMLHttpRequest();
            xhr.open(this.method,this.url,this.async);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8')
            xhr.send(that.postData);
            xhr.onreadystatechange=function(){
                if(xhr.status==200&&xhr.readyState==4){
                    that.success(xhr.response)
                }
            }.bind(this);
        }
      }
      new Post({
        url: 'http://localhost:3000',
        data:{
            imgUrl:basePath,
            picName:'hxd'
        },
        success:function(res){
            // console.log(res);
        }
      });
    },
  },
}

</script>
