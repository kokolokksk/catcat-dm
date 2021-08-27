<template>
  <div id='root'>
    <div id="c-bg">
    </div>
    <div class="dm" :class="class1&&'animate__animated animate__bounce'">
      123
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      class1:false
    }
  },
  mounted () {
    this.class1 = 1
  }
}
</script>
<style>
  .dm{
    width: 10%;
    position: fixed;
    top: 45%;
    left: 40%;
    background-color: #85b3b3; display: inline-block; margin: 0 0.5rem;
  animation: bounce; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
  }
  #root{
    width: 500px;
    height: 500px;
    -webkit-app-region: drag;  
  }
  #c-bg{
    width: 90%;
    height: 90%;
    border-radius:50%;
    background-image:  repeating-radial-gradient(circle at 50% 50%,#99CCCC 20px, #99CCCC 20px, #99CCCC 40px, #99CCCC 40px, #99CCCC 60px, #99CCCC 60px, #99CCCC 80px, #99CCCC 80px, #99CCCC 100px);
   
  }
  ::-webkit-scrollbar {
    display: none;
  }
  /* repeating-radial-gradient(circle at 50% 50%,#99CCCC 20px, #7171B7 20px, #7171B7 40px, #CCCC99 40px, #CCCC99 60px, #4F9C9C 60px, #4F9C9C 80px, #99CCCC 80px, #99cccc 100px);
    */
</style>
