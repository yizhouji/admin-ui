<template>
  <div class="main">
    <div class="title">{{ title }}</div>
    <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="验证码错误" />

    <div class="mobileLogin" v-if="showMobileLogin">
      <div class="input">
        <a-input ref="userNameInput" class="inputItem" v-model.trim="phone" :maxLength="11" placeholder="请输入手机号">
          <a-icon slot="prefix" type="mobile" :style="{ color: '#d9d9d9' }" />
        </a-input>
      </div>
      <div class="input">
        <a-input ref="userNameInput" class="inputItem" v-model="code" placeholder="请输入验证码">
          <a-icon slot="prefix" type="lock" :style="{ color: '#d9d9d9' }" />
        </a-input>
        <a-button type="primary" class="send" v-if="hasSend" @click="sendCode">{{ txt }}</a-button>
        <a-button type="info" disabled v-else>{{ smsTime }}s</a-button>
      </div>
      <div class="check">
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
        <span @click="loginType(1)">微信扫码登录</span>
      </div>
      <div class="submit">
        <a-button type="primary" block @click="loginHandle">登录</a-button>
      </div>
    </div>
    <div class="wechatLogin" v-else>
      <div id="weixin">
        <div class="img">
          <img :src="qrCodeUrl" alt="" />
        </div>
        <a-divider>
          <span class="skip">其他方式登录</span>
        </a-divider>
        <div class="changeLogin">
          <div class="item" @click="loginType(2)">
            <img src="../../assets/wechatLogin.png" alt="" />
            <p>手机号登陆</p>
          </div>
        </div>
      </div>
    </div>
    <!-- </a-form> -->
  </div>
</template>

