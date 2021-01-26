<template>
  <div class="navbar">
    <div class="content">
      <div class="logo" @click="linkHandle('Index')">
        <img src="../static/img/logo_blue.png" alt />
      </div>
      <div class="text">
        <div class="item">
          <a @click="linkHandle('Index')">我们的服务</a>
        </div>
        <div class="item">
          <a @click="linkHandle('Price')">价格</a>
        </div>
        <div class="item">
          <a-dropdown
            :trigger="['hover']"
            placement="bottomCenter"
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode;
              }
            ">
            <a
              class="ant-dropdown-link"
            >
              微信公众号</a>
            <div class="img" slot="overlay">
              <img src="../static/img/code.png" alt="">
            </div>
            </a></a-dropdown>
        </div>
        <div class="item" v-if="currentUser">
          <avatar-dropdown :menu="showMenu" :type="1" :current-user="currentUser" :class="prefixCls" />
        </div>
        <template v-else>
          <div class="item">
            <a @click="linkHandle('Login')">登录</a>
          </div>
          <div class="item">
            <button @click="linkHandle('Register')">注册</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'
import storage from 'store'
import { logout } from '@/api/login'
import AvatarDropdown from '../../../components/GlobalHeader/AvatarDropdown'

export default {
  name: 'Navbar',
  components: {
    AvatarDropdown
  },
   props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    }
   },
  data () {
    return {
       showMenu: true
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
      return JSON.parse(JSON.stringify(user))
    }
  },
  methods: {
    logout () {
      Modal.confirm({
        title: this.$t('提示'),
        content: this.$t('是否退出登录'),
        onOk: () => {
          logout().then(() => {
            this.userInfo = ''
            localStorage.clear()
            this.$router.push({ name: 'index' })
            this.$message.success('退出成功')
          })
        },
        onCancel () {}
      })
    },
    linkHandle (name) {
     if (this.$route.name === name) {
        return false
     } else {
       this.$router.push({ name: name })
     }
    }
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

    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      cursor: pointer;
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
        cursor: pointer;
        a {
          height: 36px;
          color: #0d0a0a;
          line-height: 36px;
          font-family: PingFang SC;
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
        .img{
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          img{
            width: 200px;
            height: 200px;
          }
        }
      }
    }
  }
  .ant-dropdown-link {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    height: 36px;
    align-items: center;
    color: #0d0a0a;
    // margin-left: 30px;
  }
  .userInfo{
    height: 36px;
  }
  /deep/ .user{
    display: flex;
    align-items: center;
    margin-right: 10px;
    img{
      width: 36px;
      height: 36px;
      border-radius: 18px;
      margin-right: 10px;

    }
  }
}
</style>
