<template>
    <div id="conter">
            <div id="view" v-loading="loading">
                <el-table
                :data="Students"
                style="width: 100%">
                    <el-table-column
                        prop="username"
                        label="用户名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="电话">
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <el-switch
                            v-model="scope.row.statu"
                            @change="changeStatu(scope.row)"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="启用"
                            inactive-text="冻结"
                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                </el-table-column>
            </el-table>
            <!--修改学生信息-->
            <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="chosestudent">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="chosestudent.username" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="chosestudent.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="chosestudent.email" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="userChange">确 定</el-button>
            </div>
            </el-dialog>
        </div>
    </div>
  </template>
  

  <script>
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
      name:'AdminStudent',
      data() {
        return {
          loading:true,
          search: '',
          students:[],
          dialogFormVisible:false,
          formLabelWidth: '120px',
          chosestudent:{},
          row:{},
        }
      },
      methods:{
        handleEdit(row) {
            this.dialogFormVisible = true;
            this.chosestudent = deepCopy(row);
            this.row = row;
        },
        //修改用户信息
        userChange(){
            this.dialogFormVisible = false;
            this.row.username = this.chosestudent.username
            this.row.phone = this.chosestudent.phone
            this.row.email = this.chosestudent.email
            this.$store.dispatch("changeUserAdmin",this.chosestudent)
            setTimeout(()=>{
                if(this.$store.state.code == 2003){
                this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success',
                    position: 'bottom-right'
                    });
                }else{
                    this.$notify.error({
                        title: '错误',
                        message: '修改失败',
                        position: 'bottom-right'
                    });
                }
                },500)
        },
        handleDelete(row) {
            console.log(row);
        },
        changeStatu(row){
            this.chosestudent = deepCopy(row);
            if(row.statu == true){
                this.chosestudent.statu = 1;
            }else{
                this.chosestudent.statu = 0;
            } 
            this.$store.dispatch("ChangeState",this.chosestudent);
        }
      },
      computed:{
        Students(){
            this.students.forEach(item=>{
                if(item.statu == 1){
                    item.statu = true
                }else{
                    item.statu = false
                }
            })
                return this.students
            },
        },
      mounted() {
        setTimeout(() => {
            this.$store.dispatch('AllStudents');
            setTimeout(() => {
                this.students = this.$store.state.students;
                this.loading = false
            }, 800);
        }, 200);
    },
    }
  </script>