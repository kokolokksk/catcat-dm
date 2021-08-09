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
import g from '../utils/globel'
const { KeepLiveWS } = require('bilibili-live-ws')
let canvas
let ctx
// let dList
let fps
var speed = 0.5
var x = 225
var y = 450
var width = 600
var height = 600
let frameCount = 0
let start = new Date()
// define animation state is on
let upState = false
// define visible dm list
let visibleDmList = []
// define invisible dm list
let invisibleDmList = []
// define dm list
// let dmList = []
export default {
  mounted () {
    // loading chat background
    this.initCanvas()
    this.connectLive()
    db.find({}, function (err, docs) {
      if (err !== null) {
        console.info(err)
      }
      console.info(docs)
    })
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
      // let roomid = 2808861
      const live = new KeepLiveWS(g.roomid)
      live.on('open', () => console.log('连接已建立 · · ·'))
      live.on('live', () => {
        live.on('heartbeat', (online) => {
          // console.log(online)
          g.online = online
        })
        live.on('msg', (data) => {
          console.info(data)
          // first only dm msg
          if (data instanceof Array) {
            console.info('is array')
            if (data[0].type === 'message') {
              if (data[0].data.cmd === 'DANMU_MSG') {
                let danmuStore = {userid: '', // user id
                  nickname: '', // user nickname
                  avatar: '', // avatar address
                  live_level: '', // live level
                  xz_level: '', // xz level
                  danmu: '', // dm
                  time: 0, // send time
                  use_state: 0 // use state
                }
                let info = data[0].data.info
                const danmu = info[1]
                const userInfo = info[2]
                // add danmu to nedb
                // let danmuInfo = g.danmu
                danmuStore.danmu = danmu
                danmuStore.userid = userInfo[0]
                danmuStore.nickname = userInfo[1]
                danmuStore.time = (info[9].ts === null || info[9].ts === undefined) ? info[0][4] : info[9].ts
                // do repeat check
                db.insert(danmuStore, function (err, ret) {
                  if (err !== null) {
                    console.info(err)
                  }
                })
              }
            }
          }
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
      // y -= speed
      // if (y < 150) {
      //   y = 450
      // }
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
      // if animation state is on wait is
      // false means last invisibleDmList is empty
      if (!upState) {
        if (invisibleDmList.length !== 0) {
          // start line 225 425
          console.info('animation stop ,invisible list:')
          console.info(invisibleDmList)
          let dm = invisibleDmList.pop()
          visibleDmList.push(dm)
          visibleDmList.sort(function (a, b) {
            return (b.time - a.time)
          })
          upState = true
        } else {
          // draw visibleDmList
          let i = 0
          for (let key in visibleDmList) {
            ctx.moveTo(x, y - i * 25)
            ctx.fillStyle = 'purple'
            ctx.font = '20px "微软雅黑"'
            ctx.textBaseline = 'bottom'
            ctx.textAlign = 'center'
            ctx.fillText(visibleDmList[key].danmu, x, y - i * 25)
            i++
          }
          upState = false
        }
      } else {
        // do animation
        let i = 0
        y -= speed
        if (y <= 425) {
          upState = false
          y = 450
        } else {
          for (let key in visibleDmList) {
            ctx.moveTo(x, y - i * 25)
            ctx.fillStyle = 'purple'
            ctx.font = '20px "微软雅黑"'
            ctx.textBaseline = 'bottom'
            ctx.textAlign = 'center'
            ctx.fillText(visibleDmList[key].danmu, x, y - i * 25)
            i++
          }
        }
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
      // dList = null
      // console.info(dList)
      let _self = this
      if (!upState) {
        db.find({}).sort({ time: -1 }).limit(10).exec(function (err, docs) {
          // callback(_self.drawAll())
          // dList = docs
          let newDmList = []
          // dmList = visibleDmList.concat(invisibleDmList)
          if (!upState) {
            docs.forEach(doc => {
              let exist = false
              visibleDmList.forEach(d => {
                if (d._id === doc._id) {
                  exist = true
                }
              })
              invisibleDmList.forEach(d => {
                if (d._id === doc._id) {
                  exist = true
                }
              })
              if (!exist) {
                newDmList.push(doc)
                if (invisibleDmList.length === 0) {
                  invisibleDmList.push(doc)
                }
              }
            })
            _self.drawAll()
            // if (newDmList.length !== 0) {
            //   _self.drawAll()
            // }
          }
          if (docs === null) {
            console.info(docs)
          }
          if (err !== null) {
            console.error(err)
          }
        })
      } else {
        this.drawAll()
      }
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
