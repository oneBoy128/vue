<!-- 用户的个人中心 -->
<template>
    <div id="mycount">
      <div id="cd">
          <div class="animate__animated animate__rubberBand" id="touxiang" @click="changImgs">
            <img :src="avaterUrl" alt="" style="width: 100%;">
        </div>
            <a href="javascript:void(0);" id="changeImg" @click="changImgs">点击修改头像</a>
          <el-row>
              <el-col :span="24">
                  <el-menu class="el-menu-vertical-demo" @select="handleOpen" replace :router="true" :default-active="activeIndex" :unique-opened="true">
                      <el-submenu index="1">
                          <template slot="title">
                          <i class="el-icon-user"></i>
                          <span>个人中心</span>
                          </template>
                          <el-menu-item-group>
                          <template></template>
                          <el-menu-item index="/mycount/myinform">个人信息</el-menu-item>
                          <el-submenu v-show="!isAdmin" index="1-4">
                            <span slot="title">修改信息</span>
                            <el-menu-item><router-link :to="{
                                path:'/mycount/myfix',
                                query:{
                                    username:user.username,
                                    email:user.email,
                                    phone:user.phone,
                                    password:user.password,
                                    role:user.role
                                }
                                }">修改基本信息</router-link>
                            </el-menu-item>
                            <el-menu-item><router-link :to="{
                                path:'/mycount/fixpass',
                                query:{
                                    username:user.username,
                                }
                                }">修改安全信息</router-link></el-menu-item>
                          </el-submenu>
                          <el-menu-item @click="reload">注销</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <!-- 学生专用 -->
                      <el-submenu index="3" v-show="isStudent">
                          <template slot="title">
                          <i class="el-icon-s-shop"></i>
                          <span>我的课程</span>
                          </template>
                          <el-menu-item-group>
                          <el-menu-item index="/mycount/lessons">我学习的课程</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <!--老师专用-->
                      <el-submenu index="3" v-show="isTeacher">
                          <template slot="title">
                          <i class="el-icon-s-shop"></i>
                          <span>我的课程</span>
                          </template>
                          <el-menu-item-group>
                          <el-menu-item index="/mycount/teacherLesson/success">管理课程</el-menu-item>
                          <el-menu-item index="/mycount/addlesson">发布课程</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                      <!--管理员专用-->
                      <el-submenu index="3" v-show="isAdmin">
                          <template slot="title">
                          <i class="el-icon-s-shop"></i>
                          <span>管理系统</span>
                          </template>
                          <el-menu-item-group>
                                <el-menu-item index="/mycount/adminteacher">教师管理</el-menu-item>
                                <el-menu-item index="/mycount/adminstudent">学生管理</el-menu-item>
                                <el-menu-item index="/mycount/adminlesson">课程管理</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                  </el-menu>
              </el-col>
          </el-row>
      </div>

      <!--这是一个修改头像的框框-->
      <el-dialog
        :visible.sync="dialogVisible"
        width="40%"
        :destroy-on-close="destroy"
        >
            <MyTest></MyTest>
      </el-dialog>


      <div id="conter"><router-view></router-view></div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  import MyTest from '../MyTest.vue'
  
  export default {
      name:'MyCount',
      data() {
          return {
              activeIndex:this.$route.path,
              role:parseInt(JSON.parse(localStorage.getItem("users")).role),//获取用户角色
              dialogVisible:false,//这个是头像修改框的可见性设置
              destroy:true
          }
      },
      methods: {
          handleOpen(key, keyPath){
              this.defaults = keyPath[1]
          },
          reload(){
              this.$confirm('注销账号?这会导致你重新登陆!!', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                      }).then(() => {
                          this.$store.commit('letReload');
                          this.$router.push({path:'/'})
                      }).catch(()=>{
                          this.$notify({
                              type: 'info',
                              message: '已取消',
                              position: 'bottom-right'
                          });
                      })
          },

          //修改头像
          changImgs(){
            this.dialogVisible = true
          } 
      },
      mounted() {
          this.$nextTick(() => {
              this.$wow.init()
          })
        //   this.$store.dispatch('letLoading',JSON.parse(localStorage.getItem('users')))
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
            //判断该用户是否是管理员
            isAdmin(){
              if(this.Role == '管理员') return true;
              return false
            },

            //判断该用户是否是老师
            isTeacher(){
                if(this.Role == "老师") return true;
                return false;
            },

            //判断该用户是否是学生
            isStudent(){
                if(this.Role == "学生") return true;
                return false;
            },

            //更新头像
            avaterUrl(){
                return this.$store.state.avaterImg
            }
      },
      components:{
          MyTest,
      },
      
  }
  </script>
  
  <style scoped>
      #mycount{
          width: 1300px;
          height: 660px;
          padding-top: 40px;
          top:20px;
          margin-top: 20px;
          background-color: rgb(255, 255, 255);
          position: relative;
          left: 0;
          right: 0;
          margin: 0 auto;
          display: flex;
      }
      #cd{
          width: 168px;
          border-right: 1px solid rgb(230, 230, 230);
      }
      .el-submenu .el-menu-item {
          height: 50px;
          line-height: 50px;
          padding: 0 0px;
          min-width: 131px;
      }
      #touxiang{
          position: relative;
          width: 109px;
          height: 109px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgb(230, 230, 230);
          left: 0;
          right: 0;
          margin: 0 auto;
          margin-bottom: 40px;
      }
      #conter{
          width: 1000px;
          position: relative;
          left: 0;
          right: 0;
          margin: 0 auto;
      }
      #changeImg{
        display: block;
        font-size: 10px;
        width: 50%;
        position: relative;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: 30px;
        color: #303133;
      }
  </style>