<script>
  import storage from 'store'
  import {
    mapActions
  } from 'vuex'
  import {
    timeFix,
    welcome,
    regMobile
  } from '@/utils/util'
  import {
    getQrcode,
    checkLogin,
    telLoginCode,
    telLogin
  } from '@/api/login'
  import {
    bindMobile,
    getMsgCode
  } from '@/api/user'
  import {
    ACCESS_TOKEN
  } from '@/store/mutation-types'
  var timer = null
  export default {
    name: 'Login',
    components: {},
    data () {
      return {
        title: '微信扫码登录',
        loginBtn: false,
        form: this.$form.createForm(this),
        state: {
          time: 60,
          loginBtn: false,
          // login type: 0 email, 1 username, 2 telephone
          loginType: 0,
          smsSendBtn: false
        },
        qrCodeUrl: '',
        sceneStr: '',
        isRequest: false,

        phone: '',
        code: '',
        smsTime: 60,
        hasSend: true,
        txt: '发送验证码',
        timer: null,
        showMobileLogin: false,
        isLoginError: false
      }
    },
    created () {},
    mounted () {
      this.getCode()
    },
    destroyed () {
      clearInterval(timer)
    },
    methods: {
      ...mapActions(['Login', 'Logout']),
      loginType (type) {
        if (type === 1) {
          this.title = '微信扫码登录'
          this.showMobileLogin = false
          this.getCode()
        } else {
          this.title = '手机号登录'
          this.showMobileLogin = true
          clearInterval(timer)
        }
      },
      getCode () {
        getQrcode()
          .then()
          .then(res => {
            this.qrCodeUrl = res.result.qrCodeUrl
            this.sceneStr = res.result.sceneStr
            this.$nextTick(() => {
              timer = setInterval(() => {
                if (!this.isRequest) {
                  this.getStatus()
                }
              }, 1000)
            })
          })
      },
      sendCode () {
        if (!this.phone) {
          this.$message.error('请输入手机号码')
          return
        }
        if (!regMobile(this.phone)) {
          this.$message.error('请输入正确的手机号码')
          return
        }
        telLoginCode({
            telephone: this.phone
          })
          .then(res => {
            this.hasSend = false
            this.timer = setInterval(() => {
              if (this.smsTime > 0) {
                this.smsTime--
              } else {
                this.smsTime = 60
                this.hasSend = true
                this.txt = '重新发送'
                window.clearInterval(this.timer)
                console.log(this.timer)
                this.timer = null
              }
            }, 1000)
          })
          .catch(error => {
            this.$message.error(error.data.message)
          })
      },
      getStatus () {
        this.isRequest = true
        checkLogin(this.sceneStr)
          .then(res => {
            if (res.result) {
              this.isRequest = false
              clearInterval(timer)
              const result = res.result
              storage.set(ACCESS_TOKEN, result.userId, 7 * 24 * 60 * 60 * 1000)
              this.$store.commit('SET_USER', result)
              this.$store.commit('SET_TOKEN', result.userId)
              this.$store.commit('SET_NAME', {
                name: result.name,
                welcome: welcome()
              })
              storage.set('USERINFO', result)
              this.loginSuccess(result)
              let link = localStorage.getItem('link')
              if (link) {
                localStorage.removeItem('link')
                this.$router.push(link)
                return
              }
              if (result.telephone && result.telephone.length > 0) {
                this.$router.push('/dashboard')
              } else {
                this.$router.push('/account/center?bind=1')
              }
            } else {
              this.isRequest = false
            }
          })
          .catch(() => {
            this.isRequest = true
          })
      },
      // handler
      handleUsernameOrEmail (rule, value, callback) {
        const {
          state
        } = this
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        if (regex.test(value)) {
          state.loginType = 0
        } else {
          state.loginType = 1
        }
        callback()
      },

      loginHandle (e) {
        e.preventDefault()
        const {
          form: {
            validateFields
          },
          state,
          Login
        } = this

        state.loginBtn = true

        telLogin({
            telephone: this.phone,
            code: this.code
          })
          .then(res => {
            const result = res.result
            storage.set(ACCESS_TOKEN, result.userId, 7 * 24 * 60 * 60 * 1000)
            this.$store.commit('SET_USER', result)
            this.$store.commit('SET_TOKEN', result.userId)
            this.$store.commit('SET_NAME', {
              name: result.name,
              welcome: welcome()
            })
            storage.set('USERINFO', result)
            this.loginSuccess(res)
            if (result.wechatInfo) {
              this.$router.push('/dashboard')
            } else {
              this.$router.push('/account/center')
            }
          })
          .catch(err => this.requestFailed(err))
          .finally(() => {
            state.loginBtn = false
          })
      },

      stepCaptchaSuccess () {
        this.loginSuccess()
      },
      stepCaptchaCancel () {
        this.Logout().then(() => {
          this.loginBtn = false
          this.stepCaptchaVisible = false
        })
      },
      loginSuccess (res) {
        // this.$router.push({ name: 'dashboard' })
        // 延迟 1 秒显示欢迎信息
        setTimeout(() => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        }, 1000)
        this.isLoginError = false
      },
      requestFailed (err) {
        console.log(err)
        this.isLoginError = true
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
          duration: 4
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .title {
    text-align: center;
    margin-bottom: 20px;
    color: #40a9ff;
    font-size: 14px;
  }

  .check {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #40a9ff;
    margin-bottom: 20px;

    span {
      cursor: pointer;
    }
  }

  .mobileLogin {
    padding-bottom: 20px;
  }

  .logo {
    margin-bottom: 40px;

    img {
      width: 130px;
      height: auto;
      display: block;
      margin: 0 auto;
    }
  }

  .input {
    display: flex;

    .inputItem {
      height: 40px;
      margin-bottom: 24px;

      /deep/ input {
        border-radius: 5px;
      }
    }

    /deep/ button {
      height: 40px;
      margin-left: 24px;
      border-radius: 5px;
    }

    /deep/ .send {
      border: #40a9ff;
      color: #ffffff;
      background: #40a9ff;
    }
  }

  .submit {
    margin-bottom: 20px;

    /deep/ button {
      height: 40px;
      border-radius: 5px;
    }
  }

  #weixin {
    .img {
      width: 190px;
      height: 190px;
      border-radius: 5px;
      overflow: hidden;
      margin: 0 auto;

      img {
        width: 190px;
        height: 190px;
        display: block;
      }
    }

    /deep/ .skip {
      color: #40a9ff;
      font-size: 14px;
      cursor: pointer;
    }

    .changeLogin {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40px;

      .item {
        cursor: pointer;

        img {
          width: 35px;
          height: 35px;
          display: block;
          margin: 0 auto;
        }

        p {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
          color: #40a9ff;
          cursor: pointer;
        }
      }
    }
  }
</style>
