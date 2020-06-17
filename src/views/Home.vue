<template>
  <div id="home">
    <Header class="header"></Header>
    <div class="home-1f">
      <!-- 轮播图 -->
      <div class="block">
        <el-carousel style="height:597px">
          <el-carousel-item v-for="(item, index) in banners" :key="index" style="height:597px">
            <img :src="item" class="banner" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 右侧导航栏 -->
      <div class="right-nav">
        <ul class="nav">
          <li @click="ship('dog')">
            <img src="../assets/images/Home/1Fright/1.jpg" alt />
            <div>
              <h5>狗狗专区</h5>
              <p>狗狗主食|狗狗零食</p>
            </div>
          </li>
          <li @click="ship('cat')">
            <img src="../assets/images/Home/1Fright/2.jpg" alt />
            <div>
              <h5>猫咪专区</h5>
              <p>主食|零食|医药|日用</p>
            </div>
          </li>
          <li>
            <img src="../assets/images/Home/1Fright/3.jpg" alt />
            <div>
              <h5 @click="ship('stable')">主食专区</h5>
              <p>狗狗主食|狗狗零食</p>
            </div>
          </li>
          <li @click="ship('medicine')">
            <img src="../assets/images/Home/1Fright/4.jpg" alt />
            <div>
              <h5>医药专区</h5>
              <p>狗狗主食|狗狗零食</p>
            </div>
          </li>
          <li @click="ship('commodity')">
            <img src="../assets/images/Home/1Fright/5.jpg" alt />
            <div>
              <h5>日用专区</h5>
              <p>狗狗主食|狗狗零食</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-2f">
      <div class="disc">
        <h3>商城简介</h3>
        <span>我们的流线式网页布局设计方案和可视化图文内容编辑模式让网站制作和维护成为一件轻松惬意的事。起飞页的核心竞争力来自于它集流线式布局方案与可视化内容编辑于一体，支持打字传图、自由拖拽，不需要专业编写代码，您可以随心所欲创建区块、添加组件…</span>
      </div>
    </div>
    <div class="home-3f">
      <img src="../assets/images/Home/home3F.jpg" alt />
      <div class="disc">
        <h3>品牌视频介绍</h3>
        <span>我们的流线式网页布局设计方案和可视化图文内容编辑模式让网站制作和维护成为一件轻松惬意的事。起飞页的核心竞争力来自于它集流线式布局方案与可视化内容编辑于一体，支持打字传图、自由拖拽，不需要专业编写代码，您可以随心所欲创建区块、添加组件…</span>
      </div>
    </div>
    <div class="home-4f">
      <div class="title-4f">
        <div class="left-line" style="border:1px solid #E2E2E2;width:30%;height:0px"></div>
        <div>
          <p>狗狗甄选</p>
          <p>DOG</p>
        </div>
        <div class="right-line" style="border:1px solid #E2E2E2;width:30%;height:0px"></div>
      </div>
      <div class="dog-sel">
        <dog-sel></dog-sel>
      </div>
      <div class="footer-4f">
        <img src="../assets/images/Home/home4F01.jpg" alt />
        <img src="../assets/images/Home/home4F02.jpg" alt />
      </div>
    </div>
    <div class="home-5f">
      <div class="title-5f">
        <div class="left-line" style="border:1px solid #E2E2E2;width:30%;height:0px"></div>
        <div>
          <p>猫咪甄选</p>
          <p>CAT</p>
        </div>
        <div class="right-line" style="border:1px solid #E2E2E2;width:30%;height:0px"></div>
      </div>
      <div class="dog-sel">
        <dog-sel></dog-sel>
      </div>
      <div class="footer-5f">
        <img src="../assets/images/Home/home5F01.jpg" alt />
        <img src="../assets/images/Home/home5F02.jpg" alt />
      </div>
    </div>
    <div class="home-6f">
      <div>
        <img src="../assets/images/Home/home6F01.jpg" alt />
        <strong>猜你喜欢</strong>
        <img src="../assets/images/Home/home6F02.jpg" alt />
      </div>
      <you-like></you-like>
    </div>
  </div>
</template>

<script>
import dogSel from "../components/Home-dog-select";
import youLike from "../components/Home-like";
export default {
  name: "Home",
  components: { dogSel, youLike },
  data() {
    return {
      products: [],
      banners: [
        require("../assets/images/Home/banner01.jpg"),
        require("../assets/images/Home/banner02.jpg")
      ]
    };
  },
  mounted() {
    this.homePro();
  },
  methods: {
    homePro() {
      console.log("发起首页商品请求...");
      this.$http
        .get("/products/list", {
          params: {
            uname: "lee"
          }
        })
        .then(res => {
          console.log("首页商品请求结果=>", res);
        });
    },

    ship(tar) {
      this.$router.push(`/${tar}`);
    }
  }
};
</script>
<style scoped>
@import "../css/Home.css";
</style>
