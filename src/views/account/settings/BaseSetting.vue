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
                  <a-input placeholder="请输入昵称" v-model="user.nickname"/>
                </a-form-item>

                <a-form-item label="手机号" :required="false">
                  <template v-if="user.telephone">
                    <span class="telephone">{{ user.telephone }}</span>
                    <a-button type="primary" @click="bindMobile">更换手机号</a-button>
                  </template >
                  <a-button type="primary" v-else @click="bindMobile">绑定手机号</a-button>
                </a-form-item>
                <a-form-item label="邮箱" :required="false">
                  <a-input placeholder="请输入邮箱" v-model="user.email" />
                </a-form-item>
                <a-form-item label="微信" :required="false">
                  <div class="qrCode">
                    <div class="img">
                      <img :src="qrCode" alt="" v-if="qrCode" />
                    </div>
                    <p>扫描二维码绑定微信</p>
                    <p>方便下次登录</p>
                  </div>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary">保存</a-button>
                </a-form-item>
              </a-form>
            </a-col>
            <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
              <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
                <a-icon type="cloud-upload-o" class="upload-icon" />
                <div class="mask">
                  <a-icon type="plus" />
                </div>
                <img :src="user.headImgUrl || 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'"/>
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
import storage from 'store'
import BindMobile from '@/components/bindMobile'
export default {
  components: {
    AvatarModal,
    BindMobile
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
      }
    }
  },
  computed: {
   user () {
      let user = ''
      if (this.$store.state.user.user) {
        user = this.$store.state.user.user
      } else {
        user = storage.get('USERINFO')
      }
      return user
    }
  },
  mounted () {
    console.log(this.user)
  },
  methods: {
    bindMobile () {
      this.$refs.bindMobile.show()
    },
    setavatar (url) {
      this.option.img = url
    }
  }
}
</script>

<style lang="less" scoped>
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
  .telephone{
    display: inline-block;
    margin-right: 20px;
  }
  .qrCode {
    .img {
      width: 126px;
      height: 126px;
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
