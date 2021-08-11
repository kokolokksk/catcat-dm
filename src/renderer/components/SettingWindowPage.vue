<template>
    <ul class="ul-h">
        <li v-for="item in menuList" :key="item.id" class="li-style" @click="liClick(item)">
               <p class="p-style"></p>
                {{
                    item.name
                }}
                <p class="line-style"></p>
                
        </li>
    </ul>    
</template>
<script>
export default {
  data () {
    return {
      menuList: [{
        id: 1,
        name: '基本设置'
      }, {
        id: 2,
        name: '关于'
      }]
    }
  },
  mounted () {},
  methods: {
    liClick (item) {
      console.info(item)
      
    }
  }
}
</script>
<style>
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
      width: 80%;
      height: 20%;
      display: none;
      z-index: -1;
    }
</style>
