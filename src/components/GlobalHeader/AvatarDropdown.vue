<template>
  <a-dropdown v-if="currentUser && currentUser.nickname" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" class="antd-pro-global-header-index-avatar" />
      <span>{{ currentUser.nickname }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <!-- <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <img src="@/assets/icon_user.png" alt=""/>
          个人中心
        </a-menu-item>
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <img src="@/assets/icon_record.png" alt=""/>
          充值记录
        </a-menu-item> -->
        <a-menu-item v-if="menu" key="center" @click="handleToIndex">
          <img src="@/assets/icon_website.png" alt=""/>
          官网网站
        </a-menu-item>
        <!-- <a-menu-item v-if="menu" key="center" @click="handleToIndex">
          <img src="@/assets/icon_contect.png" alt=""/>
          联系客服
        </a-menu-item> -->

        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <img src="@/assets/icon_logout.png" alt=""/>
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { logout } from '@/api/login'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleToIndex () {
      this.$router.push({ name: 'index' })
    },
    handleToCenter () {
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings () {
      this.$router.push({ path: '/account/settings' })
    },
    handleLogout (e) {
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
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
    display: flex;
    align-items: center;
    img{
      display: block;
      margin-right: 10px;
      width:16px;
      height: 16px;
    }
  }
}
</style>
