<template>  
  <div>
    <canvas ref="canvas" id="canvas">
    </canvas>
    <div id="tool_bar" class="tool-bar">
    </div>
  </div>
</template>
<script>
const { KeepLiveWS } = require('bilibili-live-ws')
let canvas, ctx
let animationState = false
let visibleDmList = []
let invisibleDmList = []
let width = 500
let height = 500
let y = 300
let speed = 0.5
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$electron.remote.getCurrentWindow().setAlwaysOnTop(true)
    this.initCanvas()
    this.connectLive()
    // 当调整窗口大小时重绘canvas
    window.onresize = () => {
      this.initCanvas()
    }
    window.requestAnimationFrame(this.startDraw)
  },
  methods: {
    initCanvas () {
      console.log('init canvas')
      canvas = this.$refs.canvas
      let winW = window.innerWidth
      let winH = window.innerHeight
      canvas.width = winW
      canvas.height = winH
      ctx = canvas.getContext('2d')
    },
    startDraw () {
      this.drawChatPage()
      window.requestAnimationFrame(this.startDraw)
    },
    drawChatPage () {
      let _self = this
      _self.drawAll()
      // if (!animationState) {
      //   _self.$db.find({type: 1, use_state: 0}).sort({ time: -1 }).limit(10).exec(function (err, docs) {
      //     let count = 0
      //     if (docs.length !== 0) {
      //       invisibleDmList.push(docs[0])
      //       // do update
      //       _self.$db.update({ _id: docs[0]._id }, { $set: { use_state: 1 } }, {}, function () {
      //         count++
      //       })
      //     }
      //     _self.drawAll()
      //     if (err !== null) {
      //       console.error(err)
      //     }
      //   })
      // } else {
      //   _self.drawAll()
      // }
    },
    drawAll () {
      ctx.clearRect(0, 0, width, height)
      this.drawBackground()
      this.drawDanmu()
    },
    drawBackground () {
      ctx.fillStyle = 'rgba(255,255,255,1)'
      ctx.beginPath()
      ctx.rect(0, 100, 400, 300)
      ctx.fill()
      ctx.lineWidth = '10'
      ctx.strokeStyle = 'rgba(255,100,100,1)'
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, 100)
      ctx.lineTo(100, 0)
      ctx.lineTo(200, 100)
      ctx.lineTo(180, 100)
      ctx.lineTo(100, 20)
      ctx.lineTo(20, 100)
      ctx.moveTo(0, 100)
      ctx.fillStyle = 'rgba(255,100,100,1)'
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(200, 100)
      ctx.lineTo(300, 0)
      ctx.lineTo(400, 100)
      ctx.lineTo(380, 100)
      ctx.lineTo(300, 20)
      ctx.lineTo(220, 100)
      ctx.moveTo(200, 100)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(20, 100)
      ctx.lineTo(100, 20)
      ctx.lineTo(180, 100)
      ctx.lineTo(20, 100)
      ctx.fillStyle = 'rgba(80,80,80,1)'
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(220, 100)
      ctx.lineTo(300, 20)
      ctx.lineTo(380, 100)
      ctx.lineTo(220, 100)
      ctx.fill()
    },
    drawDanmu () {
      // if animation state is on wait is
      // false means last invisibleDmList is empty
      if (!animationState) {
        if (invisibleDmList.length !== 0) {
          // start line 10,0 10,500
          console.info('animation stop ,invisible list:')
          console.info(invisibleDmList)
          let tempList = []
          visibleDmList.sort((a, b) => {
            return a.time - b.time
          })
          if (visibleDmList.length > 5) {
            tempList.push(visibleDmList[visibleDmList.length - 6])
            tempList.push(visibleDmList[visibleDmList.length - 5])
            tempList.push(visibleDmList[visibleDmList.length - 4])
            tempList.push(visibleDmList[visibleDmList.length - 3])
            tempList.push(visibleDmList[visibleDmList.length - 2])
            tempList.push(visibleDmList[visibleDmList.length - 1])
            visibleDmList = tempList
          }
          let dm = invisibleDmList.pop()
          visibleDmList.push(dm)
          visibleDmList.sort(function (a, b) {
            return (b.time - a.time)
          })
          animationState = true
        } else {
          // draw visibleDmList
          let i = 0
          // filter
          visibleDmList.filter((item, index, self) => {
            return self.time === item.time
          })
          for (let key in visibleDmList) {
            ctx.moveTo(20, y - i * 25)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.font = '15px "Consolas"'
            ctx.textBaseline = 'bottom'
            ctx.textAlign = 'left'
            if (i < 5) {
              ctx.fillText(visibleDmList[key].nickname + ':' + visibleDmList[key].danmu, 20, y - i * 25 - 25)
            }
            i++
          }
          animationState = false
        }
      } else {
        // do animation
        let i = 0
        speed = invisibleDmList.length * 0.5 + 0.5
        console.info(speed)
        y -= speed
        if (y <= 275) {
          animationState = false
          y = 300
        } else {
          visibleDmList.filter((item, index, self) => {
            return self.time === item.time
          })
          for (let key in visibleDmList) {
            ctx.moveTo(20, y - i * 25)
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.font = '15px "Consolas"'
            ctx.textBaseline = 'bottom'
            ctx.textAlign = 'left'
            if (i < 5) {
              ctx.fillText(visibleDmList[i].nickname + ':' + visibleDmList[i].danmu, 20, y - i * 25)
            }
            i++
            console.info(key)
          }
        }
      }
    },
    connectLive () {
      // get init configure
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        let roomid = this.$g.roomid
        if (err !== null) {
          console.info(err)
        }
        console.info(docs)
        // let roomid = 2808861
        const live = new KeepLiveWS(roomid)
        live.on('open', () => console.log('连接已建立 · · ·'))
        live.on('live', () => {
          live.on('heartbeat', (online) => {
            // console.log(online)
            this.$g.online = online
          })
          live.on('msg', (data) => {
            console.info(data)
            // first only dm msg
            if (data instanceof Array) {
              console.info('is array')
              for (let index in data) {
                if (data[index].type === 'message') {
                  if (data[index].data.cmd === 'DANMU_MSG') {
                    let danmuStore = {userid: '', // user id
                      nickname: '', // user nickname
                      avatar: '', // avatar address
                      live_level: '', // live level
                      xz_level: '', // xz level
                      danmu: '', // dm
                      time: 0, // send time
                      use_state: 0, // use state
                      type: 1
                    }
                    let info = data[index].data.info
                    const danmu = info[1]
                    const userInfo = info[2]
                    // add danmu to nedb
                    // let danmuInfo = g.danmu
                    danmuStore.danmu = danmu
                    danmuStore.userid = userInfo[0]
                    danmuStore.nickname = userInfo[1]
                    danmuStore.time = (info[9].ts === null || info[9].ts === undefined) ? info[0][4] : info[9].ts
                    // add to list
                    invisibleDmList.push(danmuStore)
                    // do repeat check
                    this.$db.find({time: danmuStore.time}, (err, docs) => {
                      if (docs.length === 0) {
                        this.$db.insert(danmuStore, (err, ret) => {
                          if (err !== null) {
                            console.info(err)
                          }
                        })
                      }
                      if (err !== null) {
                        console.info(err)
                      }
                    })
                  } else if (data[0].data.cmd === 'INTERACT_WORD') {
                    let comeInStore = {
                      userid: '',
                      uname: '',
                      uname_color: '',
                      time: '',
                      use_state: 0,
                      type: 3
                    }
                    comeInStore.userid = data[0].data.data.userid
                    comeInStore.uname = data[0].data.data.uname
                    comeInStore.uname_color = data[0].data.data.uname_color
                    comeInStore.time = data[0].data.data.timestamp
                    this.$db.insert(comeInStore, (err, ret) => {
                      if (err !== null) {
                        console.info(err)
                      }
                    })
                  } else {
                    console.info('other')
                  }
                }
              }
            }
          })
        // 74185
        })
      })
    }
  }
}
</script>

<style>
#canvas {
  width: 100vw;
  height: 100vh;
  -webkit-app-region: drag; /** 允许拖动透明窗口中的canvas区域 */
}
.tool-bar {
  position: fixed;
  right: -10px;
  top: 0;
}
::-webkit-scrollbar {
  display: none;
}
</style>
