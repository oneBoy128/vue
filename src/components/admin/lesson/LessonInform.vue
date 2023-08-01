<template>
    <div id="lessonConter">
        <div id="lessoninform">
            <div>
                <img :src="dataObj.imageUrl" style="width: 80%;max-height: 400px;">
                <div>
                <p class="para"><i class="el-icon-info lessonIcon" ></i><b>课程ID: </b><span>{{dataObj.courseId}}</span></p>
                <p class="para"><i class="el-icon-notebook-2 lessonIcon"></i><b>课程名称:</b> <span>{{dataObj.name}}</span></p>
                <p class="para"><i class="el-icon-alarm-clock lessonIcon" ></i><b>更新时间: </b><span>{{formatDate(dataObj.updateTime)}}</span></p>
                <p class="para"><i class="el-icon-s-finance lessonIcon" ></i><b>所需坤分: </b><span>{{dataObj.price}}分</span></p>
                <p class="para"><i class="el-icon-user lessonIcon"></i><b>任课教师: </b><span>{{dataObj.author}}</span></p>
                <p class="para"><i class="el-icon-reading lessonIcon"></i><b>课程描述: </b><span>{{dataObj.description}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'LessonInform',
    props:{
        dataObj:{
            type: Object,
            required: true,
        },
    },
    data(){
        return{
        }
    },
    methods:{
        //修改时间格式
        formatDate(row) {
            const dateStr = row; // 获取日期字符串，例如 "2023-07-28T08:39:21.000+00:00"
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}年${month}月${day}日`;
        },
    },
    computed:{
    },
}
</script>

<style scoped>
    #lessonConter{/*总容器 */
        width: 100%;
        height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
        margin: 0;
    }
    #lessoninform{/*课程容器 */
        overflow-wrap: break-word;
    }
    .lessonIcon{/*课程字体图标*/
        margin-right: 10px;
        color: #555;
    }
    .para{/*段落 */
        margin-top: 30px;
        width: 692px;
        margin-bottom: 10px;
        display: flex;
        font-size: 14px;
        color: #606266;
    }
    .para span{
        margin-left: 7px;
        display: block;
        width: 600px;
    }
    #imgConter{/*图片容器 */
        width: 100%;
        margin-bottom: 100px;
    }
</style>

