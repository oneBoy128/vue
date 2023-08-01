<template>
    <div id="conter">
      <div id="view" v-loading="loading">
        <el-empty v-show="isEmpty" description="课程为空，快去发表你的第一个作品吧"></el-empty>
        <el-row :gutter="16">
            <el-col v-on:click.native="golesson(item)" class="elCol" :span="6" v-for="(item, index) in suclesson" :key="index">
                <el-card :body-style="{ padding: '3px' }" class="box-card">
                    <el-image :src="item.imageUrl" style="height: 134px;width: 100%;" lazy></el-image>
                </el-card>
                <span>{{item.name}}</span>
            </el-col>
        </el-row>
        </div>
    </div>
  </template>
  
  <script>
  function deepCopy(obj, visited = new WeakMap()) {
        // 如果是基本数据类型或null，则直接返回
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
            // 检查是否已经访问过该对象，避免循环引用导致的无限递归
        if (visited.has(obj)) {
            return visited.get(obj);
        }
        let copiedObj = Array.isArray(obj) ? [] : {};
        visited.set(obj, copiedObj); // 记录访问过的对象
        // 使用递归深拷贝对象的属性或数组的元素
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                copiedObj[key] = deepCopy(obj[key], visited);
            }
        }
            return copiedObj;
    }

import axios from 'axios';
  export default {
      name:'SuccessDing',
      data() {
          return {
              suclesson:[],
              loading:true,
              //dialogFormVisible:false,
              choselessons:{},
          }
      },
      methods:{

        handleEdit(row) {//查看详情
            this.choselessons = deepCopy(row);
            this.row = row;
            this.dialogFormVisible = true;
        },
          //修改时间格式
        formatDate(row) {
            const dateStr = row.updateTime; // 获取日期字符串，例如 "2023-07-28T08:39:21.000+00:00"
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}年${month}月${day}日`;
        },
        golesson(item){
            this.choselessons = item
            this.$store.state.chosenlesson = item;
            console.log('choselesson',this.choselessons)
            localStorage.setItem('choselesson',JSON.stringify(this.choselessons))
            this.$router.push({
                name: 'WebLesson',
                query: { dataKey: this.choselessons },
            })
        }
      },
      computed:{
          isEmpty(){
              if(this.suclesson.length == 0){
                  return true
              }
              return false
          }
      },
      mounted() {
          setTimeout(() => {
            axios({
                method:'get',
                url:'http://localhost:8081/course/getCourse1?userId='+JSON.parse(localStorage.getItem('users')).id,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(resp=>{
                this.suclesson = resp.data.data
            }).catch(err=>{
                console.log('失败：',err)
            })
              setTimeout(() => {
                  this.loading = false;
              }, 300);
          }, 200);
      },
  }
  </script>
  
  <style scoped>
  .box-card img{
        width: 100%;
        height: 100%;
    }
    .elCol{
        position: relative; /* 使用相对定位 */
        text-align: center;
        margin-bottom: 80px; 
        height: 150px;
        transition: transform 0.2s;
        z-index: 1;
    }
    .elCol:hover{
        transform: scale(1.3);
        cursor: pointer;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
        z-index: 5;
    }
  </style>