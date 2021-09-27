<template>
  <div id='root'>
    <div class="settingClass"  @click="openSettingN"   >
    </div> 
    <div class="left-cat-ear"></div>
    <div class="left-cat-ear-large"></div>
    <div class="right-cat-ear"></div>
    <div class="right-cat-ear-large"></div>
    <!-- background -->
    <div id="c-bg">
    </div>
    <!-- danmu -->
    <div class="danmu-container" style="font-size:11pt">
      <transition-group name="list" tag="div" mode="out-in">
      <div v-for="(item,index) in invisibleDmList" class="danmu" :key="index">
        <div class="fans" ><div v-if="item.xz_name" 
        :class="{
        xzn_1:item.xz_level>=1 && item.xz_level<=4,
        xzn_2:item.xz_level>=5 && item.xz_level<=8,
        xzn_3:item.xz_level>=9 && item.xz_level<=12,
        xzn_4:item.xz_level>=13 && item.xz_level<=16,
        xzn_5:item.xz_level>=17 && item.xz_level<=20,
        xzn_6:item.xz_level>=21 && item.xz_level<=24,
        xzn_7:item.xz_level>=25 && item.xz_level<=28,
        xzn_8:item.xz_level>=29 && item.xz_level<=32,
        xzn_9:item.xz_level>=33 && item.xz_level<=36,
        xzn_10:item.xz_level>=37 && item.xz_level<=40}">{{item.xz_name}}</div><div v-if="item.xz_level" 
        :class="{
        xzl_1:item.xz_level>=1 && item.xz_level<=4,
        xzl_2:item.xz_level>=5 && item.xz_level<=8,
        xzl_3:item.xz_level>=9 && item.xz_level<=12,
        xzl_4:item.xz_level>=13 && item.xz_level<=16,
        xzl_5:item.xz_level>=17 && item.xz_level<=20,
        xzl_6:item.xz_level>=21 && item.xz_level<=24,
        xzl_7:item.xz_level>=25 && item.xz_level<=28,
        xzl_8:item.xz_level>=29 && item.xz_level<=32,
        xzl_9:item.xz_level>=33 && item.xz_level<=36,
        xzl_10:item.xz_level>=37 && item.xz_level<=40  
        }">&nbsp;{{item.xz_level}}&nbsp;</div></div><div class="dm-name">&nbsp;{{item.nickname}}:</div><div class="dm-c">{{item.danmu}}</div>
      </div>
      </transition-group>
    </div>
    <div class="comein-container"> 
      <transition-group name="list" tag="div" mode="out-in">
      <div v-for="(item,index) in comeInList" class="comein" :key="index">
        <div class="dm-name">{{item.uname}}进入了房间。</div>
      </div>
      </transition-group>
    </div>
    <div class="gift-container"> 
      <transition-group name="list" tag="div" mode="out-in">
      <div v-for="(item,index) in giftList" class="gift" :key="index">
        <div class="dm-name">{{item.uname}}赠送了{{item.giftName}}</div>
      </div>
      </transition-group>
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
let speakStatus = false
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
  tts:false, // tts开关
  alwaysOnTop:true // 置顶

}
export default {
  data () {
    return {
      invisibleDmList,
      visibleDmList,
      comeInList,
      giftList,
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
          muaConfig.alwaysOnTop = typeof (docs[0].alwaysOnTop) === 'undefined' ? true : docs[0].alwaysOnTop
          if (muaConfig.alwaysOnTop) {
            _self.$electron.remote.getCurrentWindow().setAlwaysOnTop(true)
          } else {
            _self.$electron.remote.getCurrentWindow().setAlwaysOnTop(false)
          }
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
                    xz_name: '',
                    danmu: '', // dm
                    time: 0, // send time
                    use_state: 0, // use state
                    type: 1
                  }
                  let info = data[index].data.info
                  const danmu = info[1]
                  const userInfo = info[2]
                  const xzInfo = info[3]
                  // add danmu to nedb
                  // let danmuInfo = g.danmu
                  danmuStore.danmu = danmu
                  danmuStore.userid = userInfo[0]
                  danmuStore.nickname = userInfo[1]
                  danmuStore.time = (info[9].ts === null || info[9].ts === undefined) ? info[0][4] : info[9].ts
                  danmuStore.xz_level = (xzInfo[0] === null || xzInfo[0] === undefined) ? '' : xzInfo[0]
                  danmuStore.xz_name = (xzInfo[1] === null || xzInfo[1] === undefined) ? '' : xzInfo[1]
                  // add to list
                  console.info(danmuStore)
                  invisibleDmList.push(danmuStore)
                  if (invisibleDmList.length >= 10) {
                    invisibleDmList.shift()
                  }
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
                  if (comeInList.length >= 2) {
                    comeInList.shift()
                  }
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
                  if (giftList.length >= 2) {
                    giftList.shift()
                  }
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
    },
    speakDanmu () {
      if (muaConfig.tts) {
      // 判断是否在阅读
        if (speakStatus) {
          // 不阅读 把其加入阅读list
        } else {
          let tempText = speakList.pop()
          if (typeof tempText !== 'undefined') {
            say.speak(tempText.nickname + ':' + tempText.danmu, null, 1.0, (err) => {
              if (err) {
                return console.error(err)
              }
              speakStatus = false
              console.log('Text has been spoken.')
            })
          }
        }
      }
    }
  }
}
</script>
<style>
.settingClass { 
  background-color: #55b344;
  width: 10px;
  height: 10px; 
  position: fixed;
  border-radius: 50%;
  z-index: 2;
}



