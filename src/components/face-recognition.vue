<template>
  <div class="page">
    <!-- 摄像头区域 -->
    <video :src="captureSrc" ref="capture" class="bg-black" height="395" autoplay></video>
    <h3>请把脸伸过来，我瞅瞅(*^▽^*)</h3>
    <div class="mb20">
      <button @click="invokingCamera()">开启摄像头</button>
      <button @click="screenShot()">人脸识别</button>
      <button @click="closedCamera()">关闭摄像头</button>
    </div>
    <!-- 视频流截图 -->
    <canvas id="canvas" width="531" height="395"></canvas>
  </div>
</template>

<script>
import { Post } from "../../utils";

export default {
  name: "FaceRecognition",
  data() {
    return {
      captureSrc: ""
    };
  },
  methods: {
    // 开启摄像头
    invokingCamera() {
      window.navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            video: true,
            audio: false
          },
          this.getVideoStream,
          this.failToGet
        );
      } else {
        alert("您的浏览器不支持调用摄像头");
      }
    },
    // 关闭摄像头
    closedCamera() {
      this.$refs.capture.srcObject.getTracks()[0].stop();
    },
    getVideoStream(stream) {
      try {
        // chrome 新版本写法
        this.$refs.capture.srcObject = stream;
      } catch (error) {
        // chrome 旧版本写法
        this.captureSrc = window.URL && window.URL.createObjectURL(stream);
      }
    },
    failToGet(err) {
      console.log("error：", err);
    },
    screenShot() {
      // 创建画布绘制上下文
      const ctx = canvas.getContext("2d");
      ctx.drawImage(this.$refs.capture, 0, 0, 531, 395);
      //把当前canvas转化为base64
      const basePath = canvas.toDataURL();
      // 发送到服务端人脸识别校验
      new Post({
        url: "http://localhost:3000",
        data: {
          imgUrl: basePath,
          picName: "hxd"
        },
        success: function(res) {
          // console.log(res);
        }
      });
    }
  }
};
</script>

<style>
.page {
  user-select: none;
}
.bg-black {
  background-color: black;
}
.mb20 {
  margin-bottom: 20px;
}
</style>