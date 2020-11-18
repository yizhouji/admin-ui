<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="main">
        <div class="title">
          <span>{{ $route.meta.title }}</span>
        </div>

        <div class="view">
          <a-row :gutter="16">
            <a-col :md="24" :lg="16">
              <a-form layout="vertical">
                <a-form-item label="昵称">
                  <a-input placeholder="请输入昵称" :maxLength="10" v-model.trim="info.nickname" />
                </a-form-item>

                <a-form-item label="手机号" :required="false">
                  <template v-if="info.telephone">
                    <span class="telephone">{{ info.telephone }}</span>
                    <a-button type="primary" @click="bindMobile">更换手机号</a-button>
                  </template>
                  <a-button type="primary" v-else @click="bindMobile">绑定手机号</a-button>
                </a-form-item>
                <a-form-item label="邮箱" :required="false">
                  <a-input placeholder="请输入邮箱" v-model.trim="info.email" />
                </a-form-item>
                <a-form-item label="微信" :required="false">
                  <div class="refresh">
                    <wechat ref="wechat" :key="keyComponents" v-if="show"></wechat>
                    <div class="refreshBox" @click="refreshHandle"></div>
                  </div>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" @click="changeInfo">保存</a-button>
                </a-form-item>
              </a-form>
            </a-col>
            <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
              <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
                <a-icon type="cloud-upload-o" class="upload-icon" />
                <div class="mask">
                  <a-icon type="plus" />
                </div>
                <img
                  :src="
                    info.headImgUrl || 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
                  "
                />
              </div>
            </a-col>
          </a-row>
          <Bind-mobile ref="bindMobile"></Bind-mobile>
          <avatar-modal ref="modal" @ok="setavatar" />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import wechat from './wechat'

import storage from 'store'
import BindMobile from '@/components/bindMobile'
import { modifyInfo, getQrCode, getBindStatus } from '@/api/user'
import { regStr, regEmail } from '@/utils/util'
export default {
  components: {
    AvatarModal,
    BindMobile,
    wechat
  },
  data () {
    return {
      // cropper

      preview: {},
      qrCode: '',
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      // info: '',
      qrCodeUrl: '',
      sceneStr: '',
      timer: null,
      isRequest: false,
      refresh: false,
      keyComponents: new Date().getTime(),
      show: true
    }
  },
  computed: {
    info () {
      let user = ''
      if (this.$store.state.user.user) {
        user = this.$store.state.user.user
      } else {
        user = storage.get('USERINFO')
      }
      return JSON.parse(JSON.stringify(user))
    }
  },
  mounted () {
    let query = this.$route.query
    if (query && query.bind) {
      this.$refs.bindMobile.show()
    }
    this.$refs.wechat.init(this.info)
  },
  methods: {
    refreshHandle () {
      if (this.info && this.info.wechatInfo) {
        return false
      }
      this.show = false
      this.keyComponents = new Date().getTime()
      this.show = true
      this.$nextTick(() => {
        this.$refs.wechat.init(this.info)
      })
    },
    getCodeImg (type) {
      getQrCode().then(res => {
        this.qrCodeUrl = res.result.qrCodeUrl
        this.sceneStr = res.result.sceneStr
        if (!this.info.wechatInfo) {
          this.getStatus(type)
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
            this.getStatus()
          } else {
            this.$notification.error({
              message: '请求失败',
              description: error.data.message
            })
          }
        })
    },
    bindMobile () {
      this.$refs.bindMobile.show()
    },
    changeInfo () {
      let obj = {
        email: this.info.email,
        nickname: this.info.nickname
      }
      if (!this.info.nickname) {
        this.$message.error('请输入昵称')
        return
      }
      if (!regStr(this.info.nickname)) {
        this.$message.error('昵称不可包含特殊字符')
        return
      }
      if (this.info.nickname.length > 10) {
        this.$message.error('昵称不可超过10个字符')
        return
      }
      if (this.info.email && !regEmail(this.info.email)) {
        this.$message.error('邮箱格式不正确')
        return
      }

      modifyInfo(obj)
        .then(res => {
          let user = this.info
          user.nickname = this.info.nickname
          user.email = this.info.email
          this.$store.commit('SET_USER', user)
          storage.set('USERINFO', user)
          this.$message.success('修改成功')
        })
        .catch(error => {
          this.$message.error(error.data.message)
        })
    },
    setavatar (url) {
      let user = this.user
      user.headImgUrl = url
      this.$store.commit('SET_USER', user)
      storage.set('USERINFO', user)
      this.option.img = url
    }
  }
}
</script>

<style lang="less" scoped>
.refresh {
  position: relative;
  .refreshBox {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
}
.main {
  padding: 0 40px;

  .title {
    font-size: 24px;
    color: #333333;
    margin-bottom: 20px;
  }

  /deep/ .ant-form-item {
    height: auto;
  }

  .telephone {
    display: inline-block;
    margin-right: 20px;
  }

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
}

.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
