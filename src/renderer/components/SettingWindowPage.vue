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
    房间号:<input type='text' v-model = roomid name= "roomid" /><a-button class="left-margin" type="default" @click="setRoomId" >设置</a-button> <a-button class="left-margin" type="default" @click="copyClientId" >clientId</a-button> 
    <a-divider />
    <div id="color-container" style="display:flex">
      <div id="color-back" style="padding-left:2vw;padding-right:2vw">
        <p>
          背景颜色:
        <div id="pc" style="display: inline-flex;">
        </div>
        <a-button style="top: 0.6vh;" class="left-margin" @click="setBackgroundColor" type='default'>设置</a-button>
      </div>
      <div id="color-dm" style="padding-left:2vw;padding-right:2vw">
        <p>
          弹幕颜色:
        <div id="pc2" style="display: inline-flex;">
        </div>
        <a-button style="top: 0.6vh;" class="left-margin" @click="setDanmuColor" type='default'>设置</a-button>
      </div>
      <div id="color-btc" style="padding-left:2vw;padding-right:2vw">
        <p>
          边框上色:
        <div id="pc44" style="display: inline-flex;">
        </div>
        <a-button style="top: 0.6vh;" class="left-margin" @click="setBorderAreaTopColor" type='default'>设置</a-button>
      </div>
      <div id="color-bbc" style="padding-left:2vw;padding-right:2vw">
        <p>
          边框下色:
        <div id="pc55" style="display: inline-flex;">
        </div>
        <a-button style="top: 0.6vh;" class="left-margin" @click="setBorderAreaBotColor" type='default'>设置</a-button>
      </div>
      <div id="color-preview" style="padding-left:2vw;padding-right:2vw">
        <p>
          预览:
        <div id="pc3"  :style="backColorPreview" >
            <p  id="pc4" :style="{color:danmuColorPreview.color,textShadow:dmTs}">文字</p>
        </div>
        <div id="pc444" :style="borderAreaTopColor">
        </div>
        <div id="pc555" :style="borderAreaBotColor">
        </div>
      </div>
    </div>
    <p class="line"/>
    弹幕阴影:<input type='text' v-model = dmTs name= "dmTs" /><a-button class="left-margin" type="default" @click="setDmTs" >设置</a-button>
    <a-divider />
    置顶:<a-switch default-checked v-model="alwaysOnTop" checked-children="开" un-checked-children="关" @change="setAlwaysOnTop" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a-badge color="#f50" text="将弹幕窗口进行置顶" />
    <p class="line"/>
    弹幕上传:<a-switch default-checked v-model="catdb" checked-children="开" un-checked-children="关" @change="setCatdb" />&nbsp;&nbsp;<a-badge color="#2db7f5" text="上传至远程服务器(db.loli.monster)" />
    <p class="line"/>
    <!-- chat置顶:<a-switch default-checked v-model="chatAlwaysOnTop" checked-children="开" un-checked-children="关" @change="setChatAlwaysOnTop" />
    <p class="line"/> -->
    波浪:<a-switch default-checked v-model="waveD" checked-children="开" un-checked-children="关" @change="setWaveD" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a-badge color="#87d068" text="将弹幕中的波浪动画开启" />
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
        TTS:<a-switch default-unchecked v-model="tts" checked-children="开" un-checked-children="关" @change="setTTS" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a-badge color="orange" text="阅读收到的弹幕" />
    </div>
    <p class="line"/>
    礼物感谢:<a-switch default-unchecked v-model="ttsGift" checked-children="开" un-checked-children="关" @change="setTTSGift" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a-badge color="orange" text="阅读收到的收费礼物" />
     <a-divider />
    语音选择:<select v-model =  voice name= "voice"  >
                 <option v-for="(item,index) in speechSynthesisVoiceNameList" :key="index" :value='item.voiceValue' >{{item.voiceName}}</option>  
            </select>
            <input type='text' v-model = testVoiceText name= "testVoiceText"  style="width: 20vw" maxlength="5" /> 
            <a-button @click="testVoice" class="left-margin" type='default'>试听</a-button>
            <a-button @click="setVoice" class="left-margin" type='default'>设置</a-button>
    <p class="line"/>
    SESSDATA:<input type='text' v-model = SESSDATA name= "SESSDATA" /><a-button class="left-margin" type="default" @click="setSESSDATA" >设置</a-button>
    <p class="line"/>
    csrf:<input type='text' v-model = csrf name= "csrf" /><a-button class="left-margin" type="default" @click="setCsrf" >设置</a-button>
    <p class="line"/>
    Ocp-Apim-Subscription-Key:<input type='text' v-model = v1 name= "v1" /><a-button class="left-margin" type="default" @click="setV1" >设置</a-button>
    <p class="line"/>
    REGION_IDENTIFIER:<input type='text' v-model = v2 name= "v2" /><a-button class="left-margin" type="default" @click="setV2" >设置</a-button>
    <a-divider />
    当前版本:{{packageS.version}}<a-button class="left-margin" type="default" @click="checkUpdate" >检查更新</a-button>
    <p class="line"/>
  </div> 
