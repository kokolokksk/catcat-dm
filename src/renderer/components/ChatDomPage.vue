<template>
  <div id='root'>
    
    <div class="left-cat-ear"></div>
    <div class="left-cat-ear-large"></div>
    <div id="tool_bar" class="tool-bar">
      <div @click="openSettingN" style="z-index:999999">
        <svg  xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="10" cy="10" r="3" stroke="rgba(255,168,168,1)" stroke-width="4" fill="rgba(255,168,168,1)" />
        </svg>
      </div>
    </div>
    <div class="right-cat-ear"></div>
    <div class="right-cat-ear-large"></div>
    <!-- background -->
    <div id="c-bg">
    </div>
    <!-- danmu -->
    <div class="danmu-container">
      <div class="danmu">
        <div class="fans">呐卷</div><div class="dm-name">loveloliii</div><div class="dm-c">123</div>
      </div>
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
  roomid: 6,
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
          muaConfig.roomid = typeof (docs[0].roomid) === 'undefined' ? muaConfig.roomid : docs[0].roomid
          // fixme load color
          muaConfig.danmuColor = typeof (docs[0].dmc) === 'undefined' ? muaConfig.danmuColor : docs[0].dmc
          muaConfig.danmuAreaColor = typeof (docs[0].bgc) === 'undefined' ? muaConfig.danmuAreaColor : docs[0].bgc
          muaConfig.danmuFont = typeof (docs[0].dmf) === 'undefined' ? muaConfig.danmuFont : docs[0].dmf
          log.info(docs[0].scaleX)
          muaConfig.scale = typeof (docs[0].scaleX) === 'undefined' ? muaConfig.scale : docs[0].scaleX
          muaConfig.tts = typeof (docs[0].tts) === 'undefined' ? muaConfig.tts : docs[0].tts
          log.info('init param has loaded. dmc:' + muaConfig.danmuColor + ';bgc:' + muaConfig.danmuAreaColor + ';dmf:' + muaConfig.danmuFont + ';scale:' + muaConfig.scale + ';tts:' + muaConfig.tts)
        }
        if (err !== null) {
          log.info('maybe no local config')
          console.info(err)
        }
        this.connectLive()
        // window.requestAnimationFrame(this.startDraw)
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
    },
    openSettingN () {
      console.info('come in openSetting windows')
      this.$electron.ipcRenderer.send('createSettingWindow')
    }
  }
}
</script>
<style>
  .fans {
    float: left;
    height: 100%;
    width: 15%;
  }
  .dm-name {
    float: left;
    height: 100%;
    width: auto;
  }
  .dm-c {
    float: left;
    height: 100%;
    width: auto;
  }
  .danmu {
    align-content: center;
    background-color: teal;
    height: 15%;
    width: 100%;
    z-index: 3;

  }
  .danmu-container {
    align-content: center;
    position: fixed;
    height: 50%;
    width: 70%;
    left: 5%;
    top: 30%;
    background-color: #ffc8ea;
    z-index: 2;
  }

  .left-cat-ear-large {
    -webkit-app-region: drag;
    position: fixed;
    width: 0;
    top:0%;
    height: 0;
    border-bottom: 100px solid rgba(255,168,168,1);
    border-right: 100px solid transparent;
    border-left: 100px solid transparent;
    z-index: -2;
  }
  .left-cat-ear {
    position: fixed;
    width: 0;
    top:10%;
    left: 10%;
    height: 0;
    border-bottom: 50px solid #64a8a8;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
    z-index: -1;
  }
/* .setting-point {
  right: 0;
  z-index: 1;
} */
.tool-bar {
  position:fixed;
  top:10px;
  height:0;
  width:100%;
  z-index: 2;
}

  .right-cat-ear {
    position: fixed;
    right: 30%;
    top:10%;
    width: 0;
    height: 0;
    border-bottom: 50px solid #739c9c;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    z-index: 1000;
  }
  .right-cat-ear-large {
    -webkit-app-region: drag;
    position: fixed;
    right: 20%;
    top:0%;
    width: 0;
    height: 0;
    border-bottom: 100px solid rgba(255,168,168,1);
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    z-index: 1;
  }
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
    z-index: 1;
    -webkit-app-region: drag;
    width: 80%;
    height: 70%;
    bottom: 10%;
    position: fixed;
    border-radius:1%;
    background-image:  repeating-radial-gradient(circle at 50% 50%,#99CCCC 20px, #99CCCC 20px, #99CCCC 40px, #99CCCC 40px, #99CCCC 60px, #99CCCC 60px, #99CCCC 80px, #99CCCC 80px, #99CCCC 100px);
   
  }
  ::-webkit-scrollbar {
    display: none;
  }
  /* repeating-radial-gradient(circle at 50% 50%,#99CCCC 20px, #7171B7 20px, #7171B7 40px, #CCCC99 40px, #CCCC99 60px, #4F9C9C 60px, #4F9C9C 80px, #99CCCC 80px, #99cccc 100px);
    */
</style>
