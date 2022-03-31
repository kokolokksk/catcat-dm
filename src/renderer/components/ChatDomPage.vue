<template>
  <div id='root'>
    <!-- dm top bg : use animition -->
    <div class = "dm-bg-top">
      <div class="waveWrapper waveAnimation">
        <div class="waveWrapperInner bgTop" v-bind:style="{backgroundImage: 'linear-gradient(to top, ' + muaConfig.borderAreaTopColor+', '+muaConfig.borderAreaBotColor + ')'}">
          <div class="wave waveTop" style="background-image: url('static/wave-top.png')"></div>
        </div>
        <div class="waveWrapperInner bgMiddle" v-bind:style="{backgroundImage: 'linear-gradient(to top, ' + muaConfig.borderAreaTopColor+', '+muaConfig.borderAreaBotColor + ')'}" >
          <div class="wave waveMiddle" style="background-image: url('static/wave-mid.png')"></div>
        </div>
        <div class="waveWrapperInner bgBottom"  v-bind:style="{backgroundImage: 'linear-gradient(to top, ' + muaConfig.borderAreaTopColor+', '+muaConfig.borderAreaBotColor + ')'}">
          <div class="wave waveBottom" :style="{display:waveDisplay === true ? 'bloack' : 'none'}"  style="background-image: url('static/wave-bot.png')"></div>
        </div>
      </div>
    </div>
    <!-- <div class="settingClass"  @click="openSettingN"   >
    </div>  -->
    <div class="online">
    <span>人气：{{muaConfig.onlineCount}}</span>
    </div>
    <div class="comeinLastMinute">
    <span>进入/分钟：{{muaConfig.comeinLastMinute}}</span>
    </div>
    <!-- <div class="left-cat-ear"></div>
    <div class="left-cat-ear-large"></div>
    <div class="right-cat-ear"></div>
    <div class="right-cat-ear-large"></div> -->
    <!-- background -->
    <!-- base backgroup bg-->
    <div id="c-bg">
    
    <!-- danmu -->
    <div class="danmu-container"  v-bind:style="{ fontSize:'11pt', backgroundImage: 'linear-gradient(0deg, rgba(241, 147, 156,0.1), '+ muaConfig.danmuAreaColor+ ')'}">
      <transition-group appear name="list" tag="div" mode="out-in">
      <div v-for="(item) in dispalyDmList" class="danmu" :style="{ color : muaConfig.danmuColor}" :key="item.uuid">
        <div class="fans" >
          <div v-if="item.xz_name" 
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
        xzn_10:item.xz_level>=37 && item.xz_level<=40}">{{item.xz_name}}</div>
        <div v-if="item.xz_level" 
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
        }">&nbsp;{{item.xz_level}}&nbsp;</div>
        </div>
        <div class="dm-name">&nbsp;{{item.nickname}}:</div>
        <div class="dm-c" :class="{
        xzl_dm_1:item.xz_level>=1 && item.xz_level<=4 && item.xz_name === '呐卷',
        xzl_dm_2:item.xz_level>=5 && item.xz_level<=8 && item.xz_name === '呐卷',
        xzl_dm_3:item.xz_level>=9 && item.xz_level<=12 && item.xz_name === '呐卷',
        xzl_dm_4:item.xz_level>=13 && item.xz_level<=16 && item.xz_name === '呐卷',
        xzl_dm_5:item.xz_level>=17 && item.xz_level<=20 && item.xz_name === '呐卷',
        xzl_dm_6:item.xz_level>=21 && item.xz_level<=24 && item.xz_name === '呐卷',
        xzl_dm_7:item.xz_level>=25 && item.xz_level<=28 && item.xz_name === '呐卷',
        xzl_dm_8:item.xz_level>=29 && item.xz_level<=32 && item.xz_name === '呐卷',
        xzl_dm_9:item.xz_level>=33 && item.xz_level<=36 && item.xz_name === '呐卷',
        xzl_dm_10:item.xz_level>=37 && item.xz_level<=40 && item.xz_name === '呐卷' 
        }">{{item.danmu}}</div>
      </div>
      </transition-group>
    </div>
    <div class="comein-container"> 
      <transition-group name="listc" tag="div" mode="out-in">
      <div v-for="(item) in comeInList" class="comein" :key="item.uuid">
        <div class="dm-name">{{item.uname}}进入了房间。</div>
      </div>
      </transition-group>
    </div>
    </div>
    <div class="gift-container"> 
      <transition-group name="listg" tag="div" mode="out-in">
      <div v-for="(item) in giftList" class="gift" :key="item.uuid">
        <div class="dm-name">{{item.uname}}赠送了{{item.giftName}}</div>
      </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import Datastore from 'nedb'
