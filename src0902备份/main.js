// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/global.css'
import axios from 'axios'
/*import '../static/css/animate.min.css'*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/*import $ from 'jquery'*/
import Cookies from 'js-cookie'
import echarts from 'echarts'
import 'babel-polyfill'
import promise from 'es6-promise'
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css';
promise.polyfill()
import 'url-search-params-polyfill';

/*import Share from 'social-share'*/
/*import common from '../static/js/common.js'*/

/*import heyui from 'heyui'
require("heyui/themes/index.less")
*/
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.use(Cookies);
Vue.use(Share)
/*Vue.prototype.common = common*/
Vue.prototype.messageOpen = function(msg, type) {
	this.$message({
		message: msg,
		type: type
	});
}
$.getScript("http://cstsai.cstcloud.cn/js/isLogin.do", function(){
  console.log("+++++++++++++++++++++00000000++data.result",data.result)

})

var userJsonStr;
/*userJsonStr={"flag":"1","error":"","userId":"10","token":"c9a59f4b5d44fba52361ec0191dfe8a9","refreshToken":"a981fb24d89f1f754f2226e94d9e0f71","userInfo":{"trueName":"李健","cstnetId":"371246735@qq.com"}}
userJsonStr=JSON.stringify(userJsonStr);*/
if(localStorage.getItem('sessionData')&&localStorage.getItem('sessionData')!='null'){
  console.log("localStorage.getItem('sessionData')++++++++",localStorage.getItem('sessionData'))
  userJsonStr=localStorage.getItem('sessionData')
}
if(sessionStorage.getItem('sessionData')){
  userJsonStr = sessionStorage.getItem('sessionData');
  console.log("sessionStorage.getItem('sessionData')@@@@@@@@",sessionStorage.getItem('sessionData'))
  localStorage.setItem('sessionData',userJsonStr);
  console.log("userJsonStr本地缓存没有",userJsonStr)
}
var userEntity =userJsonStr?JSON.parse(userJsonStr):null;
if(userEntity){
  window.SITE_CONFIG['token'] = userEntity.token;
  Vue.prototype.token = userEntity.token;
  Vue.prototype.userInfo = userEntity.userInfo;
  window.SITE_CONFIG['userId'] = userEntity.userId;
}
console.log("window.SITE_CONFIG['userId']",window.SITE_CONFIG['userId'])
axios.interceptors.response.use(response => {
  if (response.data.code === 401 || response.data.code === 10001) {
    sessionStorage.removeItem("sessionData")
    //跳转登录
     window.location.href='http://cstsai.cstcloud.cn/rossc/web/auth/login'
    return Promise.reject(response.data.msg)
  }
  return response
}, error => {
  console.error(error)
  return Promise.reject(error)
})
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
