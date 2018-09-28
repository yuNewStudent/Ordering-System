// import Vue from 'vue'
// import Router from 'vue-router'
// import Header from '@/components/Header'
import Admin from '@/components/Admin'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Rigister from '@/components/Rigister'
import Menu from '@/components/Menu'
import About from '@/components/About/About'
import error from '@/components/error'

import Contact from '@/components/about/Contact'
import Deliver from '@/components/about/Deliver'
import History from '@/components/about/History'
import orderingGuide from '@/components/about/orderingGuide'

// Vue.use(Router)

export default [
    {path: '/',name: 'Home',components: {
    	default:Home,
    	'orderingGuide':orderingGuide,
    	'deliver':Deliver,
    	'history':History
    }},
    {path: '/Admin',name: 'Admin',component: Admin},
    {path: '/Login',name: 'Login',component: Login},
    {path: '/Menu',name: 'Menu',component: Menu
  //    ,beforeEnter:(to,from,next)=>{
  //   	//路由独享守卫
  // //   	alert("非登录用户，不能进页面");
  // //   	next(false);
  // //   	//判断store.gettes.isLogin == false;
		// // if (to.path=="/Login"||to.path=="/Rigister") {
		// // 	next();
		// // }else{
		// // 	alert("您还没有登录，请先登录");
		// // 	next("/Login");
		// // }
  //    }
    },
    {path: '/About',name: 'About',redirect: '/about/Contact',component: About,children:[
        {path: '/about/Contact',name: 'contact-link',component: Contact},
        {path: '/about/Deliver',name: 'deliver-link',component: Deliver},
        {path: '/about/History',name: 'history-link',component: History},
        {path: '/about/orderingGuide',name: 'orderingGuide-link',component: orderingGuide}
    ]},
    {path: '/Rigister',name: 'Rigister',component: Rigister},
    
    // 当路由错误时跳转至提示错误页面
    {path: '/error',name: 'error',component: error},
    {path: '*',redirect: '/error'}

  ]
