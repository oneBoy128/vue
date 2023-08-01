<!-- 用户的历史订单 -->
<template>
    <div style="margin-top:20px">
        <div id="conters" style="height:39px;">
            <div class="titlebtn" @click="changeView"><router-link id="active"  class="links" to="/mycount/teacherLesson/success">已上架</router-link></div>
            <div class="titlebtn" @click="changeView"><router-link class="links" to="/mycount/teacherLesson/normal">审核中</router-link></div>
            <div class="titlebtn" @click="changeView"><router-link class="links" to="/mycount/teacherLesson/fail">审核未通过</router-link></div>
            <div class="titlebtn" @click="changeView"><router-link class="links" to="/mycount/teacherLesson/dis">已下架</router-link></div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>


export default {
    name:'TeacherLesson',
    data() {
        return {
            
        }
    },
    methods: {
        //更改超链接的样式视觉
        changeView(value){
            let buts = document.querySelectorAll('.links')
            buts.forEach(item=>item.id = '')
            value.target.id = 'active'
        },
    },
}
</script>

<style scoped>
    .links{
        transition: 1s;
        margin-right: 178px;
        line-height: 37px;
        font-size: 18px;
        color: #666;
        text-align: center;
    }
    #active{
        transition: 1s;
        line-height: 37px;
        background-color: #ffffff;
        font-size: 18px;
        color: #409EFF;
        text-align: center;
    }
    #conters{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .titlebtn:hover{
        animation: headShake; /* referring directly to the animation's @keyframe declaration */
        animation-duration: 800ms;
    }
</style>