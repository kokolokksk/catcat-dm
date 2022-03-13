<template>
  <div class="setting">
    <!-- <ul class="ul-h">
      <li v-for="(item,index) in menuList" :key="item.id" class="li-style" @click="menuIndex=index">
        <p class="p-style"></p>
          {{
            item.name
          }}
        <p  :class="menuIndex==index?'line-style-display':'line-style'"></p>
      </li>
    </ul>   -->
    <p class="line"/>
    房间号:<input type='text' v-model = roomid name= "roomid" /><a-button class="left-margin" type="default" @click="setRoomId" >设置</a-button>
    <p class="line"/>
    <div id="demo-content">
      <div id="demo-app">
        <p>
      背景颜色:
      <input id="bgc" data-jscolor="{value:'rgba(192,160,255,0.5)'}" onInput="update(this.jscolor)"><a-button class="left-margin" @click="setBackgroundColor" type='default'>设置</a-button>
      </p>
      <em id="pr2" style="display:inline-block; padding:1em;">background</em>
      <em id="pr3" style="display:inline-block; padding:1em;">background color</em>
      <br>
       <p class="line"/>
      弹幕颜色(非呐卷用户):
      <input id="dmc" data-jscolor="{value:'rgba(192,160,255,0.5)'}" onInput="updateDanmu(this.jscolor)"><a-button class="left-margin" @click="setDanmuColor" type='default'>设置</a-button>
       <p class="line"/>
      </div> 
		</div> 
    <p class="line"/>
    置顶:<a-switch default-checked v-model="alwaysOnTop" checked-children="开" un-checked-children="关" @change="setAlwaysOnTop" />
    <p class="line"/>
    chat置顶:<a-switch default-checked v-model="chatAlwaysOnTop" checked-children="开" un-checked-children="关" @change="setChatAlwaysOnTop" />
    <p class="line"/>
    波浪:<a-switch default-checked v-model="waveD" checked-children="开" un-checked-children="关" @change="setWaveD" />
    <!-- <p class="line"/>
    缩放倍率:<input type='text' v-model = scaleX name= "scaleX" /><a-button class="left-margin" @click="setScaleX" type='default'>设置</a-button>
    <p class="line"/>
    全局字体:<select v-model = "dmf" name= "dmf" class= fc @change="setFc">
                 <option v-for="(item,index) in fontList" :key="index" :value='item.value' :class='item.class'>{{item.title}}</option>  
            </select><a-button @click="setDmf" class="left-margin" type='default'>设置</a-button> -->
    <p class="line"/>
    <!-- 风格选择:<select v-model =  voiceStyle name= "voiceStyle" >
                 <option v-for="(item,index) in speechSynthesisVoiceNameList" :key="index" :value='item.value' :class='item.class'>{{item.title}}</option>  
            </select><a-button @click="setDmf" class="left-margin" type='default'>设置</a-button>
    <p class="line"/> -->
    <div>
        TTS:<a-switch default-unchecked v-model="tts" checked-children="开" un-checked-children="关" @change="setTTS" />
    </div>
    <p class="line"/>
    语音选择:<select v-model =  voice name= "voice"  >
                 <option v-for="(item,index) in speechSynthesisVoiceNameList" :key="index" :value='item.voiceValue' >{{item.voiceName}}</option>  
            </select>
            <input type='text' v-model = testVoiceText name= "testVoiceText"  style="width: 20vw" maxlength="5" /> 
            <a-button @click="testVoice" class="left-margin" type='default'>试听</a-button>
            <a-button @click="setVoice" class="left-margin" type='default'>设置</a-button>
    <p class="line"/>
    当前版本:dom-v-1.1.2<a-button class="left-margin" type="default" @click="checkUpdate" >检查更新</a-button>
    <p class="line"/>
    SESSDATA:<input type='text' v-model = SESSDATA name= "SESSDATA" /><a-button class="left-margin" type="default" @click="setSESSDATA" >设置</a-button>
    <p class="line"/>
    csrf:<input type='text' v-model = csrf name= "csrf" /><a-button class="left-margin" type="default" @click="setCsrf" >设置</a-button>
    <p class="line"/>
    Ocp-Apim-Subscription-Key:<input type='text' v-model = v1 name= "v1" /><a-button class="left-margin" type="default" @click="setV1" >设置</a-button>
    <p class="line"/>
    REGION_IDENTIFIER:<input type='text' v-model = v2 name= "roomid" /><a-button class="left-margin" type="default" @click="setV2" >设置</a-button>
  </div> 
