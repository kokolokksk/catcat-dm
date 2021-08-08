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
const { KeepLiveWS } = require('bilibili-live-ws')
let canvas
let ctx
let dList
let fps
var speed = 0.5
var x = 225
var y = 425
var width = 600
var height = 600
let frameCount = 0
let start = new Date()
export default {
  mounted () {
    // loading chat background
    this.initCanvas()
    // loading danmuku
    var danmu = {userid: '1999280', // 用户id
      nickname: 'SayariMio', // 用户昵称
      avatar: '', // 头像地址
      live_level: '21', // 直播等级
      xz_level: '1', // 勋章等级
      danmu: '测试', // 弹幕
      time: '1600000000', // 发送时间
      use_state: 0 // 被使用状态
    }
    db.insert(danmu, function (err, ret) {
      console.info(err)
    })
    this.connectLive()
    console.log(db)
    // 当调整窗口大小时重绘canvas
    window.onresize = () => {
      this.initCanvas()
    }
    window.requestAnimationFrame(this.printDanmu)
  },
  methods: {
    initCanvas () {
      console.log('init canvas')
      canvas = document.getElementById('canvas')
      // console.log(canvas)
      ctx = canvas.getContext('2d')
      let winW = window.innerWidth
      let winH = window.innerHeight
      canvas.width = winW
      canvas.height = winH
      this.drawChatBackground()
      // this.drawWord()
      // this.drawImgx()
    },
    // FIXME
    // bilibli-live-ws buffer.js 中使用了flapMap 这里报不存在函数 修改成 for循环 不知道是否一致
    // packs.forEach(pack => {
    //    if (pack.protocol === 2) {
    //        pack == pack.data
    //    }
    // });
    // return packs;
    // return packs.flatMap(pack => {
    //     if (pack.protocol === 2) {
    //         return pack.data;
    //     }
    //     return pack;
    // });
    connectLive () {
      let roomid = 2808861
      const live = new KeepLiveWS(roomid)
      live.on('open', () => console.log('Connection is established'))
      live.on('live', () => {
        live.on('heartbeat', console.log)
        live.on('msg', (data) => {
          console.info(data)
        })
      // 74185
      })
    },
    drawChatBackground () {
      ctx.lineWidth = 2
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'rgba(252,157,157,0.5)'

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
    printDanmu () {
      if (frameCount % 5 === 0 && frameCount !== 0) {
        let now = new Date()
        let avg = (now - start) / 5
        fps = 1000 / avg
        if (fps > 10 && frameCount % 1444 === 0) {
          console.error(fps)
        }
        start = new Date()
      }
      frameCount++
      // this.drawDanmu()
      // console.log('redraw')
      y -= speed
      if (y < 150) {
        y = 450
      }
      this.getDanmu()
      window.requestAnimationFrame(this.printDanmu)
    },
    drawAll () {
      // draw a danmu canvas and make it move
      ctx.clearRect(0, 0, width, height)
      // draw backgroud
      this.drawChatBackground()
      this.drawFPS()
      this.drawDanmu()
    },
    drawDanmu () {
      // get danmu from nedb
      // this.getDanmu()
      // console.info(dList)
      let i = 0
      for (let key in dList) {
        // console.info(key)
        ctx.moveTo(x, y + i * 25)
        ctx.fillStyle = 'purple'
        ctx.font = '20px "微软雅黑"'
        ctx.textBaseline = 'bottom'
        ctx.textAlign = 'center'
        ctx.fillText(dList[key].danmu, x, y + i * 25)
        i++
      }
    },
    drawFPS () {
      ctx.moveTo(50, 50)
      ctx.fillStyle = 'orange'
      ctx.font = '16px "微软雅黑"'
      ctx.textBaseline = 'bottom'
      ctx.textAlign = 'center'
      ctx.fillText('fps:' + Number(fps).toFixed(2), 50, 50)
    },
    getDanmu () {
      dList = null
      // console.info(dList)
      let _self = this
      db.find({
        use_state: 0 }, function (err, docs) {
        // callback(_self.drawAll())
        dList = docs
        _self.drawAll()
        if (docs === null) {
          console.info(docs)
        }
        if (err !== null) {
          console.error(err)
        }
      })
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
  -webkit-app-region: drag; /** 允许拖动透明窗口中的canvas区域 */
}
 
</style>
