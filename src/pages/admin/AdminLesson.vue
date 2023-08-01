<template>
    <div id="conter">
            <div id="view" v-loading="loading">
                <el-table
                :data="Lessons"
                style="width: 100%">
                    <el-table-column
                        prop="username"
                        label="用户名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="待审核课程"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="所需坤分">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="发布时间"
                        :formatter="formatDate">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-link
                            size="mini"
                            style="color: #E69138;"
                            @click="handleEdit(scope.row,0)" round>查看详情</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="审核">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.row,1)" round>通过</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleEdit(scope.row,2)" round>不通过</el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <!-- 修改课程信息-->
            <el-dialog title="课程信息" :visible.sync="dialogFormVisible">
                <LessonInform :dataObj="choselessons"></LessonInform>
            </el-dialog>
        </div>
    </div>
  </template>
  

  <script>
import LessonInform from '@/components/admin/lesson/LessonInform.vue';
  //深拷贝数据--------------------------------------------------------------------
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

    //vue----------------------------------------------------------------------------------------------------------------------------
    export default {
      name:'AminLesson',
      data() {
        return {
          loading:true,
          search: '',
          lessons:[],
          dialogFormVisible:false,
          formLabelWidth: '120px',
          choselessons:{},
          row:{},
        }
      },
      methods:{
        //查看详情
        handleEdit(row,value) {
            this.choselessons = deepCopy(row);
            this.row = row;
            let obj = {
                courseId: this.choselessons.courseId,
                checked: value
            }
            if(value != 0){
                this.$confirm('此操作将更改课程状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('AdminLessons',obj)
                    setTimeout(()=>{
                        this.$store.dispatch('AllLessonAdmin')
                        setTimeout(()=>{
                            this.lessons = this.$store.state.lessons;
                        },200)
                    },500)
                    this.$message({
                        type: 'success',
                        message: '审核成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '审核取消'
                    });          
                });
            }else{
                this.dialogFormVisible = true;
            }
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

      },
      computed:{
        Lessons(){
            this.lessons.forEach(item=>{
                if(item.statu == 1){
                    item.statu = true
                }else{
                    item.statu = false
                }
            })
                return this.lessons
            },
        },
        components:{
            LessonInform
        },
      mounted() {
        setTimeout(() => {
            this.$store.dispatch('AllLessonAdmin');
            setTimeout(() => {
                this.lessons = this.$store.state.lessons;
                this.loading = false
            }, 800);
        }, 200);
    },
    }
  </script>