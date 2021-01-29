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
import {Passport} from  './utils/checkLogin'
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
/*
var option={
  umtUrl:'http://passport.escience.cn', //umt的地址，必填
  viewPort:$("#testDiv"),						//显示message的地方，可不填
  message:'登录',					//提示信息的内容，可不填
  loginclass:'登录'
}
var newOption={
  target:'none',   //无作用
  appname:'dct', //应用名称
  theme:'ddl'	   //如果在umt里面有定制版，
}
var  passport= new Passport(option)
console.log("passport",passport)
var newPassport= passport.checkAndLogin("http://cstsai.cstcloud.cn/rossc/web/auth/login",newOption)

console.log("passport00",newPassport)*/
var userJsonStr = sessionStorage.getItem('sessionData');
var userEntity = JSON.parse(userJsonStr);

if(userEntity){
Vue.prototype.token = userEntity.token;
Vue.prototype.userInfo = userEntity.userInfo;
Vue.prototype.userId = userEntity.userId;
}


console.log("userEntity", userEntity); // => tom
//获取个人信息
/*window.addEventListener('message', function(e)
	{

		console.log("个人信息数据", e.origin, e.data)
		console.log("个人信息数据新的",e.data)
		var newData=JSON.parse(e.data)
		console.log("newData",newData)
		Vue.prototype.token=newData.token;
		Vue.prototype.userInfo=newData.userInfo;
		Vue.prototype.userId=newData.userId;



	}
)*/

 Vue.prototype.token = "84d429e78ebb758b7c18bfd20a5fd3ee";
Vue.prototype.userId = 10;
Vue.prototype.userName = "temporary";
Vue.prototype.userInfo = {
			trueName:'索1隆',
			cstnetId:'371246735@qq.com'
}

/*Vue.prototype.token = "";
Vue.prototype.userId = '';*/
/*Vue.use(heyui)
 */
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
