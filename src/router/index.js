import Vue from 'vue'
import Router from 'vue-router'
import FaceRecognition from '@/components/face-recognition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FaceRecognition',
      component: FaceRecognition
    }
  ]
})
