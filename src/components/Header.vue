<template>
  <div id="header">
    <!-- top-bar -->
    <div class="top-bar">
      <div class="top-left">欢迎访问宠物用品商城</div>
      <div class="top-right">
        <!-- user-center -->
        <div class="welcome">
          <!-- 条件渲染 -->
          <div v-if="!this.$global.isLogin">
            <router-link class="router-link" to="/login">
              <i class="el-icon-user-solid"></i> 登录
            </router-link>
            <router-link class="router-link" to="/reg">
              <i class="el-icon-s-promotion"></i> 注册
            </router-link>
          </div>
          <p class="welcome-title" v-if="this.$global.isLogin">
            欢迎,{{ uname }}
            <i class="el-icon-arrow-down"></i>
          </p>
          <ul class="user-list">
            <li>
              <a href>个人资料</a>
            </li>
            <li>
              <a href>我的订单</a>
            </li>
            <li @click="logout">
              <a href="javascript:;">安全退出</a>
            </li>
          </ul>
        </div>
        <!-- micro-cart -->
        <div class="mic-cart">
          <!-- 购物车图标 -->
          <div class="mic-cart-icon">
            <router-link to="/cart">
              <i class="el-icon-shopping-cart-2"></i>
            </router-link>
            <!-- 购物车角标 -->
            <span v-if="this.$global.isLogin" class="mic-cart-superscript">{{getCount}}</span>
          </div>
          <!-- mic-cart-list -->
          <div class="mic-cart-list">
            <!-- cart-state1: 登录不为空时显示 -->
            <div class="state1" v-if="this.$global.isLogin && this.list.length">
              <div class="mic-cart-item" v-for="(key, index) in list " :key="index">
                <div class="item-left">
                  <img :src="require(`@/assets/images/${key.pic}`)" alt="加载错误..." />
                </div>
                <div class="item-right">
                  <p class="title">{{key.tradeName}}</p>
                  <span class="price">单价 :¥ {{key.price.toFixed(2)}}</span>
                  <span>数量 :</span>
                  <button @click="changeCount(-1,index)" :disabled="key.count<=1">-</button>
                  <input type="text" :value="key.count" disabled />
                  <button @click="changeCount(1,index)">+</button>
                  <button href="javascript:;" @click="del(index)" class="delete">删除</button>
                </div>
              </div>
              <div class="mic-cart-bottom">
                <span>共{{getCount}}件</span>
                <span>小计: ¥{{getTopPrice}}</span>
                <button>去购物车结算</button>
              </div>
            </div>
            <!-- cart-state2: 登录为空时显示 -->
            <div class="state2" v-if="this.$global.isLogin && !this.list.length">用一首歌来形容你的购物车 《空空如也》</div>
            <!-- cart-state3: 未登录时显示 -->
            <div v-if="!this.$global.isLogin">
              请
              <router-link to="/login">登录</router-link>后查看
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- pic-title -->
    <img class="title-pic" src="../assets/images/header/header.jpg" />
    <!-- nav-bar -->
    <div class="nav-bar">
      <ul class="nav-list">
        <li>
          <router-link class="nav-link" to="/">&nbsp;&nbsp;首 页&nbsp;&nbsp;</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/dog">狗狗专区</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/cat">猫咪专区</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/stable">主食专区</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/medicine">医药专区</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/snacks">零食专区</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/commodity">日用专区</router-link>
        </li>
      </ul>
    </div>
    <!-- element ui组件 -->
    <!-- <Nav-menu /> -->
  </div>
</template>

