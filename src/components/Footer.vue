<template>
  <div class="footer">
    <!-- care -->
    <div class="care">
      <div class="care-item">
        <img src="../assets/images/footer/01.jpg" alt />
        <div class="care-item-text">
          <p>速享</p>
          <p>尽享便捷服务</p>
        </div>
      </div>
      <div class="care-item">
        <img src="../assets/images/footer/02.jpg" alt />
        <div class="care-item-text">
          <p>普惠</p>
          <p>诚意惠及大众</p>
        </div>
      </div>
      <div class="care-item">
        <img src="../assets/images/footer/03.jpg" alt />
        <div class="care-item-text">
          <p>专业</p>
          <p>十年专注宠物</p>
        </div>
      </div>
      <div class="care-item">
        <img src="../assets/images/footer/04.jpg" alt />
        <div class="care-item-text">
          <p>品质</p>
          <p>正规品质保障</p>
        </div>
      </div>
    </div>
    <div class="line" style="width:100%;border-top:2px solid #FF9003"></div>
    <!-- others -->
    <div class="others">
      <div class="others-item">
        <h4>新手指南</h4>
        <p>购物流程</p>
        <p>会员介绍</p>
        <p>积分制度</p>
      </div>
      <div class="others-item">
        <h4>新手指南</h4>
        <p>购物流程</p>
        <p>会员介绍</p>
        <p>积分制度</p>
      </div>
      <div class="others-item">
        <h4>新手指南</h4>
        <p>购物流程</p>
        <p>会员介绍</p>
        <p>积分制度</p>
      </div>
      <div class="others-item">
        <h4>新手指南</h4>
        <p>购物流程</p>
        <p>会员介绍</p>
        <p>积分制度</p>
      </div>
      <div class="others-item">
        <h4>新手指南</h4>
        <p>购物流程</p>
        <p>会员介绍</p>
        <p>积分制度</p>
      </div>
      <div class="others-item">
        <h4>新手指南</h4>
        <p>购物流程</p>
        <p>会员介绍</p>
        <p>积分制度</p>
      </div>
      <img
        src="../assets/images/footer/6.jpg"
        style="width:100px;height:100px;margin:20px 80px 0 -40px"
      />
    </div>
  </div>
</template>

<script>
export default {
  // 组件名
  name: "Footer",
  // 子组件
  components: {},
};
</script>

<style scoped>
.footer {
  width: 100%;
  min-width: 1100px;
  height: 100%;
  background: url("../assets/images/footer/bg.jpg") no-repeat;
  background-size: auto;
  background-position: center top;
  /* border: 2px solid red; */
  color: white;
}

.care {
  display: flex;
  justify-content: space-between;
  padding: 35px 150px 25px 50px;
}
.care-item {
  display: flex;
  text-align: left;
}
.care-item-text {
  margin-left: 10px;
  line-height: 25px;
}
.care-item-text :first-child {
  font-size: 20px;
}

.others {
  display: flex;
  justify-content: space-between;
  padding: 25px 50px 50px 50px;
}
.others-item p {
  font-size: 15px;
}
p {
  cursor: pointer;
}
</style>