</template>
<script>
/* eslint-disable */
import '@simonwep/pickr/dist/themes/nano.min.css'
import Pickr from '@simonwep/pickr'
import path from 'path'
const { app, remote, clipboard } = require('electron')
const catConfig = require('electron-json-storage')
let packageS = require('../../../package.json')
const sdk = require('microsoft-cognitiveservices-speech-sdk')
// Simple example, see optional options for more configuration.
let speechConfig = null
export default {
  data () {
    return {
      packageS: packageS,
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
      ttsGift:false,
      dmTs:'1px 1px 1px  #fff',
      alwaysOnTop: true,
      catdb: false,
      chatAlwaysOnTop: false,
      SESSDATA:'',
      csrf:'',
      v1: '',
      v2: '',
      voice: '',
      dmc: 'rgba(255,255,255,1)',
      bgc: 'rgba(255,255,255,1)',
      btc: 'rgb(255,255,255) 20%',
      bbc: 'rgb(255,255,255) 80%',
      testVoiceText: '',
      clientId: '',
      backColorPreview: {
        backgroundColor: '#fff'
      },
      borderAreaTopColor: {
        backgroundColor: '#fff'
      },
      borderAreaBotColor: {
        backgroundColor: '#fff'
      },
      danmuColorPreview: {
        color: '#000'
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let _self = this
      if ((typeof catConfig.getSync('roomid') == 'number')) Window.roomid = _self.roomid = catConfig.getSync('roomid')
      _self.clientId = catConfig.getSync('clientId')
      if (typeof catConfig.getSync('tts') == 'boolean') {
        _self.tts = catConfig.getSync('tts')
      }
      if (typeof catConfig.getSync('ttsGift') == 'boolean') {
        _self.ttsGift = catConfig.getSync('ttsGift')
      }
      if (typeof catConfig.getSync('waveD') == 'boolean') {
        _self.waveD = catConfig.getSync('waveD')
      }
      if (typeof catConfig.getSync('alwaysOnTop') == 'boolean') {
        _self.alwaysOnTop = catConfig.getSync('alwaysOnTop')
      }
      if (typeof catConfig.getSync('catdb') == 'boolean') {
        _self.catdb = catConfig.getSync('catdb')
      } 
      /* if (catConfig.getSync('roomId')) {
        _self.roomId = catConfig.getSync('roomId')
      } */
      if (typeof catConfig.getSync('dmTs') == 'string') {
        _self.dmTs = catConfig.getSync('dmTs')
      }
      /* if (catConfig.getSync('scaleX')) {
        _self.scaleX = catConfig.getSync('scaleX')
      } */
      if (typeof catConfig.getSync('clientId') == 'string') {
        _self.clientId = catConfig.getSync('clientId')
      }
      if (typeof catConfig.getSync('bgc') == 'string') {
        _self.bgc = catConfig.getSync('bgc')
      }
      if (typeof catConfig.getSync('btc') == 'string') {
        _self.btc = catConfig.getSync('btc')
      }
      if (typeof catConfig.getSync('bbc') == 'string') {
        _self.bbc = catConfig.getSync('bbc')
      }
      if (typeof catConfig.getSync('dmc') == 'string') {
        _self.dmc = catConfig.getSync('dmc')
      }
      if (typeof catConfig.getSync('dmf') == 'string') {
        _self.dmf = catConfig.getSync('dmf')
      }
      if (typeof catConfig.getSync('voice') == 'string') {
        _self.voice = catConfig.getSync('voice')
      }
      if (typeof catConfig.getSync('SESSDATA') == 'string') {
        _self.SESSDATA = catConfig.getSync('SESSDATA')
      }
      if (typeof catConfig.getSync('csrf') == 'string') {
        _self.csrf = catConfig.getSync('csrf')
      }
      if (typeof catConfig.getSync('v1') == 'string') {
        _self.v1 = catConfig.getSync('v1')
      }
      if (typeof catConfig.getSync('v2') == 'string') {
        _self.v2 = catConfig.getSync('v2')
      }
      console.info(this.clientId)
      try {
        if (!_self.clientId) {
          this.$http.get('http://db.loli.monster/cat/client/generateClientId')
            .then(function (response) {
              // handle success
              console.log(response)
              _self.clientId = response.data
              _self.setClientId(response.data)
            })
            .catch(function (error) {
              // handle error
              console.log(error)
            })
        }
      } catch (e) {
        _self.clientId = 'NetworkError'
      }
      // fixme load color
      document.getElementById('pc3').style.backgroundColor = _self.bgc
      document.getElementById('pc4').style.color = _self.dmc
      if (typeof _self.btc=='string') {
        document.getElementById('pc44').style.backgroundColor = _self.btc.replace(' 20%', '')
      } else {
        document.getElementById('pc44').style.backgroundColor = '#fff'
      }
      if (typeof _self.bbc == 'string') {
        document.getElementById('pc55').style.backgroundColor = _self.bbc.replace(' 80%', '')
      } else {
        document.getElementById('pc55').style.backgroundColor = '#fff'
      }
      _self.creatPickColor()
    },
    creatPickColor () {
      let _self = this
      const pickr = Pickr.create({
        el: '#pc',
        default: _self.bgc === null ? 'rgba(255,255,255,1)' : _self.bgc,
        theme: 'nano', // or 'monolith', or 'nano'
        swatches: [
          'rgb(244, 67, 54)',
          'rgb(233, 30, 99)',
          'rgb(156, 39, 176)',
          'rgb(103, 58, 183)',
          'rgb(63, 81, 181)',
          'rgb(33, 150, 243)',
          'rgb(3, 169, 244)',
          'rgb(0, 188, 212)',
          'rgb(0, 150, 136)',
          'rgb(76, 175, 80)',
          'rgb(139, 195, 74)',
          'rgb(205, 220, 57)',
          'rgb(255, 235, 59)',
          'rgb(255, 193, 7)'
        ],
        components: {
        // Main components
          preview: true,
          opacity: false,
          hue: true,
          // Input / output Options
          interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: true
          }
        },
        i18n: {
          'btn:save': '选中',
          'btn:clear': '清空'
        }
      })
      pickr.on('save', (color, instance) => {
        console.log('Event: "save"', color, instance)
        pickr.hide()
        _self.backColorPreview.backgroundColor = color.toHEXA().toString()
        console.info(_self.backColorPreview)
      })
      const pickr2 = Pickr.create({
        el: '#pc2',
        theme: 'nano', // or 'monolith', or 'nano'
        default: _self.dmc === null ? 'rgba(255,255,255,1)' : _self.dmc,
        swatches: [
          'rgb(244, 67, 54)',
          'rgb(233, 30, 99)',
          'rgb(156, 39, 176)',
          'rgb(103, 58, 183)',
          'rgb(63, 81, 181)',
          'rgb(33, 150, 243)',
          'rgb(3, 169, 244)',
          'rgb(0, 188, 212)',
          'rgb(0, 150, 136)',
          'rgb(76, 175, 80)',
          'rgb(139, 195, 74)',
          'rgb(205, 220, 57)',
          'rgb(255, 235, 59)',
          'rgb(255, 193, 7)'
        ],
        components: {
        // Main components
          preview: true,
          opacity: false,
          hue: true,
          // Input / output Options
          interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: true
          }
        },
        i18n: {
          'btn:save': '选中',
          'btn:clear': '清空'
        }
      })
      pickr2.on('save', (color, instance) => {
        console.log('Event: "save"', color, instance)
        pickr2.hide()
        _self.danmuColorPreview.color = color.toHEXA().toString()
        _self.$forceUpdate()
      })
      const pickr44 = Pickr.create({
        el: '#pc44',
        default: _self.btc === null ? 'rgb(255,255,255)' : _self.btc.replace(' 20%', ''),
        theme: 'nano', // or 'monolith', or 'nano'
        swatches: [
          'rgb(244, 67, 54)',
          'rgb(233, 30, 99)',
          'rgb(156, 39, 176)',
          'rgb(103, 58, 183)',
          'rgb(63, 81, 181)',
          'rgb(33, 150, 243)',
          'rgb(3, 169, 244)',
          'rgb(0, 188, 212)',
          'rgb(0, 150, 136)',
          'rgb(76, 175, 80)',
          'rgb(139, 195, 74)',
          'rgb(205, 220, 57)',
          'rgb(255, 235, 59)',
          'rgb(255, 193, 7)'
        ],
        components: {
        // Main components
          preview: true,
          opacity: false,
          hue: true,
          // Input / output Options
          interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: true
          }
        },
        i18n: {
          'btn:save': '选中',
          'btn:clear': '清空'
        }
      })
      pickr44.on('save', (color, instance) => {
        console.log('Event: "save"', color, instance)
        pickr44.hide()
        _self.borderAreaTopColor.backgroundColor = color.toHEXA().toString()
        console.info(_self.borderAreaTopColor)
      })
      const pickr55 = Pickr.create({
        el: '#pc55',
        default: _self.bbc === null ? 'rgb(255,255,255)' : _self.bbc.replace(' 80%', ''),
        theme: 'nano', // or 'monolith', or 'nano'
        swatches: [
          'rgb(244, 67, 54)',
          'rgb(233, 30, 99)',
          'rgb(156, 39, 176)',
          'rgb(103, 58, 183)',
          'rgb(63, 81, 181)',
          'rgb(33, 150, 243)',
          'rgb(3, 169, 244)',
          'rgb(0, 188, 212)',
          'rgb(0, 150, 136)',
          'rgb(76, 175, 80)',
          'rgb(139, 195, 74)',
          'rgb(205, 220, 57)',
          'rgb(255, 235, 59)',
          'rgb(255, 193, 7)'
        ],
        components: {
        // Main components
          preview: true,
          opacity: false,
          hue: true,
          // Input / output Options
          interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: true
          }
        },
        i18n: {
          'btn:save': '选中',
          'btn:clear': '清空'
        }
      })
      pickr55.on('save', (color, instance) => {
        console.log('Event: "save"', color, instance)
        pickr55.hide()
        _self.borderAreaBotColor.backgroundColor = color.toHEXA().toString()
        console.info(_self.borderAreaBotColor)
      })
    },
    setTTS () {
      let _self = this
      catConfig.set('tts', _self.tts)
    },
    setTTSGift () {
      let _self = this
      catConfig.set('ttsGift', _self.ttsGift)
    },
    setWaveD () {
      let _self = this
      catConfig.set('waveD', _self.waveD)
    },
    setAlwaysOnTop () {
      let _self = this
      catConfig.set('alwaysOnTop', _self.alwaysOnTop)
    },
    setChatAlwaysOnTop () {
      let _self = this
      catConfig.set('chatAlwaysOnTop', _self.chatAlwaysOnTop)
    },
    setCatdb () {
      let _self = this
      catConfig.set('catdb', _self.catdb)
    },
    setRoomId () {
      // console.info('?')
      let _self = this
      catConfig.set('roomid', _self.roomid * 1)
    },
    setDmTs () {
      // console.info('?')
      let _self = this
      catConfig.set('dmTs', _self.dmTs)
    },
    copyClientId () {
      // console.info('?')
      let _self = this
      let toast = this.$toasted.show('已复制', {
        theme: 'toasted-primary',
        position: 'top-center',
        duration : 2000
      })
      clipboard.writeText(_self.clientId)
    },
    setScaleX () {
      // console.info('?')
      let _self = this
      catConfig.set('scaleX', _self.scaleX)
    },
    setClientId (cid) {
      // console.info('?')
      catConfig.set('clientId', cid)
    },
    setBackgroundColor () {
      let color = document.getElementById('pc3').style.backgroundColor
      console.info(color)
      catConfig.set('bgc', color)
    },
    setBorderAreaTopColor () {
      let color = document.getElementById('pc444').style.backgroundColor
      console.info(color)
      catConfig.set('btc', color + ' 20%')
    },
    setBorderAreaBotColor () {
      let color = document.getElementById('pc555').style.backgroundColor
      console.info(color)
      catConfig.set('bbc', color + ' 80%')
    },
    setDanmuColor () {
      let color = document.getElementById('pc4').style.color
      console.info(color)
      catConfig.set('dmc', color)
    },
    setDmf () {
      let _self = this
      catConfig.set('dmf', _self.dmf)
    },
    setVoice () {
      let _self = this
      catConfig.set('voice', _self.voice)
    },
    checkUpdate () {
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
      catConfig.set('SESSDATA', _self.SESSDATA)
    },
    setCsrf () {
      // console.info('?')
      let _self = this
      catConfig.set('csrf', _self.csrf)
    },
    setV1 () {
      // console.info('?')
      let _self = this
      catConfig.set('v1', _self.v1)
    },
    setV2 () {
      // console.info('?')
      let _self = this
      catConfig.set('v2', _self.v2)
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
/* eslint-disable */
</script>
<style>
    .pickr {
      left: 4vw;
    }
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
