<template>

    <canvas id ='canvas'>
      ?
    </canvas>
  
 

       
</template>

<script>
let canvas
let ctx
export default {
  mounted () {
    this.initCanvas()
    // 当调整窗口大小时重绘canvas
    window.onresize = () => {
      this.initCanvas()
    }
  },
  methods: {
    initCanvas () {
      console.log('init canvas')
      canvas = document.getElementById('canvas')
      console.log(canvas)
      ctx = canvas.getContext('2d')
      let winW = window.innerWidth
      let winH = window.innerHeight
      canvas.width = winW
      canvas.height = winH
      this.drawFlower()
    },
    drawSmile () {
      ctx.beginPath()
      ctx.arc(75, 75, 50, 0, Math.PI * 2, true)// 绘制
      ctx.moveTo(110, 75)
      ctx.arc(75, 75, 35, 0, Math.PI, false) // 口(顺时针)
      ctx.moveTo(65, 65)
      ctx.arc(60, 65, 5, 0, Math.PI * 2, true) // 左眼
      ctx.moveTo(95, 65)
      ctx.arc(90, 65, 5, 0, Math.PI * 2, true) // 右眼
      ctx.stroke()
    },
    drawFlower () {
      ctx.lineWidth = 2
      ctx.strokeStyle = 'black'
      ctx.fillStyle = '#ED6E91'

      // 花瓣右上
      ctx.beginPath()
      ctx.arc(550, 200, 50, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.fill()

      // 花瓣右下
      ctx.beginPath()
      ctx.arc(550, 300, 50, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.fill()

      // 花瓣左上
      ctx.beginPath()
      ctx.arc(450, 200, 50, 0, 0.5 * Math.PI, true)
      ctx.stroke()
      ctx.fill()

      // 花瓣左下
      ctx.beginPath()
      ctx.arc(450, 300, 50, 0, 1.5 * Math.PI)
      ctx.stroke()
      ctx.fill()
    }
  }
}
</script>
<style>
::-webkit-scrollbar {
  display: none;
}
 
#canvas {
  width: 100vw;
  height: 100vh;
}
 
</style>
