<template>
  <!--添加课程-->
  <div id="conter">
    <div id="view">
      <header class="page-header">
        <h1 class="page-title">添加你的课程</h1>
      </header>
      <div id="toppage"><!--顶端容器-->
        <div id="imgconter">
          <div id="imgConter">
            <el-empty v-show="isEmpty" description="请上传图片" style="width: 90%;height: 95%;"></el-empty>
            <!-- 显示上传的头像 -->
            <img v-if="previewImage" :src="previewImage" alt="上传的头像" style="width: 90%;height: 95%;" />
          </div>
          <div id="buttonConter">
            <input type="file" id="avatarInput" @change="handleFileChange">
          </div>
        </div>
        <div id="formConter">
          <el-input placeholder="课程名" v-model="lesson.name">
            <template slot="prepend"><i class="el-icon-edit"></i></template>
          </el-input>
          <el-input placeholder="作者" v-model="lesson.author">
            <template slot="prepend"><i class="el-icon-user"></i></template>
          </el-input>
          <el-input placeholder="所需坤分" v-model="lesson.price">
            <template slot="prepend"><i class="el-icon-s-finance"></i></template>
          </el-input>
          <el-select v-model="selectedSubjectType" placeholder="请选择课程类型">
          <el-option-group
            v-for="(subjects, subjectType) in subjectData"
            :key="subjectType"
            :label="subjectType"
            v-on:click.native="toggleSubjects(subjectType)"
          >
            <el-option
              v-for="subject in subjects"
              class="suboption"
              :key="subject"
              :label="subject"
              :value="subject"
              v-show="isSubjectExpanded(subjectType)"
            />
          </el-option-group>
        </el-select>
                
          <el-input type="textarea" :rows="4" :resize="'none'" placeholder="请输入课程描述"
            v-model="lesson.description"
            maxlength="200"
            show-word-limit
            style="font-size: 18px;"
            >
          </el-input>
        </div>
      </div>
      <el-button type="primary" id="bottombtn" @click="submitLesson">提交</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "AddLesson",
  data() {
    return {
      previewImage: null, // 用于存储要上传的头像文件的URL(未上传)
      URL: null,
      selectedSubjectType: null,
      selectedSubject: null,
      subjectData: {}, // 用于存储后端返回的学科信息
      expandedSubjects: [], // 用于记录展开的一级标题
      lesson: {
        userId: JSON.parse(localStorage.getItem('users')).id,
        name: null,
        author: null,
        price: null,
        description: null,
        subName: null,
        imageUrl: null
      }
    }
  },
  methods: {
    handleFileChange(event) {
      const fileInput = event.target;
      const selectedFile = fileInput.files[0];

      // 检查文件大小是否符合限制（以字节为单位）
      const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
      //检查是否选择文件  
      if (selectedFile) {
        if (selectedFile.size > maxSizeBytes) {
          alert("上传的文件大小超过限制，请选择小于5MB的文件。");
          fileInput.value = ""; // 清空文件输入框，阻止上传
          return;
        }
        // 使用 FileReader 读取文件内容并转换为数据 URL
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result; // 将数据 URL 设置为预览图片的 src
        };
        reader.readAsDataURL(selectedFile);
      } else {
        this.previewImage = null; // 清除预览图片
      }
    },
    toggleSubjects(subjectType) {
      // 切换展开状态
      if (this.expandedSubjects.includes(subjectType)) {
        this.expandedSubjects = this.expandedSubjects.filter((subject) => subject !== subjectType);
      } else {
        this.expandedSubjects.push(subjectType);
      }
    },
    isSubjectExpanded(subjectType) {
      // 检查一级标题是否展开
      return this.expandedSubjects.includes(subjectType);
    },
    fetchData() {//用户点击slect会触发
      //使用 axios 发送 GET 请求获取所有课程数据
      axios({
        method: 'get',
        url: 'http://localhost:8081/subject/getAll',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(resp => {
        this.subjectData = resp.data.data;
      })
    },
    submitLesson() {
      // 检查lesson对象是否有空值
      var avatarInput = document.getElementById('avatarInput');
      var file = avatarInput.files[0];

      var formData = new FormData();
      formData.append('avatar', file);

      //上传图片的接口
      if(avatarInput != null){
        this.$store.dispatch("uploadImgNormal",formData);
      }
      setTimeout(() => {
        this.lesson.imageUrl = this.$store.state.IMGURL
        this.lesson.subName = this.selectedSubjectType
        const values = Object.values(this.lesson);
        for (const value of values) {
          if (value === null) {
            // 有空值，弹出提示
            this.$message.error('缺少对应的信息，请填写完整！');
            return;
          }
        }
        console.log(this.lesson)
        // 使用axios发送POST请求将lesson对象数据提交到后端接口
        axios({
          method: 'post',
          url: 'http://localhost:8081/course/addCourse',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          data:JSON.stringify(this.lesson),
        })
          .then(() => {
            this.$message.success('成功提交课程！');
            // 这里可以进行其他逻辑处理，比如跳转到其他页面或清空表单等操作
            this.$router.replace('/mycount/teacherLesson/normal')

          })
          .catch(() => {
            // 请求失败后的处理逻辑
            this.$message.error('网络有问题了！');
          });
      }, 1000);
    },
  },
  
  computed: {
    isEmpty() {
      if (this.previewImage == null) return true;
      return false
    },
    getSelectedSubjects() {
      const selectedItem = this.majorData.find((item) => item.lesson.subName === this.selectedSubjectType);
      return selectedItem ? selectedItem.major.selectedSubject : [];
    },
  },
  mounted() {
    // 在组件挂载后获取所有课程数据
    this.fetchData('');
  },
}
</script>

<style scoped>
#imgConter {
  width: 450px;
  height: 450px;
  overflow: hidden;
}

#toppage {
  width: 100%;
  display: flex;
}

#formConter{
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 473px;
}
.page-header {/*标题*/
  background-color: #CCCCCC;
  padding: 20px;
  text-align: center;
  color: #ffffff;
  height: 34px; /* 调整标题块的高度 */
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title {/*标题*/
  font-size: 36px;
  margin: 0;
}
#bottombtn{/*底部按钮*/
  display: block;
  position: relative;
  width: 204px;
  left: 0;
  right: 0;
  top: 40px;
  margin: 0 auto;
}
.suboption:hover{
  cursor: pointer;
}
</style>