import path from 'path'
import {AudioConfig, SpeechSynthesizer} from 'microsoft-cognitiveservices-speech-sdk'
const { LiveWS } = require('bilibili-live-ws-fixed')
const { remote } = require('electron')
const sdk = require('microsoft-cognitiveservices-speech-sdk')
const db = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db')
})
let speechConfig = null
require('electron').ipcRenderer.on('did-close-fresh', (event, message) => {
  live.close()
  location.reload()
})
const log = require('electron-log')
let live
let waveDisplay = true
let waitUpdateDmList = []
let dispalyDmList = []
let comeInList = []
let giftList = []
let speakList = []
let speakDMList = []
let speakStatus = false
let muaConfig = {
  roomid: 6,
  windowWidth: 500, // 窗口宽度
  windowHeight: 650, // 窗口高度
  y: 300, // dm初始高度
  speed: 0.5, // 滚动速度
  comeInColor: 'rgba(125,127,125,1)', // 进入颜色
  danmuColor: 'rgba(255,255,255,1)', // dm颜色
  scale: 1.0, // 缩放倍率
  danmuAreaColor: 'rgba(192,160,255,1)', // 背景色
  borderAreaTopColor:'#f0b7cf 20%',
  borderAreaBotColor:'#8f3979 80%',
  danmuFont: 'zxfyyt', // dm字体家族
  danmuSize: '18px ', // dm字体大小
  onlineCount: '人气',
  comeinLastMinute: 0,
  speakStatus:false, // 发言状态
  tts:false, // tts开关
  alwaysOnTop:true, // 置顶
  v1: '',
  v2: '',
  voice: 'zh-CN-XiaoxiaoNeural',
  clientId: '',
  catdb: false,
  sessionId: ''

}
export default {
  data () {
    return {
      dispalyDmList,
      waitUpdateDmList,
      comeInList,
      giftList,
      waveDisplay,
      muaConfig,
      live,
      class1:false
    }
  },
  mounted () {
    this.class1 = 1
    // make on top
    // this.$electron.remote.getCurrentWindow().setAlwaysOnTop(true)
    // audioConfig.setProperty('MediaDurationPlaceholderSeconds', '0')
    this.loadConfig()
    setTimeout(() => {
      if (muaConfig.onlineCount === '人气') {
        location.reload()
      }
    }, 10000)
  },
  methods: {
    loadConfig () {
      muaConfig.sessionId = this.getNewSessionId()
      setInterval(() => {
        this.count()
      }, 1000)
      log.info('try load config')
      let _self = this
      db.find({ type: 2 }, (err, docs) => {
        if (docs !== null && docs.length !== 0) {
          console.info(docs)
          log.info('have local config')
          log.info(docs)
          muaConfig.roomid = typeof (docs[0].roomid) === 'undefined' ? muaConfig.roomid : docs[0].roomid
          // fixme load color
          muaConfig.danmuColor = typeof (docs[0].dmc) === 'undefined' ? muaConfig.danmuColor : docs[0].dmc
          muaConfig.borderAreaTopColor = typeof (docs[0].btc) === 'undefined' ? muaConfig.borderAreaTopColor : docs[0].btc
          muaConfig.borderAreaBotColor = typeof (docs[0].bbc) === 'undefined' ? muaConfig.borderAreaBotColor : docs[0].bbc
          _self.waveDisplay = typeof (docs[0].waveD) === 'undefined' ? _self.waveDisplay : docs[0].waveD
          muaConfig.danmuAreaColor = typeof (docs[0].bgc) === 'undefined' ? muaConfig.danmuAreaColor : docs[0].bgc
          muaConfig.danmuFont = typeof (docs[0].dmf) === 'undefined' ? muaConfig.danmuFont : docs[0].dmf
          muaConfig.scale = typeof (docs[0].scaleX) === 'undefined' ? muaConfig.scale : docs[0].scaleX
          muaConfig.tts = typeof (docs[0].tts) === 'undefined' ? muaConfig.tts : docs[0].tts
          muaConfig.v1 = (typeof (docs[0].v1) === 'undefined' || docs[0].v1 === '') ? muaConfig.v1 : docs[0].v1
          muaConfig.v2 = (typeof (docs[0].v2) === 'undefined' || docs[0].v2 === '') ? muaConfig.v2 : docs[0].v2
          muaConfig.voice = (typeof (docs[0].voice) === 'undefined' || docs[0].voice === '') ? muaConfig.voice : docs[0].voice
          muaConfig.clientId = (typeof (docs[0].clientId) === 'undefined' || docs[0].clientId === '') ? muaConfig.clientId : docs[0].clientId
          if (muaConfig.clientId == null || muaConfig.clientId === '' || !muaConfig.clientId) {
            _self.$http({
              url: 'https://db.loli.monster/cat/client/generateClientId'
            }).then(function (response) {
              // handle success
              console.log(response)
              muaConfig.clientId = response.data
              _self.setClientId(muaConfig.clientId)
            }).catch(function (error) {
              // handle error
              console.log(error)
            })
          }
          muaConfig.catdb = docs[0].catdb
          if (!muaConfig.v1 || !muaConfig.v2 || muaConfig.v1 === '' || muaConfig.v2 === '') {
            muaConfig.tts = false
          } else {
            speechConfig = sdk.SpeechConfig.fromSubscription(muaConfig.v1, muaConfig.v2)
            speechConfig.speechSynthesisLanguage = 'zh-cn'
            speechConfig.speechSynthesisVoiceName = muaConfig.voice
          }
          muaConfig.alwaysOnTop = typeof (docs[0].alwaysOnTop) === 'undefined' ? true : docs[0].alwaysOnTop
          if (muaConfig.alwaysOnTop === true) {
            _self.$electron.remote.getCurrentWindow().setAlwaysOnTop(true)
          } else {
            _self.$electron.remote.getCurrentWindow().setAlwaysOnTop(false)
          }
          log.info(muaConfig)
          log.info('init param has loaded. dmc:' + muaConfig.danmuColor + ';bgc:' + muaConfig.danmuAreaColor + ';dmf:' + muaConfig.danmuFont + ';scale:' + muaConfig.scale + ';tts:' + muaConfig.tts)
        }
        if (err !== null) {
          log.info('maybe no local config')
          console.info(err)
        }
        this.connectLive()
        setInterval(() => {
          this.updateDanmuList()
        }, 500)
        // setInterval(() => {
        //   this.speakDanmu(null)
        // }, 800)
        setInterval(() => {
          this.speakDanmuReal(null)
        }, 1000)
      })
    },
    getNewSessionId () {
      var index = 0
      var charArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', '1', '2', '9']
      var stringBuilder = ''
      while (index < 10) {
        const randomIndex = Math.floor(Math.random() * 10) + 7
        stringBuilder += charArray[randomIndex]
        index++
      }
      return stringBuilder
    },
    updateDanmuList () {
      if (dispalyDmList.length > 7) {
        dispalyDmList.shift()
      }
      if (waitUpdateDmList.length > 0) {
        dispalyDmList.push(waitUpdateDmList.shift())
      }
    },
    count () {
      let t = new Date()
      if (t.getSeconds() === 0) {
        console.info('try reset count')
        muaConfig.comeinLastMinute = 0
      }
    },
    connectLive () {
      // get init configure
      let _self = this
      // let roomid = 2808861
      live = new LiveWS(Number(muaConfig.roomid))
      live.on('open', () => {
        log.info('正在尝试连接到弹幕服务器······')
        let sysInfo = {userid: '1001', // user id
          uuid: 1001,
          nickname: 'CATCAT', // user nickname
          avatar: '', // avatar address
          live_level: '', // live level
          xz_level: '', // xz level
          xz_name: '',
          danmu: '正在尝试连接到弹幕服务器······', // dm
          time: 0, // send time
          use_state: 0, // use state
          type: 1
        }
        dispalyDmList.push(sysInfo)
      })
      live.on('live', () => {
        log.info('成功连接到弹幕服务器')
        let sysInfo = {userid: '1001', // user id
          uuid: 1002,
          nickname: 'CATCAT', // user nickname
          avatar: '', // avatar address
          live_level: '', // live level
          xz_level: '', // xz level
          xz_name: '',
          danmu: '成功连接到弹幕服务器', // dm
          time: 0, // send time
          use_state: 0, // use state
          type: 1
        }
        dispalyDmList.push(sysInfo)
        live.on('heartbeat', (online) => {
          log.info('···heartbeat···')
          _self.muaConfig.onlineCount = online
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
                    uuid: 0,
                    nickname: '', // user nickname
                    avatar: '', // avatar address
                    live_level: '', // live level
                    xz_level: '', // xz level
                    xz_name: '',
                    danmu: '', // dm
                    time: 0, // send time
                    use_state: 0, // use state
                    roomId: 0,
                    type: 1,
                    sessionId: ''
                  }
                  let info = data[index].data.info
                  const danmu = info[1]
                  const userInfo = info[2]
                  const xzInfo = info[3]
                  // add danmu to nedb
                  // let danmuInfo = g.danmu
                  danmuStore.uuid = Math.random(100000000)
                  danmuStore.danmu = danmu
                  danmuStore.userid = userInfo[0]
                  danmuStore.nickname = userInfo[1]
                  danmuStore.time = (info[9].ts === null || info[9].ts === undefined) ? info[0][4] : info[9].ts
                  danmuStore.xz_level = (xzInfo[0] === null || xzInfo[0] === undefined) ? '' : xzInfo[0]
                  danmuStore.xz_name = (xzInfo[1] === null || xzInfo[1] === undefined) ? '' : xzInfo[1]
                  danmuStore.roomId = parseInt(muaConfig.roomid)
                  danmuStore.sessionId = muaConfig.sessionId
                  // add to list
                  console.info(danmuStore)
                  _self.uploadDm(danmuStore)
                  if (dispalyDmList.length < 7) {
                    dispalyDmList.push(danmuStore)
                  } else {
                    waitUpdateDmList.push(danmuStore)
                  }
                  // speakList.push(danmuStore)
                  _self.speakDanmuReal(danmuStore)
                  // do repeat check
                  db.find({time: danmuStore.time}, (err, docs) => {
                    if (docs.length === 0) {
                      db.insert(danmuStore, (err, ret) => {
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
                    uuid: 0,
                    userid: '',
                    uname: '',
                    uname_color: '',
                    time: '',
                    use_state: 0,
                    type: 3
                  }
                  // console.info(data[index].data.data)
                  comeInStore.uuid = Math.random(100000000)
                  comeInStore.userid = data[index].data.data.uid
                  comeInStore.uname = data[index].data.data.uname
                  comeInStore.uname_color = data[index].data.data.uname_color
                  comeInStore.time = data[index].data.data.timestamp
                  comeInList.push(comeInStore)
                  muaConfig.comeinLastMinute++
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
                    uuid: 0,
                    giftName:'',
                    userid: '',
                    uname: '',
                    num:0,
                    uname_color: '',
                    time: '',
                    use_state: 0,
                    type: 4
                  }
                  giftStore.uuid = Math.random(100000000)
                  giftStore.giftName = data[index].data.data.giftName
                  giftStore.userid = data[index].data.data.userid
                  giftStore.uname = data[index].data.data.uname
                  giftStore.uname_color = data[index].data.data.uname_color
                  giftStore.time = data[index].data.data.timestamp
                  giftList.push(giftStore)
                  // _self.speakDanmu(giftStore)
                  if (giftList.length >= 4) {
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
      this.$electron.ipcRenderer.send('createWindow')
    },
    uploadDm (danmuStore) {
      if (this.muaConfig.catdb) {
        this.$http({
          method: 'post',
          url: 'https://db.loli.monster/cat/dm/addDanMu?clientId=' + this.muaConfig.clientId + '&roomId=' + muaConfig.roomid,
          data: danmuStore,
          headers: {'content-type': 'application/json'}
        }).then(function (response) {
          // handle success
          console.log(response)
        }).catch(function (error) {
          // handle error
          console.log(error)
        })
      }
    },
    setClientId (cid) {
      let _self = this
      db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          _self.$db.update({ _id: docs[0]._id }, { $set: { clientId: cid } }, {}, function () {
            console.info('update success')
          })
        } else {
          let cidStore = {
            clientId: _self.cid, // user id
            type: 2
          }
          _self.$db.insert(cidStore, (err, ret) => {
            if (err !== null) {
              console.info(err)
            }
          })
        }
        if (err !== null) {
          console.info(err)
        }
      })
    },
    speakDanmu (gift) {
      if (muaConfig.tts) {
      // 判断是否在阅读
        if (speakStatus) {
          // 不阅读 把其加入阅读list
          if (gift !== null) {
            speakList.push(gift)
          }
        } else {
          if (speakList.length !== 0) {
            speakStatus = true
            if (gift !== null) {
              speakList.push(gift)
            }
            let tempText = speakList.pop()
            this.speak(tempText)
          } else {
            if (gift !== null) {
              speakStatus = true
              let tempText = gift
              this.speak(tempText)
            }
          }
        }
      }
    },
    speakDanmuReal (dm) {
      if (muaConfig.tts) {
      // 判断是否在阅读
        if (speakStatus) {
          // 不阅读 把其加入阅读list
          if (dm !== null) {
            speakDMList.push(dm)
          }
        } else {
          if (speakDMList.length !== 0) {
            speakStatus = true
            if (dm !== null) {
              speakDMList.push(dm)
            }
            let tempText = speakDMList.pop()
            this.speakDM(tempText)
          } else {
            if (dm !== null) {
              speakStatus = true
              let tempText = dm
              this.speakDM(tempText)
            }
          }
        }
      }
    },
    speak (tempText) {
      if (typeof tempText !== 'undefined' && tempText.giftName !== '小心心' && tempText.giftName !== '辣条') {
        // say.speak('感谢' + tempText.uname + '赠送的' + tempText.giftName, null, 1.0, (err) => {
        //   if (err) {
        //     return console.error(err)
        //   }
        //   speakStatus = false
        //   console.log('Text has been spoken.')
        // })
        this.synthesizeToSpeaker('感谢' + tempText.uname + '赠送的' + tempText.giftName)
      }
    },
    speakDM (tempText) {
      if (typeof tempText !== 'undefined' && tempText.danmu !== '') {
        // say.speak('感谢' + tempText.uname + '赠送的' + tempText.giftName, null, 1.0, (err) => {
        //   if (err) {
        //     return console.error(err)
        //   }
        //   speakStatus = false
        //   console.log('Text has been spoken.')
        // })
        this.synthesizeToSpeaker(tempText.danmu)
      }
    },
    synthesizeToSpeaker (text) {
      const player = new sdk.SpeakerAudioDestination()
      player.onAudioEnd = function (s) {
        console.info(s)
      }
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, sdk.AudioConfig.fromDefaultSpeakerOutput(player))
      console.info('come in ss')
      console.info(synthesizer)
      try {
        synthesizer.speakTextAsync(
          text,
          result => {
            speakStatus = false
            synthesizer.close()
            if (result) {
              console.log(JSON.stringify(result))
              speakStatus = false
            }
            // synthesizer.close()
          },
          error => {
            console.log(error)
            speakStatus = false
            synthesizer.close()
          })
      } catch (e) {
        console.info(e)
        speakStatus = false
      }
    }
  }
}
</script>
<style>
@keyframes move_wave {
    0% {
        transform: translateX(0) translateZ(0) scaleY(1)
    }
    50% {
        transform: translateX(-25%) translateZ(0) scaleY(0.55)
    }
    100% {
        transform: translateX(-50%) translateZ(0) scaleY(1)
    }
}
.waveWrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 1%;
    bottom: 0%;
    top: 0%;
    margin: auto;
}
.waveWrapperInner {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    bottom: -1px;
    
}
.bgTop {
    z-index: 15;
    opacity: 0.5;
     z-index: -4;
}
.bgMiddle {
    z-index: 10;
    opacity: 0.75;
     z-index: -4;
}
.bgBottom {
    z-index: 5;
     z-index: -4;
}
.wave {
  z-index: -4;
    position: absolute;
    left: 0;
    width: 400%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
}
.waveTop {
    background-size: 50% 100px;
}
.waveAnimation .waveTop {
  animation: move-wave 3s;
   -webkit-animation: move-wave 3s;
   -webkit-animation-delay: 1s;
   animation-delay: 1s;
}
.waveMiddle {
    background-size: 50% 120px;
}
.waveAnimation .waveMiddle {
    animation: move_wave 10s linear infinite;
}
.waveBottom {
    background-size: 50% 100px;
}
.waveAnimation .waveBottom {
    animation: move_wave 15s linear infinite;
}
.online {
  left: 10%;
  position:fixed;
  top:3%;
  background-color: transparent;
  color: #ffffff;
  font-family:  'Consolas','zxfyyt','YouYuan';
  z-index: 5;
}
.comeinLastMinute {
  left: 10%;
  position:fixed;
  top:6%;
  background-color: transparent;
  font-family:  'Consolas','zxfyyt','YouYuan';
  color: #ffffff;
  z-index: 5;
}
.settingClass { 
  background-image: linear-gradient(45deg, rgb(245, 100, 17), rgb(245, 110, 32) ,rgb(245, 110, 32),rgb(247, 142, 82),rgb(255, 135, 66),rgb(245, 195, 166),rgb(255, 255, 255));
  width: 10px;
  height: 10px; 
  position: fixed;
  top:0%;
  border-radius: 50%;
  z-index: 2;
}



.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-5%);
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
  transform: translateY(-5%);
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
  border-radius: 5% 5% 5% 5%;
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
  border: 1px solid rgb(82, 109, 139),;
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(93, 123, 158), rgb(93, 123, 158));
  border-radius: 5% 5% 5% 5%;
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
  border: 1px solid rgb(128, 113, 151);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(141, 124, 166), rgb(141, 124, 166));
  border-radius:  5% 5% 5% 5%;
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
  border: 1px solid rgb(173, 94, 123);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(190, 102, 134), rgb(190, 102, 134));
  border-radius: 5% 5% 5% 5%;
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
  border: 1px solid rgb(180, 143, 33);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(199, 157, 36), rgb(199, 157, 36));
  border-radius: 5% 5% 5% 5%;
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
  border: 1px solid rgb(30, 88, 80);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(30, 88, 80), rgb(77, 151, 151));
  border-radius:  5% 5% 5% 5%;
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
  border: 1px solid rgb(16, 32, 90);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(16, 32, 90), rgb(96, 128, 228));
  border-radius: 5% 5% 5% 5%;
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
  border: 1px solid rgb(56, 26, 107);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(56, 26, 107), rgb(116, 101, 193));
  border-radius: 5% 5% 5% 5%;
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
  border: 1px solid rgb(136, 20, 54);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(136, 20, 54), rgb(194, 88, 129));
  border-radius: 5% 5% 5% 5%;
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
  border: 1px solid rgb(255, 110, 25);
  border-right-width: 0px;
  background-image: linear-gradient(45deg, rgb(255, 110, 25), rgb(255, 170, 85));
  border-radius: 5% 5% 5% 5%;
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

