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
var userJsonStr = sessionStorage.getItem('sessionData');
var userEntity = JSON.parse(userJsonStr);
if(userEntity){
Vue.prototype.token = userEntity.token;
Vue.prototype.userInfo = userEntity.userInfo;
  window.SITE_CONFIG['userId'] = userEntity.userId;
}
console.log("userEntity", userEntity); // => tom
 Vue.prototype.token = "1b5d13b4ac79fada76b39de9c0a85006";
window.SITE_CONFIG['userId'] = 1;
Vue.prototype.userName = "temporary";
Vue.prototype.userInfo = {
			trueName:'索隆',
			cstnetId:'3852555555@qq.com'
}
$.getScript("http://passport.escience.cn/js/isLogin.do", function(){
  window.SITE_CONFIG['sessionIsTrue'] = data.result;
  console.log(" window.SITE_CONFIG['sessionIsTrue']", window.SITE_CONFIG['sessionIsTrue'])
  if(!sessionStorage.getItem('ifLocation')&&window.SITE_CONFIG['sessionIsTrue']){
    window.location.href='http://cstsai.cstcloud.cn/rossc/web/auth/login'
    sessionStorage.setItem('ifLocation',true)
  }
  sessionStorage.setItem('ifLocation',true)
  if(sessionStorage.getItem('ifLocation')&&!window.SITE_CONFIG['sessionIsTrue']){
    console.log("已经退出了")
    window.SITE_CONFIG['userId']=null
    sessionStorage.clear()
  }
})
axios.interceptors.response.use(response => {
  if (response.data.code === 401 || response.data.code === 10001) {
    sessionStorage.removeItem("sessionData")
    //跳转登录
    window.location.href = window.SITE_CONFIG['apiURL'] + '/haoweb/web/auth/login'
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
