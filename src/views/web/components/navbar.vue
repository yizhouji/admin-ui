<template>
  <div class="navbar">
    <div class="content">
      <div class="logo">
        <img src="../static/img/logo.png" alt />
      </div>
      <div class="text">
        <div class="item"><a href="/index">我们的服务</a></div>
        <div class="item"><a href="/price">价格</a></div>
        <div class="item"><a>微信公众号</a></div>
        <div class="item"><a>登录</a></div>
        <div class="item">
          <button>注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  z-index: 3;
  left: 0;
  right: 0;
  top: 0;
  background: #ffffff;
  .content {
    margin: 0 auto;
    width: 1200px;
    height: 80px;
    line-height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      img {
        height: 36px;
      }
    }
    .text {
      display: flex;
      align-items: center;
      .item {
        margin: 0 30px;
        color: #0d0a0a;
        font-size: 16px;
        display: flex;
        align-items: center;
        font-weight: bold;
        a {
          height: 36px;
          color: #0d0a0a;
          line-height: 36px;
          font-family:PingFang SC;
        }
        button {
          cursor: pointer;
          width: 68px;
          height: 36px;
          line-height: 36px;
          border: none;
          font-weight: bold;
          color: #1890ff;
          background: rgba(221, 238, 255, 1);
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
