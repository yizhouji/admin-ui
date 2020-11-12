<!--
 * @Author: zhaojingyu
 * @Date: 2020-11-12 16:34:37
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-12 17:07:15
-->
<template>
  <div class="qrCode">
    <div class="img">
      <img :src="qrCodeUrl" alt="" v-if="qrCodeUrl" />
      <div class="bg" v-if="info.wechatInfo">已绑定</div>
    </div>
    <p>扫描二维码绑定微信</p>
    <p>方便下次登录</p>
  </div>
</template>

<script>
import { modifyInfo, getQrCode, getBindStatus } from '@/api/user'
import storage from 'store'

export default {
  data () {
    return {
      // cropper
      info: '',
      qrCodeUrl: '',
      sceneStr: '',
      timer: null,
      isRequest: false,
      refresh: false,
      destroyed: false
    }
  },
  methods: {
    init (info) {
      console.log(info)
      this.info = info
      this.getCodeImg()
    },
    getCodeImg () {
      getQrCode().then(res => {
        this.qrCodeUrl = res.result.qrCodeUrl
        this.sceneStr = res.result.sceneStr
        if (!this.info.wechatInfo) {
          this.getStatus()
        }
      })
    },
    getStatus () {
      getBindStatus({ sceneStr: this.sceneStr })
        .then(res => {
          let user = this.user
          user.wechatInfo = res.result.data
          this.$store.commit('SET_USER', user)
          storage.set('USERINFO', user)
        })
        .catch(error => {
          if (error.data.code === 'A0111') {
            this.$message.error('扫码的微信已绑定其他账号')
          } else if (error.data.code === 'A0112') {
              if (!this.destroyed) {
            this.getStatus()
              }
          } else {
            this.$notification.error({
              message: '请求失败',
              description: error.data.message
            })
          }
        })
    }
  },
  destroyed () {
      this.destroyed = true
  }
}
</script>

<style lang="less" scoped>
.qrCode {
  .img {
    width: 126px;
    height: 126px;
    position: relative;

    img {
      width: 126px;
      height: 126px;
    }

    border-radius: 5px;
    background: #d8d8d8;
    display: block;
    margin: 0 auto 20px;
  }

  p {
    text-align: center;
    font-size: 14px;
    color: #666666;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
}
</style>
