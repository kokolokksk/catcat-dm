<template>
  <div class="setting">
    <ul class="ul-h">
      <li v-for="(item,index) in menuList" :key="item.id" class="li-style" @click="menuIndex=index">
        <p class="p-style"></p>
          {{
            item.name
          }}
        <p  :class="menuIndex==index?'line-style-display':'line-style'"></p>
      </li>
    </ul>  
    <p class="line"/>
    roomid:<input type='text' v-model = roomid name= "roomid" /><button @click="setRoomId" type='button'>设置</button>
  </div> 
</template>
<script>
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
      roomid:0
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
        }
        if (err !== null) {
          console.info(err)
        }
      })
    },
    setRoomId () {
      console.info('?')
      let _self = this
      this.$db.find({ type: 2 }, (err, docs) => {
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
    }
  }
}
</script>
<style>
    
    .setting{
      width: 410px;
      height: 400px;
     }
     .line {
       height: 5px;
       width: 1px;
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
