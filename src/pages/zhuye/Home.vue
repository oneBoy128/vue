<template>
    <!--起始页面，整个页面的中心-->
  <div>
    <div id="top_nav">
        <h1 style="margin-left:67px; color:rgb(137,137,135)">智学云</h1>
        <el-menu style="position: sticky; border-bottom: none; background-color:transparent ; margin-right: 40px;" 
        :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  text-color="rgb(12,12,12)" :router="true" :replace="true">
            <el-menu-item class="active el-icon-office-building" index="/">首页</el-menu-item>
            <el-menu-item class="active el-icon-user" v-show="!online" index="/login">登录</el-menu-item>
            <el-menu-item class="active el-icon-user" v-show="online" index="/mycount/myinform">我的账号</el-menu-item>
        </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
//let test newnew
export default {
    name:'MyHome',
    data() {
        return {
            activeIndex:'/'
        }
    },
    methods: {
    },
    computed:{
        online(){
            return this.$store.state.isOnline
        }
    },
    mounted(){
        document.title = '智学云';
    }
}
</script>

<style scoped>
    .active:hover{
        animation: jello;
        animation-duration: 0.5s;
    }
    #top_nav{
        display: flex;
        justify-content: space-between;
        text-align: center;
        line-height: 60px;
        position: sticky;
        top: 0px;
        z-index: 9999;
    }
    .el-menu-item.is-active {
      background-color: transparent !important;
    }
</style>
