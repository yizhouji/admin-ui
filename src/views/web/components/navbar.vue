<template>
  <div class="navbar">
    <div class="content">
      <div class="logo">
        <img src="../static/img/logo_blue.png" alt />
      </div>
      <div class="text">
        <div class="item">
          <a @click="linkHandle('index')">我们的服务</a>
        </div>
        <div class="item">
          <a @click="linkHandle('price')">价格</a>
        </div>
        <div class="item">
          <a>微信公众号</a>
        </div>
        <!-- <template v-if="userInfo">
          <div class="userInfo">
            <a-dropdown>
              <a class="ant-dropdown-link">
                {{ userInfo.userName }}
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="0">
                  <a target="_blank" @click="linkHandle('dashboard')" rel="noopener noreferrer">进入系统</a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="1">
                  <a target="_blank" @click="logout" rel="noopener noreferrer">退出登录</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </template> -->
        <template>
          <div class="item">
            <a @click="linkHandle('login')">登录</a>
          </div>
          <div class="item">
            <button @click="linkHandle('register')">注册</button>
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
export default {
  name: 'Navbar',
  data () {
    return {}
  },
  computed: {
    userInfo () {
      let user = ''
      if (this.$store.state.user.user) {
        user = this.$store.state.user.user
      } else {
        user = storage.get('USERINFO')
      }
      return user
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
      }
    }
  }
  .ant-dropdown-link {
    font-size: 16px;
    font-weight: bold;
    margin-left: 30px;
  }
}
</style>
