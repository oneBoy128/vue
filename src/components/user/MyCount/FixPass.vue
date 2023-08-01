<!--修改个人信息模块-->
<template>
    <div>
        <el-form :model="form" ref="form" label-width="80px" label-position="left" :rules="rules">
            <el-form-item label="初始密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
            <el-input autocomplete="off" prefix-icon="el-icon-lock" placeholder="至少6位字母和数字" show-password v-model.number="form.newpassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="cnewpassword">
            <el-input autocomplete="off" prefix-icon="el-icon-lock" placeholder="至少6位字母和数字" show-password v-model.number="form.cnewpassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">更改信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  <script>
import { mapState } from 'vuex';
import axios from 'axios'

    export default {
      name:'FixPass',
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.form.cnewpassword !== '') {
              this.$refs.form.validateField('cnewpassword');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.newpassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          form:{
            password:'',
            newpassword:'',
            cnewpassword:'',
            username:this.$route.query.username,
          },
          rules: {
            newpassword: [
                    { validator: validatePass, trigger: 'blur' }
                ],
            cnewpassword: [
                { validator: validatePass2, trigger: 'blur' }
            ],
           }
        }
      },
      methods: {
        tests(){
            console.log(this.user.username)
            console.log(this.form)
        },
        //查看信息表是否为空
        onSubmit() {
            this.$refs['form'].validate((valid) => {
            if (valid) {
                this.$confirm('此操作将修改您的个人信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                      axios({
                        method:'post',
                        url:'http://localhost:8081/user/updatePwd',
                        data:JSON.stringify({newPwd:this.form.newpassword,oldPwd:this.form.password,username:this.form.username}),
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                      }).then(resp=>{
                        if(resp.data.code == 2003){
                          this.$notify({
                                  type: 'success',
                                  message: "修改成功",
                                  position: 'bottom-right',
                              });
                                setTimeout(() => {
                                  this.$router.replace({path:'/mycount/myinform'})
                           }, 500);
                        }else{
                          this.$notify({
                                  type: 'info',
                                  message: resp.data.msg,
                                  position: 'bottom-right',
                              });
                        }
                      }).catch(err=>{
                        console.log('失败：',err)
                      })
                    }).catch(() => {
                    this.$notify({
                        type: 'info',
                        message: '已取消修改',
                        position: 'bottom-right'
                    });          
                });
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
      },
      computed:{
        ...mapState(['user']),
      }
    }
  </script>

<style>

</style>