<template>
  <div class="version">
    <div class="title">CatCatDM</div>
    <div class="items">
      <div class="item">
        <div class="name">App:</div>
        <div class="value">{{ name }}</div>
      </div>
      <div class="item">
        <div class="name">Author:</div>
        <div class="value">{{ author }}</div>
      </div>
      <div class="item">
        <div class="name">Version:</div>
        <div class="value">{{ version }}</div>
      </div>
      <!-- <div class="item">
        <div class="name">Vue.js:</div>
        <div class="value">{{ vue }}</div>
      </div> -->
      <div class="item">
        <div class="name">Electron:</div>
        <div class="value">{{ electron }}</div>
      </div>
      <div class="item">
        <div class="name">Node:</div>
        <div class="value">{{ node }}</div>
      </div>
      <div class="item">
        <div class="name">Platform:</div>
        <div class="value">{{ platform }}</div>
      </div>
      <div class="item">
        <div class="name">GitHub:</div>
        <div class="value">{{ github }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  let packageS = require('../../../package.json')
  export default {
    data () {
      return {
        electron: process.versions.electron,
        name: packageS.name,
        author: packageS.author,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,
        version: packageS.version,
        github: 'https://github.com/kokolokksk/catcat-dm'
      }
    }
  }
</script>

<style scoped>
  #app {
    height: 100%;
  }
  .version {
    height: 100%;
    padding-left: 15vw;
  }
  .title {
    color: #8c0073;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
