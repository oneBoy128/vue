<!--一个登录注册页面-->
<template>
    <div id="conter">
        <!-- 表单盒子 -->
        <div class="form-box">
            <!-- 登录盒子 -->
            <div class="login-box">
                <h1 class="title">
                    Sign in
                </h1>
                <div class="img-box">
                    <img src="../../../public/imgs/tx1.png" alt="">
                </div>
                <el-form :model="form" class="input-box" ref="form">
                    <el-form-item>
                        <input type="text" v-model="form.username" placeholder="用户名">
                    </el-form-item>
                    <el-form-item>
                        <input type="password" v-model="form.password" placeholder="密码">
                    </el-form-item>
                </el-form>
                <div class="btn-box">
                    <button @click="onload">登录</button>
                    <button @click="mySlide">去注册</button>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'MyLogin',
    data() {
        return {
            flag: true,
            form: {
                username: '',
                password: '',
            },
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        mySlide() {
            this.$router.push("/register")
        },
        onload() {
            this.$store.dispatch('letLoading', this.form)
            const loading = this.$loading({
                lock: true,
                text: '检验账号中请等待.......',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            axios({
                method: 'post',
                url: 'http://localhost:8081/user/login',
                data: JSON.stringify({ username: this.form.username, password: this.form.password }),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            }).then(resp => {
                if (resp.data.code == 2002) {
                    localStorage.setItem('isOnline', true)
                    this.$store.state.isOnline = true
                    this.$store.dispatch('letLoading',resp.data.data)
                    this.$router.push('/')
                }
                else if (resp.data.code == 4022) {
                    this.$alert(resp.data.msg, '');
                }
                else {
                    this.$alert('账号或密码出错','出错了')
                }
                loading.close();
            }).catch(err => {
                console.log('失败：', err)
            })
        },
    },
}
</script>
  
<style scoped>
body {
    /* 设置渐变色 */
    background: linear-gradient(to right, #e6a49d, #fff);
}

#conter {
    height: 804.4px;
    /* 溢出隐藏 */
    overflow: hidden;
    /* 设置弹性布局 */
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #e6a49d, #fff);
    background-size: 100%;

}

input::input-placeholder {
    color: red;
}


/* 表单盒子 */
.form-box {
    position: absolute;
    width: 400px;
    height: 500px;
    border-radius: 5px;
    right: 20%;
    /* 模糊，磨砂质感 */
    backdrop-filter: blur(10px);
    box-shadow: 2px 1px 19px rgba(0, 0, 0, .1);
    z-index: 99;
}


/* 一开始隐藏注册盒子 */
.register-box {
    display: none;
}

/* 标题 */
.title {
    margin-top: 50px;
    text-align: center;
    /* 设置用户禁止选中 */
    user-select: none;
    color: #fff;
    /* 文字阴影 */
    text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

/* 图片盒子 */
.img-box {
    width: 100px;
    height: 100px;
    margin: 10px auto;
    user-select: none;
    border-radius: 50%;
    /* 溢出隐藏 */
    overflow: hidden;
    box-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

/* 图片 */
.img-box img {
    width: 100%;
}

/* 输入框盒子 */
.input-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 输入框 */
input {
    outline: none;
    width: 200px;
    height: 40px;
    text-indent: 10px;
    font-size: 16px;
    font-weight: 500;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 20px;
    border: 1px solid #fff;
}

input::placeholder {
    font-size: 14px;
    font-weight: 400;
}

input:focus::placeholder {
    opacity: 0;
}

/* 按钮盒子 */
.btn-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* 按钮 */
button {
    width: 100px;
    height: 30px;
    margin-bottom: 10px;
    border: none;
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    background-color: #c08f8a;
    /* border: 1px solid #e6a49d; */
}

button:hover {
    cursor: pointer;
}
</style>