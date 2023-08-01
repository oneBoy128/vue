<!--修改个人信息模块-->
<template>
    <div>
        <el-form :model="form" ref="form" label-width="80px" label-position="left" :rules="rules">
            <el-form-item label="用户名">
                <el-input :disabled="true" :value="form.username"></el-input>
            </el-form-item>
            <el-form-item label="更改邮箱" prop="email"
            :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="更改号码">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">更改信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  <script>
import { mapState } from 'vuex';

    export default {
      name:'MyFix',
      data() {
        return {
          form:{
            username:this.$route.query.username,
            password:this.$route.query.password,
            role:this.$route.query.role,
            email:this.$route.query.email,
            phone:this.$route.query.phone
          },
          rules: {
                name: [
                    { required: true, message: '请输入新名称', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ],
                Email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
           }
        }
      },
      methods: {
        tests(){
            console.log(this.user.username)
            console.log(this.$route.query)
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
                        this.$store.dispatch('changeUser',this.form);
                        this.$notify({
                            type: 'success',
                            message: '修改成功!',
                            position: 'bottom-right',
                        });
                        setTimeout(() => {
                            this.$router.replace({path:'/mycount/myinform'})
                        }, 500);
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