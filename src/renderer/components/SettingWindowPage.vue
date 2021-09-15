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
      弹幕颜色:
      <input id="dmc" data-jscolor="{value:'rgba(192,160,255,0.5)'}" onInput="updateDanmu(this.jscolor)"><a-button class="left-margin" @click="setDanmuColor" type='default'>设置</a-button>
       <p class="line"/>
      </div> 
		</div> 
    <p class="line"/>
    缩放倍率:<input type='text' v-model = scaleX name= "scaleX" /><a-button class="left-margin" @click="setScaleX" type='default'>设置</a-button>
    <p class="line"/>
    全局字体:<select v-model = "dmf" name= "dmf" class= fc @change="setFc">
                 <option v-for="(item,index) in fontList" :key="index" :value='item.value' :class='item.class'>{{item.title}}</option>  
            </select><a-button @click="setDmf" class="left-margin" type='default'>设置</a-button>
    <p class="line"/>
    <div>
        TTS:<a-switch default-unchecked v-model="tts" checked-children="开" un-checked-children="关" @change="setTTS" />
    </div>
  </div> 
</template>
<script>
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
      tts:false
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
          _self.scaleX = docs[0].scaleX
          _self.dmf = docs[0].dmf
          _self.tts = docs[0].tts
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
