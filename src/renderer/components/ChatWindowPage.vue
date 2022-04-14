<template>
  <div id="chat-w">
    <input style="width: 70%;"  class="chat-style" type='text' v-model = danmu name= "danmu" @keyup.enter="sendDm" /><a-button class="left-margin " type="default" @click="sendDm" >发送</a-button>
  </div>
</template>
<script>
const send = require('bilibili-live-danmaku-api')
const { remote } = require('electron')
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
      this.$db.find({ type: 2 }, (err, docs) => {
        if (docs !== null && docs.length !== 0) {
          console.info(docs)
          _self.roomid = docs[0].roomid
          _self.SESSDATA = docs[0].SESSDATA
          _self.csrf = docs[0].csrf
          _self.top = typeof (docs[0].chatAlwaysOnTop) === 'undefined' ? false : docs[0].chatAlwaysOnTop
          _self.borderAreaBotColor = typeof (docs[0].bbc) === 'undefined' ? _self.borderAreaBotColor : docs[0].bbc.replace(') 80%', ',0.8)').replace('rgb', 'rgba')
          console.info(_self.borderAreaBotColor)
          if (_self.top === true) {
            _self.$electron.remote.getCurrentWindow().setAlwaysOnTop(true)
          } else {
            _self.$electron.remote.getCurrentWindow().setAlwaysOnTop(false)
          }
        }
        if (err !== null) {
          console.info(err)
        }
      })
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