.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
/* .list-move {
  transition: transform 1s;
} */
 .list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
/* 1-4 */
.xzn_1 {
  margin-left: 5px;
  font-size: 8pt;
  font-family: 'zxfyyt';
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid rgb(83, 134, 128);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(92, 150, 142), rgb(92, 150, 142));
  border-radius: 25% 5% 5% 25%;
  color: rgb(255, 255, 255);
  z-index: 4;
}
/* 5-8 */
.xzn_2 {
  margin-left: 5px;
  font-size: 8pt;
  font-family: 'zxfyyt';
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid rgb(82, 109, 139),;
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(93, 123, 158), rgb(93, 123, 158));
  border-radius: 25% 5% 5% 25%;
  color: rgb(255, 255, 255);
  z-index: 4;
}
/* 9-12 */
.xzn_3 {
  margin-left: 5px;
  font-size: 8pt;
  font-family: 'zxfyyt';
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid rgb(128, 113, 151);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(141, 124, 166), rgb(141, 124, 166));
  border-radius: 25% 5% 5% 25%;
  color: rgb(255, 255, 255);
  z-index: 4;
}
/* 13-16 */
.xzn_4 {
  margin-left: 5px;
  font-size: 8pt;
  font-family: 'zxfyyt';
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid rgb(173, 94, 123);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(190, 102, 134), rgb(190, 102, 134));
  border-radius: 25% 5% 5% 25%;
  color: rgb(255, 255, 255);
  z-index: 4;
}
/* 17-20 */
.xzn_5 {
  margin-left: 5px;
  font-size: 8pt;
  font-family: 'zxfyyt';
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid rgb(180, 143, 33);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(199, 157, 36), rgb(199, 157, 36));
  border-radius: 25% 5% 5% 25%;
  color: rgb(255, 255, 255);
  z-index: 4;
}
/* 21-24 */
.xzn_6 {
  margin-left: 5px;
  font-size: 8pt;
  font-family: 'zxfyyt';
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid rgb(30, 88, 80);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(30, 88, 80), rgb(77, 151, 151));
  border-radius: 25% 5% 5% 25%;
  color: rgb(255, 255, 255);
  z-index: 4;
}
/* 25-28 */
.xzn_7 {
  margin-left: 5px;
  font-size: 8pt;
  font-family: 'zxfyyt';
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid rgb(16, 32, 90);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(16, 32, 90), rgb(96, 128, 228));
  border-radius: 25% 5% 5% 25%;
  color: rgb(255, 255, 255);
  z-index: 4;
}
/* 29-32 */
.xzn_8 {
  margin-left: 5px;
  font-size: 8pt;
  font-family: 'zxfyyt';
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid rgb(56, 26, 107);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(56, 26, 107), rgb(116, 101, 193));
  border-radius: 25% 5% 5% 25%;
  color: rgb(255, 255, 255);
  z-index: 4;
}
/* 33-36 */
.xzn_9 {
  margin-left: 5px;
  font-size: 8pt;
  font-family: 'zxfyyt';
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid rgb(136, 20, 54);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(136, 20, 54), rgb(194, 88, 129));
  border-radius: 25% 5% 5% 25%;
  color: rgb(255, 255, 255);
  z-index: 4;
}
/* 37-0 */
.xzn_10 {
  margin-left: 5px;
  font-size: 8pt;
  font-family: 'zxfyyt';
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid rgb(255, 110, 25);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(255, 110, 25), rgb(255, 170, 85));
  border-radius: 25% 5% 5% 25%;
  color: rgb(255, 255, 255);
  z-index: 4;
}
/* 1234 */
.xzl_1 {
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #fff;
  border-left-color: #d5f5cf;
  background-color: #fff;
  color: rgb(92, 150, 142);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 5678 */
.xzl_2 {
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #ffffff;
  border-left-color: #d5f5cf;
  background-color: #fff;
  color: rgb(93, 123, 158);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/*9-12 */
.xzl_3 {
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #ffffff;
  border-left-color: #d5f5cf;
  background-color: #fff;
  color: rgb(141, 124, 166);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 13-16 */
.xzl_4 {
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #ffffff;
  border-left-color: #d5f5cf;
  background-color: #fff;
  color: rgb(190, 102, 134);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 17-20 */
.xzl_5 {
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #ffffff;
  border-left-color: #d5f5cf;
  background-color: #fff;
  color: rgb(199, 157, 36);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 21-24 */
.xzl_6 {
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #ffffff;
  border-left-color: #d5f5cf;
  background-color: #fff;
  color: rgb(30, 88, 80);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 25-28 */
.xzl_7 {
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #ffffff;
  border-left-color: #d5f5cf;
  background-color: #fff;
  color: rgb(16, 32, 90);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 29-32 */
.xzl_8 {
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #ffffff;
  border-left-color: #d5f5cf;
  background-color: #fff;
  color: rgb(56, 26, 107);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 33-36 */
.xzl_9 {
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #ffffff;
  border-left-color: #d5f5cf;
  background-color: #fff;
  color: rgb(136, 20, 54);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 37-40 */
.xzl_10 {
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #ffffff;
  border-left-color: #d5f5cf;
  background-color: #fff;
  color: rgb(255, 110, 25);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}

  .fans {
    z-index: 4;
    float: left;
    height: 100%;
    width: auto;
    display: inline-flex;
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
    max-width: 100%;
  }
  .danmu {
    display: inline-block;
    margin-bottom: 1px;
    align-items: center;
    /* display: inline-block; */
    align-content: center;
    /* background-color: teal; */
    height: 15%;
    width: 100%;
    z-index: 3;
  }
  .comein {
    font-family: 'Consolas';
    font-size: 10pt;
    color: gray;
    display: flex;
    margin-bottom: 5px;
    align-items: center;
    display: inline-block;
    align-content: center;
    /* background-color: teal; */
    height: 15%;
    width: 100%;
    z-index: 3;
  }
  .gift {
    font-family: 'Consolas';
    font-size: 10pt;
    color: gray;
    display: flex;
    margin-bottom: 5px;
    align-items: center;
    display: inline-block;
    align-content: center;
    /* background-color: teal; */
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
  .comein-container {
    align-content: center;
    position: fixed;
    height: 5%;
    width: 70%;
    left: 5%;
    top: 80%;
    /* background-color: #cc88b2; */
    z-index: 2;
  } 
  .gift-container {
    align-content: center;
    position: fixed;
    height: 5%;
    width: 70%;
    left: 5%;
    top: 85%;
    z-index: 2;
  } 
  .left-cat-ear-large {
    position: fixed;
    width: 0;
    top:0%;
    height: 0;
    pointer-events: none;
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
  
  
  height:0;
  width:auto;
  
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
