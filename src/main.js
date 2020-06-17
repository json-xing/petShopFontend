import Vue from "vue";
import App from "./App.vue";

import router from "./router/index"; // 引入路由器
import store from "./store";
import axios from "./axios.js";

// 使用第三方UI库
// 1: 安装依赖  npm i element-ui -s
// 2: 导入组件库  和  相关样式
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 3: 配置Vue组件
Vue.use(ElementUI);

// 全局引入normalize.css
import "normalize.css";

// 全局!!!注册组件
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
Vue.component("Header", Header);
Vue.component("Footer", Footer);

// 引入axios,并声明为Vue实例的$http属性
/*
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:9090";
axios.defaults.withCredentials = true; // 让xhr发起异步请求时,默认携带身份认证信息(cookie:sid)
axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.prototype.$http = axios; // 把axios声明为Vue实例的$http属性
*/
// 使用token方式:封装axios.js替代上述
Vue.use(axios);

// 配置全局使用的变量
import global_config from "./util/global";
Vue.prototype.$global = global_config;
// 使用示例:this.$global

// 跨域cros

Vue.config.productionTip = false;

new Vue({
	// 通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由： Q?
	router, // 通过 router 配置参数注入路由 从而让整个应用都有路由功能  即:在任何地方都可以this.$router.push('/...')
	store,
	render: (h) => h(App),
}).$mount("#app");
