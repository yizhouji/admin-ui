<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

export default {
  data () {
    return {}
  },
  computed: {
    locale () {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && setDocumentTitle(`${i18nRender(title)} - ${domTitle}`)

      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  }
}
</script>
<style lang="less">
.text-center{
  text-align: center;
}
.modal-title{
  font-size: 16px;
  color: #000000;
  font-weight: bold;
}
#search-form {
  /* padding: 24px; */
  margin-bottom: 24px;
}
.ant-layout-footer{
    display: none !important;
  }
#table-container {
  .table-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text {
      font-size: 16px;
      font-weight: bolder
    }
    .operation {
      font-size: 14px;
      color: #666666;
      .item {
        margin-left: 48px;
      }
      .item-line {
        margin-left: 48px;
        display: inline;
        span {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    text-align: center;
  }
}
</style>
