import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Book from '../views/Book.vue'
import Blog from '../views/Blog.vue'
import Video from '../views/Video.vue'
import User from '../views/User.vue'
import Resources from '../views/Resources.vue'
import AddBlog from '../views/AddBlog.vue'
import PutBlog from '../views/PutBlog.vue'
import Statistics from '../views/Statistics.vue'
import Chapter from '../views/Chapter.vue'
import Sections from '../views/Sections.vue'
import SectionContent from '../views/SectionContent'
import VideoList from '../views/VideoList'
import '../assets/fonts/fonts/iconfont.css'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect:'/home/statistics',
    children:[
      {path:'statistics',component:Statistics},
      {path:'book',component:Book},
      {path:'blog',component:Blog},
      {path:'video',component:Video},
      {path:'user',component:User},
      {path:'resources',component:Resources},
      {path:'addblog',component:AddBlog},
      {path:`putblog/:id`,component:PutBlog},
      {path:`chapter/:id`,component:Chapter},
      {path:'sections/:id',name:'sections',component:Sections,},
      {path:'sectionContent/:id/chapter/:chapter_id',name:'sectionContent',component:SectionContent},
      {path:`videoList/:id`,name:'videoList',component:VideoList},
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next();
  }
  const token = sessionStorage.getItem('token');
  if(token){
    next()
  }else{
    next('/login')
  }
})

export default router
