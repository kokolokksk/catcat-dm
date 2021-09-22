<template>
  <div id='root'>
    <div class="left-cat-ear"></div>
    <div class="right-cat-ear"></div>
    <div id="c-bg">
    </div>
    <div class="dm" :class="class1&&'animate__animated animate__bounce'">
      123
    </div>
  </div>
</template>
<script>
const { KeepLiveWS } = require('bilibili-live-ws')
const { remote } = require('electron')
const log = require('electron-log')
let visibleDmList = []
let invisibleDmList = []
let comeInList = []
let giftList = []
let speakList = []
const Say = require('say').Say
const say = new Say('win32')
let muaConfig = {
  roomid: '0',
  windowWidth: 500, // 窗口宽度
  windowHeight: 500, // 窗口高度
  y: 300, // dm初始高度
  speed: 0.5, // 滚动速度
  comeInColor: 'rgba(125,127,125,1)', // 进入颜色
  danmuColor: 'rgba(0,0,0,1)', // dm颜色
  scale: 1.0, // 缩放倍率
  danmuAreaColor: 'rgb(250,250,250)', // 背景色
  danmuFont: 'zxfyyt', // dm字体家族
  danmuSize: '18px ', // dm字体大小
  onlneCount: '人气',
  speakStatus:false, // 发言状态
  tts:false // tts开关

}
export default {
  data () {
    return {
      class1:false
    }
  },
  mounted () {
    this.class1 = 1
    // make on top
    // this.$electron.remote.getCurrentWindow().setAlwaysOnTop(true)
    this.loadConfig()
  },
  methods: {
    loadConfig () {
      log.info('try load config')
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        if (docs !== null && docs.length !== 0) {
          console.info(docs)
          log.info('have local config')
          log.info(docs)
          _self.muaConfig.roomid = typeof (docs[0].roomid) === 'undefined' ? _self.muaConfig.roomid : docs[0].roomid
          // fixme load color
          _self.muaConfig.danmuColor = typeof (docs[0].dmc) === 'undefined' ? _self.muaConfig.danmuColor : docs[0].dmc
          _self.muaConfig.danmuAreaColor = typeof (docs[0].bgc) === 'undefined' ? _self.muaConfig.danmuAreaColor : docs[0].bgc
          _self.muaConfig.danmuFont = typeof (docs[0].dmf) === 'undefined' ? _self.muaConfig.danmuFont : docs[0].dmf
          log.info(docs[0].scaleX)
          _self.muaConfig.scale = typeof (docs[0].scaleX) === 'undefined' ? _self.muaConfig.scale : docs[0].scaleX
          _self.muaConfig.tts = typeof (docs[0].tts) === 'undefined' ? _self.muaConfig.tts : docs[0].tts
          log.info('init param has loaded. dmc:' + _self.muaConfig.danmuColor + ';bgc:' + _self.muaConfig.danmuAreaColor + ';dmf:' + _self.muaConfig.danmuFont + ';scale:' + _self.muaConfig.scale + ';tts:' + _self.muaConfig.tts)
        }
        if (err !== null) {
          log.info('maybe no local config')
          console.info(err)
        }
        this.connectLive()
        window.requestAnimationFrame(this.startDraw)
      })
    },
    connectLive () {
      // get init configure
      let _self = this
      // let roomid = 2808861
      const live = new KeepLiveWS(Number(muaConfig.roomid))
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
          muaConfig.onlneCount = online
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
                  speakList.push(danmuStore)
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
    }
  }
}
</script>
<style>
  /* .left-cat-ear {
    position: fixed;
    width: 0;
    height: 0;
    border: 50px solid #85b3b3;
    border-right: 50px solid transparent;
    border-bottom: 50px solid transparent;
  }
  .right-cat-ear {
    position: fixed;
    right: 0;
    width: 0;
    height: 0;
    border: 50px solid #85b3b3;
    border-left: 50px solid transparent;
    border-bottom: 50px solid transparent;
  } */
  .dm{
    width: 10%;
    position: fixed;
    top: 45%;
    left: 40%;
    background-color: #85b3b3; display: inline-block; margin: 0 0.5rem;
    animation: bounce; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s; /* don't forget to set a duration! */
  }
  #root{
    width: 500px;
    height: 500px;
    background-color: #85b3b300;
  }
  body {
    background-color: transparent;
  }
  #c-bg{
    -webkit-app-region: drag;
    width: 100%;
    height: 100%;
    position: fixed;
    border-radius:50%;
    background-image:  repeating-radial-gradient(circle at 50% 50%,#99CCCC 20px, #99CCCC 20px, #99CCCC 40px, #99CCCC 40px, #99CCCC 60px, #99CCCC 60px, #99CCCC 80px, #99CCCC 80px, #99CCCC 100px);
   
  }
  ::-webkit-scrollbar {
    display: none;
  }
  /* repeating-radial-gradient(circle at 50% 50%,#99CCCC 20px, #7171B7 20px, #7171B7 40px, #CCCC99 40px, #CCCC99 60px, #4F9C9C 60px, #4F9C9C 80px, #99CCCC 80px, #99cccc 100px);
    */
</style>