/** dm color */
/* 1234 */
.xzl_dm_1 {
  text-shadow: 1px 1px 1px  #FFFFFF;
  align-items: left;
  font-family: 'zxfyyt';
  justify-content: center;
  color: rgb(92, 150, 142);
  z-index: 4;
}
/* 5678 */
.xzl_dm_2 {
  text-shadow: 1px 1px 1px  #FFFFFF;
  display: flex;
  align-items: left;
  font-family: 'zxfyyt';
  justify-content: left;
  color: rgb(93, 123, 158);
  z-index: 4;
}
/*9-12 */
.xzl_dm_3 {
  text-shadow: 1px 1px 1px  #FFFFFF;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center; 
  color: rgb(141, 124, 166); 
  z-index: 4;
}
/* 13-16 */
.xzl_dm_4 {
  text-shadow: 1px 1px 1px  #FFFFFF;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px; 
  color: rgb(190, 102, 134);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 17-20 */
.xzl_dm_5 {
  text-shadow: 1px 1px 1px  #FFFFFF;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  color: rgb(199, 157, 36);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 21-24 */
.xzl_dm_6 {
  text-shadow: 1px 1px 1px  #FFFFFF;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  color: rgb(30, 88, 80);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 25-28 */
.xzl_dm_7 {
  text-shadow: 1px 1px 1px  #FFFFFF;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  color: rgb(16, 32, 90);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 29-32 */
.xzl_dm_8 {
  text-shadow: 1px 1px 1px  #FFFFFF;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  color: rgb(56, 26, 107);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 33-36 */
.xzl_dm_9 {
  text-shadow: 1px 1px 1px  #FFFFFF;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  color: rgb(136, 20, 55);
  border-radius: 5% 5% 5% 5%;
  z-index: 4;
}
/* 37-40 */
.xzl_dm_10 {
  text-shadow: 1px 1px 1px  #FFFFFF;
  font-size: 8pt;
  display: flex;
  align-items: center;
  font-family: 'zxfyyt';
  justify-content: center;
  padding-left:1px;
  padding-right:1px;
  border: 2px solid #ffffff;
  border-left-color: #d5f5cf;
  color: rgb(255, 110, 25); 
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
    text-shadow: 2px 2px 2px  #FFFFFF;
    float: left;
    height: 100%;
    width: auto;
    max-width: 100%;
    /* background-image:url('/static/IST_20425_103834.png'); */
  }
  .danmu {
    display: inline-block;
    margin-bottom: 10px;
    align-items: center;
    /* display: inline-block; */
    align-content: center;
    /* background-color: teal; */
    height: 10%;
    width: 100%;
    z-index: 3;
    color: #000;
    font-family: 'Consolas','zxfyyt','YouYuan';
  }
  .comein {
    font-family: 'YouYuan';
    font-size: 10pt;
    color: rgb(32, 32, 32);
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
    color: rgb(8, 51, 4);
    display: flex;
    margin-bottom: 5px;
    align-items: center;
    display: inline-block;
    align-content: center;
    /* background-color: teal; */
    font-family:  'Consolas','zxfyyt','YouYuan';
    font-size: 1rem;
    height: 15%;
    width: 100%;
    z-index: 3;
  }
  .danmu-container {
    padding: 5px;
    align-content: center;
    position: fixed;
    height: 70%;
    width: 80%;
    left: 10%;
    top: 10%;
    background-image:  linear-gradient(0deg, rgba(241, 147, 156,0.1), rgba(234, 81, 127,0.9));
  }
  .comein-container {
    align-content: center;
    position: fixed;
    height: 5%;
    width: 80%;
    left: 10%;
    top: 80%;
    /* background-color: #cc88b2; */
    background-color: transparent;
    z-index: 2;
  } 
  /*** 元素定位改变时动画 ***/
  .comein-move {
    transition: transform 1s;
  }
  .gift-container {
    background-color: transparent;
    align-content: center;
    position: fixed;
    padding-left: 10%;
    width: 99%;
    top: 85%;
    z-index: 2;
  } 
  .left-cat-ear-large {
    position: fixed;
    width: 0;
    top:0%;
    height: 0;
    pointer-events: none;
    border-bottom: 100px solid rgba(255, 149, 149, 0.842);
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
    border-bottom: 50px solid rgba(165, 106, 106, 0.74);
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
    border-bottom: 50px solid rgba(165, 106, 106, 0.74);
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
    border-bottom: 100px solid rgba(255, 149, 149, 0.842);
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    z-index: 1;
  }
  /* .dm{
    width: 10%;
    position: fixed;
    top: 45%;
    left: 40%;
    background-color: #85b3b3; display: inline-block; margin: 0 0.5rem;
    animation: bounce;  
    animation-duration: 2s;  
  } */
  #root{
    width: 455px;
    height: 600px;
    background-color: #85b3b300;
  }
  body {
    background-color: transparent;
  }
  #c-bg{
    height: 100%;
    z-index: 1;
    -webkit-app-region: drag;
    width: 99%;
    position: fixed;
    border-radius:1%;
    -webkit-background-size: 50px 50px;
		-moz-background-size: 50px 50px;
		background-size: 50px 50px;
		-moz-box-shadow: 8px 8px 8px gray;
		-webkit-box-shadow: 8px 8px 8px gray;
		box-shadow: 1px 1px 8px gray;
    /* background-image:  repeating-radial-gradient(circle at 50% 50%,#e98892 20px, #e98892 20px, #e98892 40px, #e98892 40px, #e98892 60px, #e98892 60px, #e98892 80px, #e98892 80px, #e98892 100px); */
   
    background:transparent
    }
  ::-webkit-scrollbar {
    display: none;
  }
  /* repeating-radial-gradient(circle at 50% 50%,#99CCCC 20px, #7171B7 20px, #7171B7 40px, #CCCC99 40px, #CCCC99 60px, #4F9C9C 60px, #4F9C9C 80px, #99CCCC 80px, #99cccc 100px);
    */
</style>
