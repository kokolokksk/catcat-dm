<template>  
  <div>
    <div id="tool_bar" class="tool-bar">
      <div @click="openSetting">
        <svg  xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="10" cy="10" r="3" stroke="red" stroke-width="2" fill="red" />
        </svg>
      </div>
    </div>
    <canvas ref="canvas" id="canvas">
    </canvas>
    
  </div>
</template>
<script>
const { KeepLiveWS } = require('bilibili-live-ws')
const { remote } = require('electron')
let canvas, ctx
let animationState = false
let visibleDmList = []
let invisibleDmList = []
let comeInList = []
let giftList = []
let width = 500
let height = 500
let y = 300
let speed = 0.5
let comeInColor = 'rgba(125,127,125,1)'
let danmuColor = 'rgba(0,0,0,1)'
let scaleX = 1.0
let danmuAreaColor = 'rgb(250,250,250)'
let danmuFont = '"zxfyyt"'
let danmuSize = '18px '
let onlneCount = '人气'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$electron.remote.getCurrentWindow().setAlwaysOnTop(true)
    this.loadConfig()
  },
  methods: {
    loadConfig () {
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        if (docs !== null && docs.length !== 0) {
          console.info(docs)
          _self.roomid = docs[0].roomid
          // fixme load color
          danmuColor = docs[0].dmc === null ? 'rgba(255,255,255,1)' : docs[0].dmc
          danmuAreaColor = docs[0].bgc === null ? 'rgba(255,255,255,1)' : docs[0].bgc
          scaleX = docs[0].scaleX === null ? scaleX : docs[0].scaleX
        }
        if (err !== null) {
          console.info(err)
        }
        this.initCanvas()
        this.connectLive()
        // 当调整窗口大小时重绘canvas
        window.onresize = () => {
          this.initCanvas()
        }
        window.requestAnimationFrame(this.startDraw)
      })
    },
    initCanvas () {
      console.log('init canvas')
      canvas = this.$refs.canvas
      remote.getCurrentWindow().setSize(width * scaleX, height * scaleX)
      let winW = width * scaleX // window.innerWidth
      let winH = height * scaleX // window.innerHeight
      canvas.width = winW
      canvas.height = winH
      ctx = canvas.getContext('2d')
      ctx.scale(scaleX, scaleX)
      console.info('scale:' + scaleX + ';width:' + canvas.width + ';height:' + canvas.height)
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
      this.drawComeInList()
      this.drawGiftList()
    },
    drawBackground () {
      ctx.fillStyle = danmuAreaColor
      ctx.beginPath()
      ctx.rect(0, 100, 400, 300)
      ctx.fill()
      ctx.lineWidth = '2'
      ctx.strokeStyle = 'rgba(255,250,250,1)'
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
      // draw online count (人气)
      ctx.moveTo(20, 100)
      ctx.fillStyle = 'rgba(173,187,255,1)'
      ctx.font = danmuSize + ' ' + danmuFont
      ctx.textBaseline = 'bottom'
      ctx.textAlign = 'left'
      ctx.fillText(onlneCount + ':' + this.$g.online, 20, 100)
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
            ctx.fillStyle = danmuColor
            ctx.font = danmuSize + ' ' + danmuFont
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
        // console.info(speed)
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
            ctx.fillStyle = danmuColor
            ctx.font = danmuSize + ' ' + danmuFont
            ctx.textBaseline = 'bottom'
            ctx.textAlign = 'left'
            if (i < 5) {
              ctx.fillText(visibleDmList[i].nickname + ':' + visibleDmList[i].danmu, 20, y - i * 25)
            }
            i++
            // console.info(key)
          }
        }
      }
    },
    drawComeInList () {
      if (comeInList.length !== 0) {
        ctx.moveTo(20, 450)
        ctx.fillStyle = comeInColor
        ctx.font = '15px ' + '"zxfyyt"'
        ctx.textBaseline = 'bottom'
        ctx.textAlign = 'left'
        comeInList.sort(function (a, b) {
          return (b.time - a.time)
        })
        let c = comeInList.pop()
        ctx.fillText(c.uname + '进入了直播间', 20, 400)
        if (comeInList.length === 0) {
          comeInList.push(c)
        }
      }
    },
    drawGiftList () {
      if (giftList.length !== 0) {
        ctx.moveTo(250, 450)
        ctx.fillStyle = comeInColor
        ctx.font = '15px ' + '"zxfyyt"'
        ctx.textBaseline = 'bottom'
        ctx.textAlign = 'left'
        giftList.sort(function (a, b) {
          return (b.time - a.time)
        })
        let c = giftList.pop()
        ctx.fillText(c.uname + '赠送了' + c.giftName, 220, 400)
        if (giftList.length === 0) {
          giftList.push(c)
        }
      }
    },
    connectLive () {
      // get init configure
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        let roomid = this.$g.roomid
        if (docs !== null && docs.length !== 0) {
          roomid = docs[0].roomid
        }
        if (err !== null) {
          console.info(err)
        }
        console.info(docs)
        // let roomid = 2808861
        const live = new KeepLiveWS(Number(roomid))
        live.on('open', () => {
          console.log('连接已建立 · · ·')
          let sysInfo = {userid: '', // user id
            nickname: '系统信息', // user nickname
            avatar: '', // avatar address
            live_level: '', // live level
            xz_level: '', // xz level
            danmu: '连接已建立 · · ·', // dm
            time: 0, // send time
            use_state: 0, // use state
            type: 1
          }
          invisibleDmList.push(sysInfo)
        })
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
                  } else if (data[index].data.cmd === 'INTERACT_WORD') {
                    let comeInStore = {
                      userid: '',
                      uname: '',
                      uname_color: '',
                      time: '',
                      use_state: 0,
                      type: 3
                    }
                    // console.info(data[index].data.data)
                    comeInStore.userid = data[index].data.data.uid
                    comeInStore.uname = data[index].data.data.uname
                    comeInStore.uname_color = data[index].data.data.uname_color
                    comeInStore.time = data[index].data.data.timestamp
                    comeInList.push(comeInStore)
                    // this.$db.insert(comeInStore, (err, ret) => {
                    //   if (err !== null) {
                    //     console.info(err)
                    //   }
                    // })
                  } else if (data[index].data.cmd === 'SEND_GIFT') {
                    let giftStore = {
                      giftName:'',
                      userid: '',
                      uname: '',
                      num:0,
                      uname_color: '',
                      time: '',
                      use_state: 0,
                      type: 4
                    }
                    giftStore.giftName = data[index].data.data.giftName
                    giftStore.userid = data[index].data.data.userid
                    giftStore.uname = data[index].data.data.uname
                    giftStore.uname_color = data[index].data.data.uname_color
                    giftStore.time = data[index].data.data.timestamp
                    giftList.push(giftStore)
                    console.info('in gift')
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
    },
    openSetting () {
      console.info('come in openSetting windows')
      this.$electron.ipcRenderer.send('createSettingWindow')
    }
  }
}
</script>

<style>
body,html{
  padding: 0;
  margin: 0;
  background-color: transparent
}
#canvas {
  position: fixed;
  /* width: 100vw;
  height: 100vh; */
  -webkit-app-region: drag; /** 允许拖动透明窗口中的canvas区域 */
  top: 50px
}
.tool-bar {
  position:fixed;
  top:0px;
  height:50px;
  /* width:500px */
}
::-webkit-scrollbar {
  display: none;
}
</style>
