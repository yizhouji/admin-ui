<template>
  <div class="pay" v-if="visible">
    <div class="bg"></div>
    <div class="box">
      <div class="title">
        <div class="name">登录账号：<img :src="user.headImgUrl" />{{ user.nickname }}</div>
        <div class="close" @click="close"> <img src="../../../assets/close.png" /></div>
      </div>
      <div class="body" v-if="step===1">
        <p>选择充值方式</p>
        <div class="select">
          <div class="part " :class="selected === 1?'wechat':''" @click="select(1)">
            <a-radio :checked="selected === 1" style="color:#1EBF1E"></a-radio>
            <img src="../../../assets/wechat.png" />
            微信支付
          </div>
          <div class="part " :class="selected === 2?'alipay':''" @click="select(2)">
            <a-radio :checked="selected === 2"></a-radio>
            <img src="../../../assets/zhifubao.png" />
            微信支付
          </div>
        </div>
        <div class="price">
          付款金额：<span>{{ info.actualCost }}元</span>
        </div>
        <div class="submit">
          <a-button type="primary" class="btn" @click="buy">确定</a-button>
        </div>
      </div>

      <div class="body" v-else>
        <p>请扫码支付</p>
        <div class="code">
          <img :src="codeUrl" alt="">
        </div>
        <div class="again" @click="again">重新选择支付方式</div>
      </div>
      <div class="tip">
        温馨提示： 网站设置防盗刷系统，请合理使用账号。如用户短时间内高频或大量下载可能触发该系统，将暂时暂停账号使用功能
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  import {
    price,
    wechatPay,
    aliPay,
    wechatPayResult,
    aliPayResult
  } from '@/api/price'
  import {
    updateUserInfo
  } from '@/api/user'
  import storage from 'store'

  export default {
    name: 'Price',
    components: {},
    data () {
      return {
        user: '',
        visible: false,
        commodityId: '',
        selected: 0,
        info: '',
        step: 1,
        codeUrl: '',
        orderNo: '',
        isRequest: true
      }
    },
    mounted () {
    },
    methods: {
      select (key) {
        this.selected = key
      },
      close () {
        this.step = 1
        this.selected = 0
        this.visible = false
        this.info = ''
      },
      again () {
        this.isRequest = false
        this.step = 1
      },
      buy () {
        if (!this.selected) {
          this.$message.error('请选择支付方式')
          return
        }
        this.isRequest = true
        if (this.selected === 1) {
          wechatPay({
            commodityId: this.info.commodityId
          }).then(res => {
            this.codeUrl = res.result.codeUrl
            this.orderNo = res.result.orderNo
            this.step = 2
            this.getStatus(1)
          }).catch(error => {
            if (error.status === 401) {
              this.visible = false
            }
          })
        } else {
          aliPay({
            commodityId: this.info.commodityId
          }).then(res => {
            this.codeUrl = res.result.codeUrl
            this.orderNo = res.result.orderNo
            this.step = 2
            this.getStatus(2)
          }).catch(error => {
            if (error.status === 401) {
              this.visible = false
            }
          })
        }
      },
      getStatus (type) {
        if (!this.isRequest) {
          return
        }
        if (type === 1) {
          wechatPayResult(this.orderNo)
            .then(res => {
              if (res.result) {
                this.paySuccess()
              } else {
                this.getStatus(type)
              }
            })
            .catch(() => {
              this.isRequest = true
            })
        } else {
          aliPayResult(this.orderNo)
            .then(res => {
              if (res.result) {
                this.paySuccess()
              } else {
                this.getStatus(type)
              }
            })
            .catch(() => {
              this.isRequest = true
            })
        }
      },
      update () {
        const hide = this.$message.loading('正在更新用户信息', 0)
        updateUserInfo().then(res => {
          const result = res.result
          this.$store.commit('SET_USER', result)
          this.$store.commit('SET_TOKEN', result.userId)
          storage.set(ACCESS_TOKEN, result.userId, 7 * 24 * 60 * 60 * 1000)
          storage.set('USERINFO', result)
          hide()
          this.$router.push('/dashboard')
        }).catch(() => {
          hide()
        })
      },
      paySuccess () {
        this.$message.success('支付成功')
        this.step = 1
        this.selected = 0
        this.visible = false
        this.info = ''
        this.update()
      },
      show (info) {
        this.info = info
        console.log(info)
        let user = localStorage.getItem('USERINFO')
        this.user = user ? JSON.parse(user) : ''
        this.$nextTick(() => {
          console.log(this.user)
          this.visible = true
        })
      },
      handleOk () {},
      callback (key) {
        console.log(key)
      }
    }
  }
</script>

<style lang="less" scoped>
  .pay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    .box {
      width: 800px;
      background: #ffffff;
      padding: 30px 50px;
      border-radius: 8px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
          font-size: 16px;
          font-weight: bold;
          color: #333333;
          display: flex;
          align-items: center;

          img {
            margin: 0 15px;
            width: 30px;
            border-radius: 15px;
            height: 30px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          }
        }

        .close {
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 16px;
            height: 16px;
          }
        }
      }

      .body {
        margin-top: 30px;
        border: 1px dotted #dddddd;
        border-radius: 8px;
        padding: 30px;
        text-align: center;

        p {
          font-size: 16px;
          font-weight: 500;
          color: #333333;
          margin-bottom: 40px;
        }

        .select {
          display: flex;
          align-items: center;

          .part {
            cursor: pointer;
            margin-right: 50px;
            width: 240px;
            display: flex;
            align-items: center;
            padding: 15px;
            border: 1px solid #dddddd;
            border-radius: 6px;
            box-sizing: border-box;

            img {
              width: 26px;
              height: 26px;
              margin-right: 15px;
            }
          }

          .wechat {
            border: 1px solid #1EBF1E;

            /deep/ .ant-radio-checked .ant-radio-inner {
              border-color: #1EBF1E;
            }

            /deep/ .ant-radio-inner::after {
              background-color: #1EBF1E;
            }
          }

          .alipay {
            margin-right: 0;
            border: 1px solid #00A0E9;

          }

        }

        .price {
          margin-top: 60px;
          font-size: 16px;
          color: #333333;

          span {
            color: #F91515;
            font-size: 24px;
          }
        }

        .submit {
          margin-top: 40px;

          .btn {
            width: 120px;
            border-radius: 5px;
          }
        }
      }

      .tip {
        margin-top: 30px;
        font-size: 12px;
        color: #999999;
      }

      .code {
        padding: 10px;
        margin-bottom: 40px;
        border-radius: 10px;

        img {
          width: 200px;
          height: 200px;
          display: block;
          margin: 0 auto;
        }
      }

      .again {
        color: #00A0E9;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
</style>
