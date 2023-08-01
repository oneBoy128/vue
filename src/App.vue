<template>
  <div id="root">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'App',
  mounted(){
    document.title = '智学云';
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
    text-decoration: none;
    list-style: none;
  }
  html{
    background-color: rgb(242, 242, 242);
  }
  body{
    overflow-x:hidden
  }
    ::-webkit-scrollbar
  {
      width:5px;
      height:5px;
      background-color:#F5F5F5;
  }
/*定义滚动条轨道
 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
      -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
      border-radius:10px;
      background-color:#F5F5F5;
  }
/*定义滑块
 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
      border-radius:10px;
      -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
      background-color:#555;
  }
  


</style>