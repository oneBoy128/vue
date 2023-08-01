import VueRouter from "vue-router";
import Home from '../pages/zhuye/Home.vue';
import MyCount from '../pages/user/MyCount.vue'
import MyInfrom from '../components/user/MyCount/MyInform.vue'
import MyFix from '../components/user/MyCount/MyFix.vue'
import Login from '../pages/user/Login.vue'
import YeMian from '../pages/zhuye/YeMian.vue'
import Register from '../pages/user/Register.vue'
import FixPass from '../components/user/MyCount/FixPass.vue'
import AdminStudent from '../pages/admin/AdminStudent.vue'
import AdminTeacher from '../pages/admin/AdminTeacher.vue'
import MyTest from '../pages/MyTest.vue'
import AdminLesson from '../pages/admin/AdminLesson.vue'
import TeacherLesson from '../pages/teacher/TeacherLesson.vue'
import TeacherLessonSuc from '../components/teacher/lessson/TeacherLessonSuc.vue'
import TeacherLessonNorm from '../components/teacher/lessson/TeacherLessonNorm.vue'
import TeacherLessonFail from '../components/teacher/lessson/TeacherLessonFail.vue'
import TeacherLessonDis from '../components/teacher/lessson/TeacherLessonDis.vue'
import AddLesson from '../pages/teacher/AddLesson.vue'
import WebLesson from '../pages/lesson/WebLesson.vue'


const router = new VueRouter({
    routes:[
        {
            path:'/',
            meta:{isAuth:true},
            component:Home,
            redirect:'/yemian',
            children:[
                {   
                    //这是param参数的接受要求，首先要申明name然后在path上用：进行占位操作
                    path:'mycount',
                    name:'Login',
                    meta:{isAuth:true,requiresAuth: true},
                    component: MyCount,
                    //可在params参数的传递中直接配置props进行参数的简化，后继可以直接props接受使用
                    props:true,
                    children:[
                        {
                            path: 'myinform',
                            component: MyInfrom
                        },
                        {
                            path:'myfix',
                            component:MyFix
                        },
                        {
                            path:'fixpass',
                            component:FixPass
                        },
                        {
                            path:'adminstudent',
                            component: AdminStudent
                        },
                        {
                            path:'adminteacher',
                            component: AdminTeacher
                        },
                        {
                            path:'adminlesson',
                            component: AdminLesson,
                        },
                        {
                            path:'teacherlesson',
                            component: TeacherLesson,
                            children:[
                                {
                                    path:'success',
                                    component: TeacherLessonSuc,
                                },
                                {
                                    path:'normal',
                                    component:TeacherLessonNorm
                                },
                                {
                                    path:'fail',
                                    component: TeacherLessonFail
                                },
                                {
                                    path:'dis',
                                    component:TeacherLessonDis
                                },
                            ]
                        },
                        {
                            path:'addlesson',
                            component: AddLesson
                        }
                    ]
                },
                {
                    path:'yemian',
                    component:YeMian,
                    meta:{isAuth:true}
                },
                {
                    path:'weblesson',
                    name:"WebLesson",
                    component: WebLesson
                }
            ]
        },
        {
            path:'/login',
            name:'login',
            component:Login
        },
        {
            path:'/register',
            name:'register',
            component:Register
        },
        {
            path:'/test',
            name:'test',
            component:MyTest
        }
    ],
})

router.beforeEach((to, from, next) => {
    // 让页面回到顶部
    if(to.meta.isAuthenticated){
        const isOnline = localStorage.getItem("isOnline")
        if(isOnline){
            document.documentElement.scrollTop = 0;
            next()
        }else{
            if(confirm('该功能需要登陆，你要登陆吗？')) router.push({path:'/login'})
        }
    }else{
        if(to.meta.isAuth){
            document.documentElement.scrollTop = 0;
        }
        next()
    }
});


export default router