// 导入依赖
import Vue from "vue";
import VueRouter from "vue-router";
// 组件引入
import Home from "../views/Home.vue";

// 主要是执行install方法，用来进行全局注册，如果注册过了不会重新注册。
// vue.use()往全局注入一个插件，供全局真接使用, 不需要单独引用。
Vue.use(VueRouter);

// 定义路由
const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	// 懒加载
	{
		path: "/cat",
		name: "Cat",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/Cat.vue"),
	},
	{
		path: "/dog",
		name: "Dog",
		component: () => import("../views/Dog.vue"),
	},
	{
		path: "/stable",
		name: "Stable",
		component: () => import("../views/Stable.vue"),
	},
	{
		path: "/medicine",
		name: "Medicine",
		component: () => import("../views/Medicine.vue"),
	},
	{
		path: "/snacks",
		name: "Snacks",
		component: () => import("../views/Snacks.vue"),
	},
	{
		path: "/commodity",
		name: "Commodity",
		component: () => import("../views/Commodity.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login.vue"),
	},
	{
		path: "/reg",
		name: "Reg",
		component: () => import("../views/Reg.vue"),
	},
	{
		path: "/cart",
		name: "Cart",
		component: () => import("../views/Cart.vue"),
	},
];
// 创建router实例，然后传 `routes` 配置
const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router; // 导出路由器
