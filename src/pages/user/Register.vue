<template>
    <div class="box">
      <div class="register" v-loading="loading">
      <el-form ref="form" :model="form" :rules="rules"  label-width="30px" class="from">
          <el-form-item label="" prop="name">
          <el-input prefix-icon="el-icon-user" placeholder="注册的账号" v-model.number="form.name"></el-input>
          </el-form-item>
          <el-form-item label="" prop="psw">
          <el-input autocomplete="off" prefix-icon="el-icon-lock" placeholder="至少6位字母和数字" show-password v-model.number="form.psw"></el-input>
          </el-form-item>
          <el-form-item label="" prop="pswok">
          <el-input autocomplete="off" prefix-icon="el-icon-lock" placeholder="至少6位字母和数字" show-password v-model.number="form.pswok"></el-input>
          </el-form-item>
          <el-form-item prop="role">
            <el-select v-model="form.role" placeholder="请选择身份">
            <el-option label="学生" value="2">学生</el-option>
            <el-option label="老师" value="1">老师</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="phone">
            <el-input prefix-icon="el-icon-user" placeholder="注册的手机号" v-model.number="form.phone"></el-input>
          </el-form-item>
          <el-form-item label=""  prop="email"
            :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]">
          <el-input validate-event prefix-icon="el-icon-message" placeholder="邮箱地址" v-model="form.email"></el-input>
          </el-form-item>
    </el-form>
    <div class="buttonVerify">
      </div>
      <el-button type="primary" :round=false :plain=false class="buttonres" @click="reg('form')">注册</el-button>
      <div class="login">已有账号，
          <router-link to="/login">登录</router-link>
          <span style="margin-left: 10%; font-size:13px">注册即代表您已阅读并同意《使用协议》</span>
      </div>
      </div>
    </div>
  </template>
   
  <script>
   
  import axios from 'axios'
  export default {
      name:"MyRegister",
      data () {
           var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.form.pswok !== '') {
              this.$refs.form.validateField('pswok');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.psw) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
          return {
              isforbidden:false,
              loading:false,
              form:{
                name: '',
                verify:'',
                psw:'',
                pswok:'',
                email:"",
                phone:'',
                role:null,
              },
              rules: {
                psw: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                pswok: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                name:[
                    { required: true, message: '请输入名称', trigger: 'change' },
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
              }
          };
      },
      
      methods:{
          reg(form){
            const regex = /^1[3456789]\d{9}$/;
            if(regex.test(this.form.phone)){
                    this.$refs[form].validate((valid) => {
                    if (valid) {
                      this.loading = true
                        axios({
                            method:"POST",
                            url:"http://localhost:8081/user/regist",
                            data:JSON.stringify(
                                {
                                    username : this.form.name,
                                    password : this.form.psw,
                                    email:this.form.email,
                                    phone: this.form.phone,
                                    role: this.form.role
                                }
                            ),
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                        }).then((res)=>{
                            this.loading = false;
                            this.$alert('注册成功', '提示', {
                                confirmButtonText: '确定',
                            }); 
                            if(res.data.code==2001){
                                setTimeout(()=>{
                                    this.$router.push("/login")
                                },500)
                        }else{
                            this.$alert(res.data.msg, '提示', {
                            confirmButtonText: '确定',});
                        }
                    },).catch(err=>{
                        console.log(err);
                    })
                    } else {
                        this.$alert('请输入完整内容', '提示', {
                        confirmButtonText: '确定',
                        callback: () => {
                        this.$message({
                            type: 'error',
                            message: `错误: ${ "请输入完整信息" }`
                        });
                    }
                    });
                    }
                });
            }
            else{
                alert("电话号码格式有误");
            }
          },
      },
  }
  </script>
   
  <style scoped>
  .box{
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
  }
  .register{
      width: 35%;
      height: 600px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 5px;
  }
  footer{
      font-family: '宋体';
      font-size: 24px;
      text-align: center;
      padding-top: 50px;
  }
  .from{
      width: 75%;
      margin: 0 auto;
      margin-right: 15%;
      margin-top: 8%;
  }
  .inputtow{
      width: 65%;
  }
   
  .buttonVerify{
      position: absolute;
      left: 64%;
      top: 31%;
  }
  .buttonres{
      width: 70%;
      margin-left: 15%;
      margin-top: 5%;
  }
  .login{
      margin-left: 15%;
      margin-top: 5%;
      color: #ccc;
      font: size 13px;
  }
  </style>