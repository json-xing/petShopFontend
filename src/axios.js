const qs = require("qs");
const axios = require("axios");
// const store = require('store')
import store from "./store/index";

// axios请求基本配置
const Axios = axios.create({
	baseURL: "http://127.0.0.1:9090/",
	withCredentials: true,
});
// 请求拦截器
Axios.interceptors.request.use(
	(config) => {
		// console.log("进入请求拦截器...");
		// post请求默认将数据转为json,所以需要用qs把数据url序列化  // 需要与后端搭配body-parser解析
		if (config.method === "post") {
			config.data = qs.stringify(config.data);
			config.headers = {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			};
		}
		if (localStorage.getItem("token")) {
			config.headers.token = localStorage.getItem("token");
		}
		if (sessionStorage.getItem("token")) {
			config.headers.token = sessionStorage.getItem("token");
		}
		return config;
	},
	(error) => {
		console.log("===发送请求拦截器报错===");
		console.log(error);
		console.log("===end===");
		Promise.reject(error);
	}
);
// 响应拦截器
Axios.interceptors.response.use(
	(res) => {
		// console.log("触发响应拦截器...");
		// question: 长时间不登录(超时)刷新页面,变为未登录状态  未实现
		if (res.data.status == 403) {
			localStorage.removeItem("token");
			sessionStorage.removeItem("token");
			// 设置vuex保存的登录状态变量值为false
			store.commit("setIslogin", false);
			store.commit("setUname", "");
		} else if (res.data.code == -1) {
			store.commit("setIslogin", false);
			store.commit("setUname", "");
			//alert(res.data.msg+" 请先登录 !");
		} else if (res.data.token) {
			// 设置登录状态(vuex不适合保存登录状态??? 因为vuex中数据是存放在内存中的,刷新页面数据会重置)
			store.commit("setUname", res.data.data.uname); // vuex中
			store.commit("setUid", res.data.data.uid); // vuex中
			store.commit("setIslogin", true);

			// 放入login.vue中处理
			// if (res.remember === "true") {
			// 	localStorage.setItem("token", res.data.token); // 存储在localStorage中
			// } else {
			// 	sessionStorage.setItem("token", res.data.token); // 存储在sessionStorage中
			// }
		}
		return res;
	},
	(error) => {}
);
export default {
	install: function(Vue, Option) {
		Vue.prototype.$http = Axios; //添加到vue中
	},
};
