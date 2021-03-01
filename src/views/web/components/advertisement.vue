<template>
  <div class="advertisement">
    <div class="small" v-if="smallShow">
      <div class="close" @click="closeSmall"><img src="../static/img/close.png" alt="" /><span>关闭</span></div>
      <img src="../static/img/small.png" alt="" />
      <div class="click" @click="buy"></div>
    </div>
    <div class="big" v-if="!currentUser.expirationDate && bigShow">
      <div class="close" @click="closeBig"><img src="../static/img/close.png" alt="" /><span>关闭</span></div>
      <img class="img" src="../static/img/big.png" alt="" />
      <div class="click" @click="buy"></div>
    </div>
  </div>
</template>

<script>
import storage from 'store'

export default {
  data () {
    return {
      bigShow: true,
      smallShow: false
    }
  },
  computed: {
    currentUser () {
      let user = ''
      if (this.$store.state.user.user) {
        user = this.$store.state.user.user
      } else {
        user = storage.get('USERINFO')
      }
      return user ? JSON.parse(JSON.stringify(user)) : ''
    }
  },
  methods: {
    closeBig () {
      this.bigShow = false
      this.smallShow = true
    },
    closeSmall () {
      this.smallShow = false
      this.bigShow = false
    },
    buy () {
      this.smallShow = false
      if (this.currentUser) {
           this.$router.push('/price')
      } else {
           this.$router.push('/user/register')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.advertisement {
  .small {
    position: fixed;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    .click {
      position: absolute;
      bottom: 40px;
      left: 50%;
      z-index: 3;
      width: 160px;
      height: 60px;
      margin-left: -80px;
      background: transparent;
      cursor: pointer;
    }
    .close {
      text-align: right;
      cursor: pointer;

      img {
        width: 20px;
        height: 20px;
      }
      span {
        display: inline-block;
        margin-left: 10px;
        font-size: 16px;
        color: #cb3427;
      }
    }
  }
  .big {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .img {
      width: 100%;
      //   min-width: 1200px;
    }
    .click {
      position: absolute;
      bottom: 10px;
      left: 50%;
      z-index: 3;
      width: 18%;
      height: 25%;
      transform: translateX(-50%);

      background: transparent;
      cursor: pointer;
    }
    .close {
      text-align: right;
      padding-right: 15px;
      cursor: pointer;

      img {
        width: 20px;
        height: 20px;
      }
      span {
        display: inline-block;
        margin-left: 10px;
        font-size: 16px;
        color: #cb3427;
      }
    }
  }
}
</style>
