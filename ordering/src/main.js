// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routes from './router'
import axios from 'axios'

import {store} from "./store/store.js"

Vue.config.productionTip = false
Vue.use(VueRouter);


//配置axios

axios.defaults.baseURL="https://wd7405543724encldq.wilddogio.com/"

//配置VueRouter
const router=new VueRouter({
	routes:Routes,
	mode:"history",

	//滑动设置，savedPosition只有用浏览器前进或后退才生效
	scrollBehavior:function(to,from,savedPosition){
		if (savedPosition) {
			console.log(savedPosition)
			return savedPosition
		}else{
	        return {
	        	// x:0,
	        	// y:200
	        	// selector:".btn"
	        }
        }
	}
})


// 全局守卫
//刚进入页面时只能登陆或注册
router.beforeEach(function(to,from,next){
	//判断
	if (store.getters.isLogin == false) {
		if (to.path=="/Login"||to.path=="/Rigister") {
		    next();
		}else{
			alert("您还没有登录，请先登录");
			next("/Login");
		}
	}else{
		next()
	}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