</template>
<script>
import { dialog } from 'electron'
const sdk = require('microsoft-cognitiveservices-speech-sdk')
let speechConfig = null
let jscolor = window.jscolor
window.update = function update (picker) {
  document.getElementById('pr2').style.background = picker.toBackground()
  document.getElementById('pr3').style.background = picker.toRGBAString()
}
window.updateDanmu = function updateDanmu (picker) {
  document.getElementById('pr2').style.color = picker.toRGBAString()
  document.getElementById('pr3').style.color = picker.toRGBAString()
}
jscolor.trigger('input')
let roomid
export default {
  data () {
    return {
      menuList: [{
        id: 1,
        name: '基本设置',
        status:0
      }, {
        id: 2,
        name: '关于',
        status:0
      }],
      menuIndex:-1,
      roomid:0,
      waveD:true,
      scaleX:1,
      fc:'Consolas',
      dmf:'1',
      fontList:[{id: 1, title: '字心坊韵圆体', value: 'zxfyyt', class: 'zxfyyt'},
        {id: 2, title: '微软雅黑', value: 'Microsoft YaHei', class: 'yahei'},
        {id: 4, title: 'Consolas', value: 'Consolas', class: 'consolas'},
        {id: 4, title: 'Fira Code', value: 'Fira Code', class: 'FiraCode'},
        {id: 5, title: '宋体', value: 'SimSun', class: 'SimSun'},
        {id: 6, title: '黑体', value: 'SimHei', class: 'SimHei'},
        {id: 7, title: '微软正黑体', value: 'Microsoft JhengHei', class: 'JhengHei'},
        {id: 8, title: '幼圆', value: 'YouYuan', class: 'YouYuan'},
        {id: 9, title: '苹方', value: 'PingFang SC', class: 'PingFangSC'},
        {id: 10, title: '华文彩云', value: 'STCaiyun', class: 'STCaiyun'},
        {id: 11, title: '华文琥珀', value: 'STHupo', class: 'STHupo'},
        {id: 12, title: '冬青黑体简', value: 'Hiragino Sans GB', class: 'HiraginoSansGB'}],
      speechSynthesisVoiceNameList:[
        {id: 1, voiceName: '晓辰', voiceValue: 'zh-CN-XiaochenNeural', locale: 'zh-CN', sex: 'female', description: '针对自发对话进行了优化'},
        {id: 2, voiceName: '晓涵', voiceValue: 'zh-CN-XiaohanNeural', locale: 'zh-CN', sex: 'female', description: '常规，使用 SSML 提供多种风格'},
        {id: 3, voiceName: '晓墨', voiceValue: 'zh-CN-XiaomoNeural', locale: 'zh-CN', sex: 'female', description: '常规，使用 SSML 提供多种角色扮演和风格'},
        {id: 4, voiceName: '晓秋', voiceValue: 'zh-CN-XiaoqiuNeural', locale: 'zh-CN', sex: 'female', description: '针对叙事进行了优化'},
        {id: 5, voiceName: '晓睿', voiceValue: 'zh-CN-XiaoruiNeural', locale: 'zh-CN', sex: 'female', description: '高级语音，使用 SSML 提供多种风格'},
        {id: 5, voiceName: '晓双', voiceValue: 'zh-CN-XiaoshuangNeural', locale: 'zh-CN', sex: 'female', description: '儿童语音，针对儿童故事和聊天进行了优化；使用 SSML 提供多种语音风格'},
        {id: 5, voiceName: '晓晓', voiceValue: 'zh-CN-XiaoxiaoNeural', locale: 'zh-CN', sex: 'female', description: '常规，使用 SSML 提供多种语音风格'},
        {id: 5, voiceName: '晓萱', voiceValue: 'zh-CN-XiaoxuanNeural', locale: 'zh-CN', sex: 'female', description: '常规，使用 SSML 提供多种角色扮演和风格'},
        {id: 5, voiceName: '晓颜', voiceValue: 'zh-CN-XiaoyanNeural', locale: 'zh-CN', sex: 'female', description: '针对客户服务进行了优化'},
        {id: 5, voiceName: '晓悠', voiceValue: 'zh-CN-XiaoyouNeural', locale: 'zh-CN', sex: 'female', description: '儿童语音，针对讲故事进行了优化'},
        {id: 5, voiceName: '云希', voiceValue: 'zh-CN-YunxiNeural', locale: 'zh-CN', sex: 'male', description: '常规，使用 SSML 提供多种风格'},
        {id: 5, voiceName: '云扬', voiceValue: 'zh-CN-YunyangNeural', locale: 'zh-CN', sex: 'male', description: '针对新闻阅读进行了优化，使用 SSML 提供多种语音风格'},
        {id: 5, voiceName: '云野', voiceValue: 'zh-CN-YunyeNeural', locale: 'zh-CN', sex: 'male', description: '针对使用 SSML 提供的故事讲述、多种角色扮演和风格进行了优化'}
      ],
      tts:false,
      alwaysOnTop: true,
      chatAlwaysOnTop: false,
      SESSDATA:'',
      csrf:'',
      v1: '',
      v2: '',
      voice: '',
      testVoiceText: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        if (docs !== null && docs.length !== 0) {
          console.info(docs)
          _self.roomid = docs[0].roomid
          Window.roomid = _self.roomid
          _self.scaleX = docs[0].scaleX
          _self.dmf = docs[0].dmf
          _self.tts = docs[0].tts
          _self.alwaysOnTop = docs[0].alwaysOnTop
          _self.chatAlwaysOnTop = docs[0].chatAlwaysOnTop
          _self.waveD = (typeof (docs[0].waveD) === 'undefined' || docs[0].waveD === '') ? true : docs[0].waveD
          _self.voice = docs[0].voice
          _self.v1 = docs[0].v1
          _self.v2 = docs[0].v2
          // fixme load color
          document.getElementById('bgc').nodeValue = docs[0].bgc === null ? 'rgba(255,255,255,1)' : docs[0].bgc
          document.getElementById('dmc').nodeValue = docs[0].bgc === null ? 'rgba(255,255,255,1)' : docs[0].bgc
        }
        if (err !== null) {
          console.info(err)
        }
      })
    },
    setTTS () {
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.tts)
          _self.$db.update({ _id: docs[0]._id }, { $set: { tts: _self.tts } }, {}, function () {
            console.info('update success')
          })
        } else {
          let ttsStore = {
            tts: _self.tts, // user id
            type: 2
          }
          _self.$db.insert(ttsStore, (err, ret) => {
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
    setWaveD () {
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.waveD)
          _self.$db.update({ _id: docs[0]._id }, { $set: { waveD: _self.waveD } }, {}, function () {
            console.info('update success')
          })
        } else {
          let waveDStore = {
            waveD: _self.waveD, // user id
            type: 2
          }
          _self.$db.insert(waveDStore, (err, ret) => {
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
    setAlwaysOnTop () {
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.alwaysOnTop)
          _self.$db.update({ _id: docs[0]._id }, { $set: { alwaysOnTop: _self.alwaysOnTop } }, {}, function () {
            console.info('update success')
          })
        } else {
          let alwaysOnTopStore = {
            alwaysOnTop: _self.alwaysOnTop, // user id
            type: 2
          }
          _self.$db.insert(alwaysOnTopStore, (err, ret) => {
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
    setChatAlwaysOnTop () {
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.chatAlwaysOnTop)
          _self.$db.update({ _id: docs[0]._id }, { $set: { chatAlwaysOnTop: _self.chatAlwaysOnTop } }, {}, function () {
            console.info('update success')
          })
        } else {
          let chatAlwaysOnTopStore = {
            chatAlwaysOnTop: _self.chatAlwaysOnTop, // user id
            type: 2
          }
          _self.$db.insert(chatAlwaysOnTopStore, (err, ret) => {
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
    setRoomId () {
      // console.info('?')
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.roomid)
          _self.$db.update({ _id: docs[0]._id }, { $set: { roomid: _self.roomid } }, {}, function () {
            console.info('update success')
          })
        } else {
          let roomStore = {
            roomid: _self.roomid, // user id
            type: 2
          }
          _self.$db.insert(roomStore, (err, ret) => {
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
    setScaleX () {
      // console.info('?')
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.scaleX)
          _self.$db.update({ _id: docs[0]._id }, { $set: { scaleX: _self.scaleX } }, {}, function () {
            console.info('update success')
          })
        } else {
          let roomStore = {
            scaleX: _self.scaleX, // user id
            type: 2
          }
          _self.$db.insert(roomStore, (err, ret) => {
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
    setBackgroundColor () {
      let _self = this
      let color = document.getElementById('bgc').getAttribute('data-current-color')
      console.info(color)
      _self.$db.find({ type: 2 }, (err, docs) => {
        if (docs !== null && docs.length !== 0) {
          _self.$db.update({ _id: docs[0]._id }, { $set: { bgc: color } }, {}, function () {
            console.info('update success')
          })
        }
        if (err !== null) {
          console.info(err)
        }
      })
    },
    setDanmuColor () {
      let _self = this
      let color = document.getElementById('dmc').getAttribute('data-current-color')
      console.info(color)
      _self.$db.find({ type: 2 }, (err, docs) => {
        if (docs !== null && docs.length !== 0) {
          _self.$db.update({ _id: docs[0]._id }, { $set: { dmc: color } }, {}, function () {
            console.info('update success')
          })
        }
        if (err !== null) {
          console.info(err)
        }
      })
    },
    setDmf () {
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.dmf)
          _self.$db.update({ _id: docs[0]._id }, { $set: { dmf: _self.dmf } }, {}, function () {
            console.info('update success')
          })
        } else {
          let dmfStore = {
            dmf: _self.dmf, // user id
            type: 2
          }
          _self.$db.insert(dmfStore, (err, ret) => {
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
    setVoice () {
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.voice)
          _self.$db.update({ _id: docs[0]._id }, { $set: { voice: _self.voice } }, {}, function () {
            console.info('update success')
          })
        } else {
          let voiceStore = {
            voice: _self.voice, // user id
            type: 2
          }
          _self.$db.insert(voiceStore, (err, ret) => {
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
    checkUpdate () {
      let _self = this
      let a = this.$http
      a.get('https://raw.githubusercontent.com/kokolokksk/catcat-dm/dom/version.json')
        .then(function (response) {
          // handle success
          console.log(response)
          alert('最新版本为：' + response.data.version)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    setSESSDATA () {
      // console.info('?')
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.SESSDATA)
          _self.$db.update({ _id: docs[0]._id }, { $set: { SESSDATA: _self.SESSDATA } }, {}, function () {
            console.info('update success')
          })
        } else {
          let SESSDATAStore = {
            SESSDATA: _self.SESSDATA, // user id
            type: 2
          }
          _self.$db.insert(SESSDATAStore, (err, ret) => {
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
    setCsrf () {
      // console.info('?')
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.csrf)
          _self.$db.update({ _id: docs[0]._id }, { $set: { csrf: _self.csrf } }, {}, function () {
            console.info('update success')
          })
        } else {
          let csrfStore = {
            csrf: _self.csrf, // user id
            type: 2
          }
          _self.$db.insert(csrfStore, (err, ret) => {
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
    setV1 () {
      // console.info('?')
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.v1)
          _self.$db.update({ _id: docs[0]._id }, { $set: { v1: _self.v1 } }, {}, function () {
            console.info('update success')
          })
        } else {
          let csrfStore = {
            csrf: _self.v1, // user id
            type: 2
          }
          _self.$db.insert(csrfStore, (err, ret) => {
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
    setV2 () {
      // console.info('?')
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
        console.info(docs)
        if (docs !== null && docs.length !== 0) {
          console.info(_self.v2)
          _self.$db.update({ _id: docs[0]._id }, { $set: { v2: _self.v2 } }, {}, function () {
            console.info('update success')
          })
        } else {
          let csrfStore = {
            csrf: _self.v2, // user id
            type: 2
          }
          _self.$db.insert(csrfStore, (err, ret) => {
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
    testVoice () {
      if (this.v1 !== '') {
        speechConfig = sdk.SpeechConfig.fromSubscription(this.v1, this.v2)
        speechConfig.speechSynthesisLanguage = 'zh-cn'
        speechConfig.speechSynthesisVoiceName = this.voice
        this.synthesizeToSpeaker(this.testVoiceText)
      } else {
        console.error('no key')
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
            synthesizer.close()
            if (result) {
              console.log(JSON.stringify(result))
            }
            // synthesizer.close()
          },
          error => {
            console.log(error)
            synthesizer.close()
          })
      } catch (e) {
        console.info(e)
      }
    }
  }
}
</script>
<style>
    .FiraCode{
      font-family: "Fira Code",sans-serif;
    }
    .HiraginoSansGB{
      font-family: "Hiragino Sans GB",sans-serif;
    }
    .STHupo{
      font-family: "STHupo",sans-serif;
    }
    .STCaiyun{
      font-family: "STCaiyun",sans-serif;
    }
    .PingFangSC{
      font-family: "PingFang SC",sans-serif;
    }
    .SimSun{
      font-family: "SimSun",sans-serif;
    }
    .SimHei{
      font-family: "SimHei",sans-serif;
    }
    .JhengHei{
      font-family: "Microsoft JhengHei",sans-serif;
    }
    .YouYuan{
      font-family: "YouYuan",sans-serif;
    }
    .left-margin{
      margin-left: 2px;
      height: 27px;
    }
    .setting{
      width: 410px;
      height: 400px;
      /* font-family: "Consolas","Microsoft YaHei",sans-serif; */
      margin-left: 10px;
     }
     .line {
       height: 5px;
       width: 1px;
       margin-top: 5px;
     }
    * {
      margin: 0;
      padding: 0;
      moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select:none;
      -khtml-user-select:none;
      -webkit-user-select:none;
      -ms-user-select:none;
      user-select:none;
    }
    body,html{
      font-family: "Consolas",sans-serif;
    }
    .zxfyyt{
      font-family: "zxfyyt",sans-serif;
    }
    .yahei{
      font-family: "Microsoft YaHei",sans-serif;
    }
    .consolas{
      font-family: "Consolas",sans-serif;
    }
    li {
      padding-right: 5px ;
    }
    .li-style {
        list-style: none;
        font-family: '微软雅黑';
        font-size: 12pt;
        margin-left: 2pt;
        cursor: pointer;
        position: relative;
    }
    .li-style:hover .p-style{
      display: block;
    }
    .li-style:hover .line-style{
      width: 100%;
    }
    .ul-h {
        display: flex;
    }
    .p-style{
      position: absolute;
      background: rgba(194, 194, 194, 0.4);
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      z-index: -1;
    }
    .line-style{
      position: absolute;
      background: rgba(16, 88, 55, 0.7);
      left: 0;
      top: 14pt;
      width: 100%;
      height: 20%;
      display: none;
      z-index: -1;
    }
    .line-style-display{
      position: absolute;
      background: rgba(16, 88, 55, 0.7);
      left: 0;
      top: 14pt;
      width: 100%;
      height: 20%;
      z-index: -1;
      display: block;
    }
</style>
