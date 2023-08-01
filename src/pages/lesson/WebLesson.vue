<template>
  <div id="root">
    <div id="conter"><!--存放课程的网页-->
      <div id="mycount">
          <div id="topbox"><!--顶端课程信息-->
            <div id="imgconter">
              <img class="img" id="" :src="lesson.imageUrl" width="400" height="300" alt="图片">
            </div>
            <div id="lessoninform">
                <div style="font-size: 25px;
                            color: #333333;
                            margin-right: 6px;
                            font-weight: 600;">{{lesson.name}}</div>
                <div class="midbox">
                  <p><i class="el-icon-user lessonIcon"></i>任课教师:<span>{{ lesson.author }}</span></p>
                  <p><i class="el-icon-edit lessonIcon"></i>课程类别:<span>{{lesson.subName}}</span></p>
                  <p><i class="el-icon-alarm-clock lessonIcon" ></i>更新时间:<span>{{formatDate(lesson.updateTime)}}</span></p>
                  <p><i class="el-icon-s-finance lessonIcon" ></i>所需坤分:<span>{{lesson.price}}</span></p>
                </div>
                <el-button type="success" @click="role_dif_func" class="lessonbtn" round><span v-show="isMyLesson==1">参加课程</span><span v-show="isMyLesson==2">下架课程</span></el-button>
                <el-button type="info" class="lessonbtn" v-show="isMyLesson == 0" disabled round>已下架</el-button>
            </div>
        </div>
    </div>
    <div id="bottombox">nihao</div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'WebLesson',
    data(){
      return{
        lesson:JSON.parse(localStorage.getItem('choselesson')),
        userId:JSON.parse(localStorage.getItem("users")).id,//获取个人id，如果是自己的课那么就可以进行其他操作
      }
    },
    methods:{
      formatDate(row) {
            const dateStr = row; // 获取日期字符串，例如 "2023-07-28T08:39:21.000+00:00"
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}年${month}月${day}日`;
        },
      role_dif_func(){/**根据是否是个人课程不同而产生不同的结果 */
        let getter = this.isMyLesson;
        if(getter){//自己课
          axios({
            method:'post',
            url:'http://localhost:8081//course/updateStatu?courseId='+this.lesson.courseId,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
          }).then(resp=>{
            console.log(resp)
          }).catch(err=>{
            console.log('失败：',err)
          })
        }else{//不是自己课
          alert("等待功能完善目的是为了让学生下载课程附件")
        }
      }
    },
    computed:{
        isMyLesson(){
          if(this.lesson.statu == 0) return 0;
          return this.userId == this.lesson.userId?2:1
        }
    },
    mounted(){
      this.lesson=JSON.parse(localStorage.getItem('choselesson'))
      console.log('chosenLesson',this.$store.state.chosenlesson)
      this.userId=JSON.parse(localStorage.getItem("users")).id//获取个人id，如果是自己的课那么就可以进行其他操作
      console.log(this.userId)
    }
}
</script>

<style>
 #mycount{/*大容器*/
          width: 1300px;
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
  #topbox{/* 顶端容器*/
    width: 100%;
    min-height: 288px;
    padding: 25px 0 55px;
    display: flex;
    justify-content: space-around;
  }
  #imgconter{/**图片容器 */
    width: 366px;
    height: 288px;
  }
  #lessoninform{/**课程信息 */
    width: 660px;
  }
  .midbox{/**课程信息中部容器 */
    padding: 4px 19px 16px 16px;
    margin-bottom: 24px;
    background-color: #f8f9fb;
    border-radius: 8px;
    margin-top: 20px;
  }
  .midbox p{/**中部信息段落 */
    color: #666666;
    font-size: 12px;
    padding: 5px 0;
  }
  .midbox span{/**同上 */
    padding-left: 10px;
  }
  .lessonIcon{/**中部信息图标 */
    padding: 0 3px;
  }
  .lessonbtn{/**课程按钮 */
    height: 48px;
    line-height: 15px;
    font-size: 16px;
    margin-top: 28px;
    background-color: #00CC7E;
    border-color: #00CC7E;
    min-width: 192px;
    font-weight: 600;
    border-radius: 24px;
  }
</style>