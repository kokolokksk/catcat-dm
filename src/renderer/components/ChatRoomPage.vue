<template>
    <div>
    <canvas id ='canvas'>
      ?
    </canvas>
    <img id = 'img' src="~@/assets/logo.png" />
    </div>

       
</template>

<script>
import db from '../datastore'
let canvas
let ctx
export default {
  mounted () {
    // loading chat background
    this.initCanvas()
    // loading danmuku
    var danmu = {   userid: '1999280'  // 用户id
                  , nickname: 'SayariMio' // 用户昵称
                  , avatar: ''  // 头像地址
                  , live_level: '21'  // 直播等级
                  , xz_level: '1' // 勋章等级
                  , danmu: '测试' // 弹幕
                  , time: '1600000000' // 发送时间
    }
    db.insert(danmu, function (err, ret) {
      console.info(err)
    })
    console.log(db)
    
    // 当调整窗口大小时重绘canvas
    window.onresize = () => {
      this.initCanvas()
    }
  },
  methods: {
    initCanvas () {
      console.log('init canvas')
      canvas = document.getElementById('canvas')
      console.log(canvas)
      ctx = canvas.getContext('2d')
      let winW = window.innerWidth
      let winH = window.innerHeight
      canvas.width = winW
      canvas.height = winH
      this.drawChatBackground()
      // this.drawWord()
      // this.drawImgx()
    },
    drawChatBackground () {
      ctx.lineWidth = 2
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'rgba(252,157,157,0.3)'

      ctx.beginPath()
      ctx.moveTo(158, 202)
      ctx.bezierCurveTo(150, 100, 350, 100, 321, 249)
      ctx.moveTo(321, 249)
      ctx.bezierCurveTo(499, 217, 459, 485, 294, 390)
      ctx.moveTo(294, 390)
      ctx.bezierCurveTo(479, 496, 95, 488, 128, 361)
      ctx.moveTo(128, 361)
      ctx.bezierCurveTo(108, 498, -2, 448, 69, 184)
      ctx.moveTo(69, 184)
      ctx.bezierCurveTo(29, 71, 170, 33, 158, 202)
      // ctx.fill()
      ctx.closePath()
      ctx.moveTo(158, 202)
      ctx.lineTo(321, 249)
      ctx.lineTo(294, 390)
      ctx.lineTo(128, 361)
      ctx.lineTo(69, 184)
      ctx.lineTo(158, 202)
      ctx.closePath()
      ctx.fill()
      // ctx.stroke()
      // // 花瓣右上
      // ctx.beginPath()
      // ctx.arc(550, 200, 50, 0, 2 * Math.PI)
      // ctx.stroke()
      // ctx.fill()

      // // 花瓣右下
      // ctx.beginPath()
      // ctx.arc(550, 300, 50, 0, 2 * Math.PI)
      // ctx.stroke()
      // ctx.fill()

      // // 花瓣左上
      // ctx.beginPath()
      // ctx.arc(450, 200, 50, 0, 2 * Math.PI, true)
      // ctx.stroke()
      // ctx.fill()

      // // 花瓣左下
      // ctx.beginPath()
      // ctx.arc(450, 300, 50, 0, 2 * Math.PI)
      // ctx.stroke()
      // ctx.fill()
    },
    drawWord () {
      // 绘制字体
      ctx.font = '20px "微软雅黑"'
      ctx.fillStyle = 'red'
      ctx.textBaseline = 'top'
      ctx.fillText('Top-g', 100, 300)
      ctx.textBaseline = 'middle'
      ctx.fillText('middle-g', 200, 300)
      ctx.textBaseline = 'bottom'
      ctx.fillText('bottom-g', 490, 300)
      ctx.textBaseline = 'Alphabetic'
      ctx.fillText('Alphabetic-g', 700, 300)
    },
    drawImgx () {
      const img = document.getElementById('img')
      ctx.drawImage(img, 10, 10)
    }
  }
}
</script>
<style>
::-webkit-scrollbar {
  display: none;
}
 
#canvas {
  width: 100vw;
  height: 100vh;
}
 
</style>
