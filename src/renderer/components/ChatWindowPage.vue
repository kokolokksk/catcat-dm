<template>
  <div id="chat-w">
    <input style="width: 70%;"  class="chat-style" type='text' v-model = danmu name= "danmu" @keyup.enter="sendDm" /><a-button class="left-margin " type="default" @click="sendDm" >发送</a-button>
  </div>
</template>
<script>
const send = require('bilibili-live-danmaku-api')
const { remote } = require('electron')
const catConfig = require('electron-json-storage')
require('electron').ipcRenderer.on('setchat-close-fresh', (event, message) => {
  location.reload()
})
export default {
  data () {
    return {
      roomid:0,
      danmu:'',
      SESSDATA:'',
      csrf:'',
      top: false,
      borderAreaBotColor: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let _self = this
      _self.roomid = Window.roomid
      if (typeof catConfig.getSync('SESSDATA') === 'string') {
        _self.SESSDATA = catConfig.getSync('SESSDATA')
      }
      if (typeof catConfig.getSync('csrf') === 'string') {
        _self.csrf = catConfig.getSync('csrf')
      }
      if (typeof catConfig.getSync('alwaysOnTop') === 'boolean') {
        _self.top = catConfig.getSync('alwaysOnTop')
      }
      if (typeof catConfig.getSync('bbc') === 'string') _self.borderAreaBotColor = catConfig.getSync('bbc').replace(') 80%', ',0.8)').replace('rgb', 'rgba')
      if (_self.top === true) {
        _self.$electron.remote.getCurrentWindow().setAlwaysOnTop(true)
      } else {
        _self.$electron.remote.getCurrentWindow().setAlwaysOnTop(false)
      }
    },
    sendDm () {
      // console.info('?')
      let _self = this
      const msg = _self.danmu/* Message */
      const roomid = _self.roomid/* Roomid */
      const SESSDATA = _self.SESSDATA/* Cookie: SESSDATA */
      const csrf = _self.csrf/* Cookie: bili_jct */
      if (msg !== '') {
        send({
          msg,
          roomid,
          SESSDATA,
          csrf
          // extra
        })
        _self.danmu = ''
      } else {
        alert('不能为空')
      }
    }
  }
}
</script>
<style>
 #chat-w{
   width: 99%;
 }
 input {
   border:0;
   outline:0;
   background-color: transparent;
   border-bottom-width: 1px;
   border-bottom-color: #AFECAB;
   border:solid 1px rgb(145, 145, 145);
 }
 input:focus{
       outline: 1px solid #ffa77e; 
       
  } 
</style>