<script>
// 引入其他组件
import NavMenu from "./NavMenu";
// export default {a,b,c}  //默认导出： 讲本模块中的私有成员暴露出去，供其他模块使用
export default {
  data() {
    return {
      list: [],
      uname: this.$global.uname,
      cartCount: 0,
      topPrice: 0,
      timer: null
    };
  },
  name: "Header",
  // 局部注册组件
  components: {
    NavMenu
  },
  methods: {
    // 1-退出登录
    logout: function() {
      // 清除登录状态
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      this.$router.push("/");
      // 刷新页面更新登录状态
      location.reload();
    },
    // 2-查询购物车
    cartList: function() {
      if (this.$global.isLogin) {
        // console.log("发起查询购物车请求...");
        this.$http({
          method: "post",
          url: "/cart/list"
          // data: { uid: this.$global.uid },
        }).then(
          res => {
            // console.log("查询购物车请求结果=>", res);
            this.list = res.data.data;
            // this指向????????  如果不是箭头函数呢
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    // 3-更新购物车(单个商品的count)
    // (只能单条更新  如何实现批量更新数据库数据????????????????
    // => 后台遍历执行更新操作  问题: 如何遍历如何发送和接受批量数据)

    // 3.1-定义 + - 绑定的事件函数  (缺点:一次只能更改一个商品的数量,??????????批量更新???????????)
    changeCount(val, i) {
      // missionA: 改变商品数量
      this.list[i].count += val;
      var that = this;
      // missionB: 发起更新购物车请求(debounce:一定时间内最后一次点击,x秒后发起update请求)
      // ①-定义调用 updateCountReq 的定时器函数
      function creTimer(that) {
        that.timer = setTimeout(() => {
          that.updateCountReq(that.list[i].productId, that.list[i].count, i);
        }, 500);
      }
      // ②-启动定时器
      if (this.timer == null) {
        creTimer(that);
      } else {
        clearTimeout(this.timer); // 停止旧定时器
        this.timer = null;
        creTimer(that); // 启动新定时器
      }
    },
    // 3.2-定义 发起更新商品数量请求的函数
    updateCountReq(pid, count, i) {
      console.log("发起更新购物车请求");
      this.$http({
        method: "post",
        url: "/cart/update",
        data: {
          uid: this.$global.uid,
          pid: this.list[i].productId,
          count: this.list[i].count
        }
      }).then(res => {
        console.log("更新购物车请求结束,res:", res);
      });
    },
    // 4-删除商品(删除一个 清空购物车 ???删除选中??? )
    // 删除指定商品
    del(i) {
      // arguments.length  是实参的数量
      // 传递两个参数pid uid时执行删除的那个商品
      // 一个参数uid 时执行清空购物车
      // if (arguments.length == 1) {
      //   this.list.splice(i, 1);
      //   var data = {};
      // } else if (arguments.lenght == 2) {
      //   var data = {};
      // }
      var data = { uid: this.$global.uid, pid: this.list[i].productId };
      // missionA: 发起删除数据库数据请求;
      this.$http({
        method: "post",
        url: "/cart/delete",
        data: data
      }).then(res => {
        console.log(res);
        if (res.data.code == 201) {
          // missionB: 删除list中的数据
          this.list.splice(i, 1);
        }
      });
    }
  },
  // 有缓存:依赖的数据没有变化不会重新计算(区别于methods)
  computed: {
    // 计算购物车商品总数量(角标)
    getCount: function() {
      // 计算前清零,防止重复计算(因为:相关任何相关数据变化都会重新计算所以要清零后重新计算)
      this.cartCount = 0;
      // 两种语法等效
      // for (var i = 0; i < this.list.length; i++) {
      //   this.cartCount += this.list[i].count;
      // }
      this.list.forEach((element, i) => {
        this.cartCount += this.list[i].count;
      });
      return this.cartCount;
    },
    // 计算总价
    getTopPrice: function() {
      this.topPrice = 0;
      for (var i = 0; i < this.list.length; i++) {
        this.topPrice += this.list[i].count * this.list[i].price;
      }
      return this.topPrice.toFixed(2);
    }
  },
  mounted() {
    this.cartList();
  }
};
</script>

<style scoped>
/* 解决css样式作用域问题:scoped原理是为每个元素添加自定义属性<data-xxx>,不利于浏览器快速渲染,故选择less嵌套解决 */
@import "../css/Header.css";
</style>
