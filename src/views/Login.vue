<template>
  <div class="login">
    <Header class="login-header"></Header>
    <div class="login-content">
      <div class="login-left">
        <img src="../assets/images/login-reg/login01.jpg" alt />
      </div>
      <div class="login-right">
        <div class="login-form">
          <p>商城登录</p>
          <!-- 条件渲染 -->
          <span class="check-uname" v-if="warn1">用户名不能为空</span>
          <span class="check-uname" v-if="warn11">用户名或密码错误,请检查后重新输入!</span>
          <input
            @focus="reset"
            @blur="checkNull(1)"
            v-model="uname"
            type="text"
            placeholder="手机号/用户名"
          />
          <br />
          <span class="check-upwd" v-if="warn2">密码不能为空</span>
          <input
            @focus="reset"
            @blur="checkNull(2)"
            v-model="upwd"
            type="password"
            placeholder="密码"
          />
          <br />
          <div class="remember">
            <!-- 默认不选即:checked:false 作用1:控制登录按钮不可点击,作用2:控制样式 -->
            <el-checkbox class="test" v-model="remember">记住我(请在私人设备上使用此功能)</el-checkbox>
          </div>
          <div class="line"></div>
          <button @click="login" :disabled="remember == false" :class="{ active: remember }">登录</button>
          <button>注册</button>
          <br />
          <a href>忘记密码?&nbsp;点击这里找回</a>
          <div class="login-explain">
            <p>用户登录说明</p>
            <span>1. 演示用户名: admin(18530969220), 密码: 123456</span>
            <br />
            <span>2. 商城不可注册，实际使用需单独购买短信资源包</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "Login",
  components: {},

  // 1-声明变量
  data() {
    return {
      uname: "",
      upwd: "",
      warn1: false,
      warn11: false,
      warn2: false,
      warn21: false,
      remember: false // CheckBox变量值  控制登录按钮是否可点击 and 登录按钮样式
    };
  },
  // 2-声明方法
  methods: {
    // 检查用户名或密码是否为空
    checkNull(n) {
      if (n == 1) {
        if (!this.uname) {
          this.warn1 = true;
        } else {
          this.warn1 = false;
        }
      } else if (n == 2) {
        if (!this.upwd) {
          this.warn2 = true;
        } else {
          this.warn2 = false;
        }
      }
    },
    // 重新隐藏-用户名或密码错误-提示
    reset() {
      this.warn11 = false;
    },
    login() {
      // button点击效果
      // this.checked = false;
      // setTimeout(() => {
      //   this.checked = true;
      // }, 200);

      // let url = "/user/login";
      // let data = { uname: this.uname, upwd: this.upwd };
      // let config = {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      //   }
      // };

      // 检查用户名和密码是否为空,都不为空时发送登录请求
      if (this.uname && this.upwd) {
        // 可解析嵌套对象
        // let string = "foo[bar]=baz";
        // console.log(qs.parse(string));
        this.$http({
          method: "post",
          url: "/user/login",
          data: { uname: this.uname, upwd: this.upwd }
        })
          // .post(url, data, config) // 这是第二种写法(别名)
          .then(res => {
            if (res.data.code == 401) {
              this.warn11 = true;
            } else if (res.data.code == 201) {
              // sessionStorage.setItem("uid", res.data.data.uid);
              // sessionStorage.setItem("uname", res.data.data.uname);
              // console.log(sessionStorage);

              // 使用Token代替session
              if (this.remember) {
                // 存入localStorage中同时也会存入sessionStorage中吗????????????
                localStorage.setItem("token", res.data.token);
                // 登录状态管理
                sessionStorage.setItem("uname", res.data.data.uname);
                sessionStorage.setItem("uid", res.data.data.uid);
              } else {
                sessionStorage.setItem("token", res.data.token);
                // 登录状态管理
                sessionStorage.setItem("uname", res.data.data.uname);
                sessionStorage.setItem("uid", res.data.data.uid);
              }
              // alert() 阻塞js   ???????????????????????????????
              // alert("登录成功");
              //登录成功跳转
              this.$router.push("/"); // 到主页
              // 刷新页面更新登录状态
              location.reload();
              // console.log(this.$store.state.islogin);
              // this.$router.go(-1); // 到上一页
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
@import "../css/Login.css";
</style>
