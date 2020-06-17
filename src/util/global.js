// 如果session中有uid,则认为用户已登录
var isLogin =
	sessionStorage.getItem("token") || localStorage.getItem("token")
		? true
		: false;
var uname = sessionStorage.getItem("uname");
var uid = sessionStorage.getItem("uid");

const siteName = "petShop"; //站点名称

export default {
	isLogin,
	uname,
	siteName,
	uid,
};
