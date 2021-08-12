<template>  
  <canvas ref="canvas" id="canvas">
  </canvas>
</template>
<script>
let canvas, ctx
let animationState = false
let visibleDmList, invisibleDmList
let width = 500
let height = 500
let y = 450
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.initCanvas()
    // 当调整窗口大小时重绘canvas
    window.onresize = () => {
      this.initCanvas()
    }
    window.requestAnimationFrame(this.startDraw)
  },
  methods: {
    initCanvas () {
      console.log('init canvas')
      canvas = this.$refs.canvas
      let winW = window.innerWidth
      let winH = window.innerHeight
      canvas.width = winW
      canvas.height = winH
      ctx = canvas.getContext('2d')
    },
    startDraw () {
      this.drawChatPage()
      window.requestAnimationFrame(this.startDraw)
    },
    drawChatPage () {
      let _self = this
      if (!animationState) {
        _self.$db.find({type: 1, use_state: 0}).sort({ time: -1 }).limit(10).exec(function (err, docs) {
          let count = 0
          for (let key in docs) {
            invisibleDmList.push(docs[key])
            // do update
            _self.$db.update({ _id: docs[key]._id }, { $set: { use_state: 1 } }, {}, function () {
              count++
            })
          }
          while (count !== docs.length) {
            console.info('wait data update complete.')
          }
          _self.drawAll()
          if (err !== null) {
            console.error(err)
          }
        })
      }
    },
    drawAll () {
      ctx.clearRect(0, 0, width, height)
      this.drawBackground()
      this.drawDanmu()
    },
    drawBackground () {
      ctx.fillStyle = 'rgba(255,255,255,1)'
      ctx.beginPath()
      ctx.rect(0, 100, 400, 300)
      ctx.fill()
      ctx.lineWidth = '2'
      ctx.strokeStyle = 'rgba(255,168,168,1)'
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, 100)
      ctx.lineTo(100, 0)
      ctx.lineTo(200, 100)
      ctx.lineTo(180, 100)
      ctx.lineTo(100, 20)
      ctx.lineTo(20, 100)
      ctx.moveTo(0, 100)
      ctx.fillStyle = 'rgba(255,100,100,1)'
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(200, 100)
      ctx.lineTo(300, 0)
      ctx.lineTo(400, 100)
      ctx.lineTo(380, 100)
      ctx.lineTo(300, 20)
      ctx.lineTo(220, 100)
      ctx.moveTo(200, 100)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(20, 100)
      ctx.lineTo(100, 20)
      ctx.lineTo(180, 100)
      ctx.lineTo(20, 100)
      ctx.fillStyle = 'rgba(80,80,80,1)'
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(220, 100)
      ctx.lineTo(300, 20)
      ctx.lineTo(380, 100)
      ctx.lineTo(220, 100)
      ctx.fill()
    },
    drawDanmu () {
      // if animation state is on wait is
      // false means last invisibleDmList is empty
      if (!animationState) {
        if (invisibleDmList.length !== 0) {
          // start line 225 425
          console.info('animation stop ,invisible list:')
          console.info(invisibleDmList)
          let dm = invisibleDmList.pop()
          visibleDmList.push(dm)
          visibleDmList.sort(function (a, b) {
            return (b.time - a.time)
          })
          animationState = true
        } else {
          // draw visibleDmList
          let i = 0
          for (let key in visibleDmList) {
            ctx.moveTo(50, y - i * 25)
            ctx.fillStyle = 'rgba(255,255,255,1)'
            ctx.font = '20px "bm"'
            ctx.textBaseline = 'bottom'
            ctx.textAlign = 'left'
            ctx.fillText(visibleDmList[key].nickname + ':' + visibleDmList[key].danmu, 50, y - i * 25)
            i++
          }
          animationState = false
        }
      } else {
        // do animation
        let i = 0
        y -= speed
        if (y <= 425) {
          animationState = false
          y = 450
        } else {
          for (let key in visibleDmList) {
            ctx.moveTo(50, y - i * 25)
            ctx.fillStyle = 'rgba(255,255,255,1)'
            ctx.font = '20px "bm"'
            ctx.textBaseline = 'bottom'
            ctx.textAlign = 'left'
            ctx.fillText(visibleDmList[i].nickname + ':' + visibleDmList[i].danmu, 50, y - i * 25)
            i++
            console.info(key)
          }
        }
      }
    }
  }
}
</script>

<style>
#canvas {
  width: 100vw;
  height: 100vh;
  -webkit-app-region: drag; /** 允许拖动透明窗口中的canvas区域 */
}
::-webkit-scrollbar {
  display: none;
}
</style>
