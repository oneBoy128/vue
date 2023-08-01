<template>
    <div id="couter">
      <div id="text">
        <h1 class="animate__animated animate__fadeInUp">The Best Hotel</h1>
        <h1 class="animate__animated animate__fadeInUp animate__slow animate__delay-1s">In Your</h1>
        <h1 class="animate__animated animate__fadeInUp animate__slower animate__delay-1s">Daily Life</h1>
      </div>
    </div>
  </template>
  
  <script>
  export default {
      name:'TopPage'
  }
  //aaa
  </script>
  <style scoped>
      #couter{
          width: 99%;
          height: 631px;
          display: flex;
          margin-top: 30px;
      }
      #text{
        position: absolute;
        left: 100px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        z-index: 99;
        font-size: 45px;
      }
  </style>