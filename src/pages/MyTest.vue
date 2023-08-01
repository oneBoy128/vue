<template>
    <div id="Imgconter">
        <div id="imgConter">
            <!-- 显示上传的头像 -->
            <img v-if="previewImage" :src="previewImage" alt="上传的头像" style="width: 100%;"/>
        </div>
        <div id="buttonConter">
            <input type="file" id="avatarInput" @change="handleFileChange">
            <button @click="uploadAvatar">上传头像</button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'MyTest',
    data() {
      return {
        previewImage:  JSON.parse(localStorage.getItem('users')).imageUrl, // 用于存储要上传的头像文件的URL(未上传)
        URL:null,
        name: JSON.parse(localStorage.getItem('users')).username  //获取username
      };
    },
    methods: {
        uploadAvatar() {
            var avatarInput = document.getElementById('avatarInput');
            var file = avatarInput.files[0];

            var formData = new FormData();
            formData.append('avatar', file);

            //上传图片的接口
            this.$store.dispatch("uploadImg",formData);

            setTimeout(()=>{
                if(this.$store.state.ImgCode == 0){
                    this.URL = this.$store.state.IMGURL
                    let obj = {
                        username:this.name,
                        url:this.URL
                    }
                   this.$store.dispatch('changeUserImg',obj)
                }
            },1000)

        },
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
    },
  };
  </script>

  <style scoped>
    #imgConter{
        position: relative;
        width: 250px;
        height: 250px;
        overflow: hidden;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    #Imgconter{
        height: 350px;
    }
    #buttonConter{
        position: relative;
        left: 0;
        right: 0;
        margin: 0 auto;
        margin-top: 40px;
        width: 337px;
    }
  </style>