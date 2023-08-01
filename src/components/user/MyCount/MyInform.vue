<!-- 用户的个人信息模块 -->
<template>
    <div id="card">
        <el-card class="box-card">
            <div id="card_lan">
                <div><i class="el-icon-user-solid"> </i>姓名：{{user.username}}</div>
                <div><i class="el-icon-key"> </i> 身份：{{Role}}</div>
                <div><i class="el-icon-lock"> </i> 手机号: {{user.phone}}</div>
                <div><i class="el-icon-message"> </i> 注册邮箱：{{user.email}}</div>
            </div>
        </el-card>
    <div id="card_touxiang">
        <img :src="avaterUrl" alt="" style="width: 100%;">
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
    export default {
        name:'MyInform',
        data(){
            return {
                role:parseInt(JSON.parse(localStorage.getItem("users")).role),
            }
        },
        computed:{
            ...mapState(['user']),
            Role(){
                let r = null;
                switch(this.role){
                    case 0:
                        r = "管理员";
                        break;
                    case 1:
                        r = "老师";
                        break;
                    case 2:
                        r = "学生";
                        break;
                }
                return r;
            },
            //更新头像
            avaterUrl(){
                return this.$store.state.avaterImg
            }
        }
    }
</script>

<style scoped>
    .box-card div{
        margin-bottom: 29px;
        margin-top: 55px;
    }
    .box-card{
        width: 900px;
        position: relative;
        top: 49px;
        left: 47px;
        animation: bounceInUp;
        animation-duration: 1.5s;
    }
    #card_lan i{
        color: #93969a;
        padding-right: 20px;
    }
    #card_touxiang{
        width: 254px;
        height: 245px;
        overflow: hidden;
        box-shadow: 5px 5px 10px 1px rgb(135, 132, 132);
        position: relative;
        top: -349px;
        right: -761px;
        animation: bounceIn;
        animation-duration: 1s;
    }

</style>