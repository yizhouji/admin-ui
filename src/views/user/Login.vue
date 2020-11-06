<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入用户名"
              v-decorator="[
                'userName',
                {
                  rules: [{ required: true, message: '请输入用户名' }, { validator: handleUsernameOrEmail }],
                  validateTrigger: 'change'
                }
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              placeholder="请输入密码"
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="微信扫码登录">
          <div id="weixin">
            <img :src="qrCodeUrl" alt="" />
            <p>请打开微信扫码登录</p>
          </div>
        </a-tab-pane>
      </a-tabs>
      <template v-if="customActiveKey === 'tab1'">
        <a-form-item>
          <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
          <router-link :to="{ name: 'ForgetPwd' }" class="forge-password" style="float: right;">忘记密码</router-link>
        </a-form-item>

        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >确定</a-button
          >
        </a-form-item>
        <div class="target">
          <div class="user-login-other">
            <router-link class="register" :to="{ name: 'Index' }">官网首页</router-link>
          </div>
          <div class="user-login-other">
            <router-link :to="{ name: 'Register' }">注册账户</router-link>
          </div>
        </div>
      </template>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import storage from 'store'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix, welcome } from '@/utils/util'
import { getQrcode, checkLogin } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
var timer
export default {
  name: 'Login',
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
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
      isRequest: false
    }
  },
  created () {},
  mounted () {
    console.log(this.$route.query)
    let query = this.$route.query
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    getCode () {
      getQrcode()
        .then()
        .then(res => {
          this.qrCodeUrl = res.result.qrCodeUrl
          this.sceneStr = res.result.sceneStr
          this.$nextTick(() => {
            timer = setInterval(() => {
              console.log('this.isRequest:', this.isRequest)
              if (!this.isRequest) {
                this.getStatus()
              }
            }, 1000)
          })
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
            this.$store.commit('SET_NAME', { name: result.name, welcome: welcome() })
            storage.set('USERINFO', result)
            this.$router.push('/dashboard')
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
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      this.$nextTick(() => {
        if (key === 'tab2') {
          this.getCode()
        } else {
          clearInterval(timer)
        }
      })
    },

    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['userName', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          Login(values)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
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
      this.$router.push({ name: 'dashboard' })
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
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    // margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
  /deep/ .ant-tabs-ink-bar {
    width: 0 !important;
  }
  .target {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  /deep/ .ant-form-item-with-help {
    margin-bottom: 24px;
  }
  #weixin {
    margin: 0 auto;
    img {
      display: block;
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }
    p {
      font-size: 14px;
      margin-top: 20px;
      color: #999999;
      text-align: center;
    }
  }
}
</style>
