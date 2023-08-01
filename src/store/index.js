import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
    user: localStorage.getItem('users')===null?{}:JSON.parse(localStorage.getItem('users')),
    isOnline: localStorage.getItem('isOnline'),
    avaterImg: localStorage.getItem('users')===null?'../../public/imgs/tx1.png':JSON.parse(localStorage.getItem('users')).imageUrl,//个人头像的url
    
    students:[],//学生数组
    teachers:[],//老师数组
    lessons:[],//课程数组
    chosenlesson:{},//被选择的课程
    
    code:0,//返回状态信息
    ImgCode:null,//返回传输图像的code信息
    IMGURL:null,//返回图片的URL
};
const actions = {

    //登录
    letLoading(context,value){
        context.commit('changeUser', value)
    },


    //修改信息----------------------------------------------------------------------------------
    changeUser(context,value){
        axios({
            method:'post',
            url:'http://localhost:8081/user/updateInfo',
            data:JSON.stringify({email:value.email,phone:value.phone,username:value.username}),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(resp=>{
            if(resp.data.code == 2003){
              localStorage.setItem('isOnline',true)
              state.isOnline = true
              context.commit('changeUser',value)
          }
          }).catch(err=>{
            console.log('失败：',err)
          })
    },
    //修改信息但是是管理员-----------------------------------------------------------
    changeUserAdmin(context,value){
      this.state.code = 0;
      axios({
        method:'post',
        url:'http://localhost:8081/user/updateInfo',
        data:JSON.stringify({email:value.email,phone:value.phone,username:value.username}),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(resp=>{
        if(resp.data.code == 2003){
          this.state.msg = resp.data.msg;  
        }
        this.state.code = resp.data.code
      }).catch(err=>{
        console.log('失败：',err)
      })
    },
    //更改用户状态-------------------------------------------------------------
    ChangeState(context,value){
      this.state.code = 0;
      axios({
        method:'post',
        url:'http://localhost:8081/user/updateStatu?username='+value.username+'&statu='+value.statu,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
      }).then(()=>{

      }).catch(err=>{
        console.log('失败：',err)
      })
    },


    //所有学生------------------------------------------------------------------
    AllStudents(context){
      axios({
        method:'get',
        url:'http://localhost:8081/user/getStudent',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(resp=>{
        context.state.students = resp.data.data;
      }).catch(err=>{
        console.log('失败：',err)
      })
    },
    //所有老师-----------------------------------------------------------------
    AllTeachers(context){
      axios({
        method:'get',
        url:'http://localhost:8081/user/getTeacher',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(resp=>{
        context.state.teachers = resp.data.data;
      }).catch(err=>{
        console.log('失败：',err)
      })
    },
    //管理员查看所有待审核课程(管理员的工作)----------------------------------------------
    AllLessonAdmin(context){
      axios({
        method:'get',
        url:'http://localhost:8081/course/getChecked',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(resp=>{
        context.state.lessons = resp.data.data;
      }).catch(err=>{
        console.log('失败：',err)
      })
    },
    //管理员审核课程----------------------------------------------------------------------------------
    AdminLessons(context,value){
      axios({
        method:'post',
        url:'http://localhost:8080/course/updateChecked?courseId='+value.courseId+'&checked='+value.checked,
      }).then(resp=>{
        console.log(resp)
      }).catch(err=>{
        console.log('失败：',err)
      })
    },
    
    //上传图片方法(用户修改头像)--------------------------------------------------------------
    uploadImg(context,value){//value必须是formdate类型，具体可看MyTest.vue
      fetch('http://localhost:8081/alioss/upload', {
                method: 'POST',
                body: value
            })
            .then(response => response.json())
            .then(data => {
                console.log('上传成功，头像URL：', data);
                // 在这里可以对上传成功后的处理进行逻辑操作，比如显示头像或保存URL等
                state.ImgCode = 0
                state.IMGURL = data.data
            })
            .catch(error => {
                console.error('上传失败：', error);
       });
    },
    //上传图片方法(普通上传)
    uploadImgNormal(context,value){
      fetch('http://localhost:8081/alioss/upload', {
                method: 'POST',
                body: value
            })
            .then(response => response.json())
            .then(data => {
                // 在这里可以对上传成功后的处理进行逻辑操作，比如显示头像或保存URL等
                if(data.code == 0){
                  state.ImgCode = 0
                }
                state.IMGURL = data.data
                console.log('上传成功',data)
            })
            .catch(error => {
                console.error('上传失败：', error);
       });
    },
    //更改用户头像---------------------------------------------------------------
    changeUserImg(context,value){//value:{username,url}
      fetch('http://localhost:8081/user/updateImage?username='+value.username+'&url='+value.url, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                console.log('头像更改成功：', data);
                state.ImgCode = null;
                context.commit('changeUserImg',value.url)
            })
            .catch(error => {
                console.error('上传失败：', error);
                // 在这里可以对上传失败后的处理进行逻辑操作
       });
    },

    //充值路由操作
    changerMoney(context,value){
        axios({
            method:'post',
            url:'http://localhost:8081/hotel/users/'+value,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(resp=>{
            console.log(resp)
            state.user.balance += value;
            localStorage.setItem('users',JSON.stringify(state.user))
          }).catch(err=>{
            console.log('失败：',err)
          })
    },
    //历史订单操作
    TheDing(context){
      axios({
        method:'get',
        url:'http://localhost:8081/hotel/users/center',
        headers:{
          'Content-Type':'application/json;charset=UTF-8'
        }
      }).then(resp=>{
        context.state.dingHistory = resp.data.data.obj;
      })
    },
    //取消订单操作
    cancleDing(context,value){
      console.log(value)
      axios({
        method:'put',
        url:'http://localhost:8081/hotel/users/center/'+value,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(resp=>{
        console.log(resp)
      }).catch(err=>{
        console.log('失败：',err)
      })
    },
    //添加房间
    addRooms(context,value){
        axios({
          method:'put',
          url:'http://localhost:8081/hotel/rooms',
          data:JSON.stringify({number:value.number,price:value.price,description:value.description}),
          headers: {
              'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(resp=>{
          console.log(resp)
        }).catch(err=>{
          console.log('失败：',err)
        })
    }
};


const mutations = {
    //修改用户
    changeUser(state,value){//value = User对象
        let obj = {
            id:value.userId,
            username:value.username,
            role:value.role,
            email:value.email,
            phone:value.phone,
            imageUrl:value.imageUrl,
            createTime:value.createTime,
            updateTime:value.updateTime
        }
        state.user = obj
        state.imageUrl = obj.imageUrl
        state.avaterImg = state.user.imageUrl;
        localStorage.setItem('users',JSON.stringify(obj))
    },
    //修改用户头像
    changeUserImg(state,value){//value = 用户头像URL
      state.user.imageUrl = value;
      state.avaterImg = value;
      localStorage.setItem('users',JSON.stringify(state.user));
    },
    //注销用户登录状态
    letReload(state){
        localStorage.removeItem('isOnline')
        localStorage.removeItem('users')
        state.isOnline = false
        state.msg = null;
        state.avaterImg = null;
        state.users = null
        state.IMGURL = null;
    }
};

export default new Vuex.Store({
    actions,
    mutations,
    state,
})