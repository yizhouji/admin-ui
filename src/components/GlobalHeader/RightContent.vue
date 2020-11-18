<template>
  <div :class="wrpCls">
    <div class="part">
      <a href="/price" class="buy">VIP购买/低至每月8元</a>
    </div>
    <div class="part" @click="backHome">
      <div class="link">
        <a-icon type="home" :style="{ fontSize: '18px' }" />
      </div>
    </div>
    <!-- <div class="part">
      <a-badge
        :number-style="{'font-size':'10px','height':'12px','line-height':'12px','padding':'0 3px'}"
        :count="99"
        :overflow-count="9"
      >
        <div class="link">
          <a-icon type="bell" :style="{ fontSize: '18px' }" />
        </div>
      </a-badge>
    </div> -->
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <!-- <select-lang :class="prefixCls" /> -->
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
// import SelectLang from '@/components/SelectLang'
import storage from 'store'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown
    // SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true
    }
  },
  watch: {
    user (newName, oldName) {
        console.log(newName, oldName)
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
    },

    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${this.isMobile || !this.topMenu ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {},
  methods: {
    backHome () {
      if (this.$route.path.indexOf('/dashboard/index') < 0) {
        this.$router.push({
          path: '/dashboard/index'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.part {
  height: 100%;
  display: inline-block;
  padding: 0 5px;
  .link {
    color: #595959;
    cursor: pointer;
  }
  .buy {
    color: #ff7300;
    font-size: 14px;
    padding: 0 15px;
  }
  .ant-badge {
    height: 100%;
  }
  .ant-badge {
    .link {
      display: inline-block;
      padding: 0 10px;
    }
  }
}
.part:last-child {
  margin-right: 10px;
}
</style>
