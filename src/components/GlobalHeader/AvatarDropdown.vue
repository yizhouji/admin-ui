<template>
  <a-dropdown v-if="currentUser && currentUser.nickname" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        :src="currentUser.headImgUrl || 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'"
        class="antd-pro-global-header-index-avatar" />
      <span>{{ currentUser.nickname }}</span>
    </span>
    <template v-slot:overlay>

      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="date" @click="charge" class="charge">
          <div class="name">{{ currentUser.nickname }}</div>
          <div class="time">VIP使用期限还有{{ expireDate }}天 <span>续费
            <a-icon type="right" /></span></div>
        </a-menu-item>
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <img src="@/assets/icon_user.png" alt="" />
          个人中心
        </a-menu-item>
        <a-menu-item v-if="menu" key="center" @click="chargeHandle">
          <img src="@/assets/icon_record.png" alt=""/>
          充值记录
        </a-menu-item>
        <a-menu-item v-if="menu" key="website" @click="handleToIndex">
          <img src="@/assets/icon_website.png" alt="" />
          官方网站
        </a-menu-item>
        <!-- <a-menu-item v-if="menu" key="center" @click="handleToIndex">
          <img src="@/assets/icon_contect.png" alt=""/>
          联系客服
        </a-menu-item> -->

        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <img src="@/assets/icon_logout.png" alt="" />
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
  import {
    Modal
  } from 'ant-design-vue'
  import {
    logout
  } from '@/api/login'

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
    data () {
      return {}
    },
    computed: {
      expireDate () {
        let first = new Date(this.getDate())
        let second = new Date(this.currentUser.expirationDate)
        let diff = Math.abs(first.getTime() - second.getTime())
        let result = parseInt(diff / (1000 * 60 * 60 * 24))
        return result
      }
    },
    methods: {
      getDate () {
        let d = new Date()
        let month = d.getMonth() + 1
        let day = d.getDate()
        let year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day
        return [year, month, day].join('-')
      },
      charge () {
        this.$router.push({
          path: '/price'
        })
      },
      chargeHandle () {
         this.$router.push({
          path: '/account/history'
        })
      },
      handleToIndex () {
        this.$router.push({
          path: '/'
        })
      },
      handleToCenter () {
        console.log(this.$router)
        this.$router.push({
          path: '/account/center'
        })
      },
      handleToSettings () {
        this.$router.push({
          path: '/account/settings'
        })
      },
      handleLogout (e) {
        Modal.confirm({
          title: this.$t('提示'),
          content: this.$t('是否退出登录'),
          onOk: () => {
            logout().then(() => {
              this.userInfo = ''
              localStorage.clear()
              this.$router.push({
                name: 'index'
              })
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
    padding-top: 0;
    overflow: hidden;

    /deep/ .action {
      margin-right: 8px;
    }

    /deep/ .ant-dropdown-menu-item {
      min-width: 160px;
      padding: 5px 18px;
      display: flex;
      align-items: center;

      img {
        display: block;
        margin-right: 10px;
        width: 16px;
        height: 16px;
      }
    }

    .charge {
      padding-top: 16px;
      padding-bottom: 16px;
      display: block;
      color: #5B9CD1;
      background: #FFFFFF linear-gradient(65deg, rgba(195, 238, 254, 0.5) 0%, rgba(131, 226, 255, 0.5) 100%);

      .name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 6px;
      }

      .time {
        font-size: 14px;

        span {
          display: inline-block;
          margin-left: 20px;
        }
      }
    }
  }
</style>
