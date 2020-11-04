/*
 * @Author: zhaojingyu
 * @Date: 2020-07-28 10:41:54
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-04 15:41:36
 */
import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
// import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['Login', 'Register', 'Index', 'Price', 'ForgetPwd', 'BindMobile'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/index'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  /* has token */
  console.log(store.state.user)
  if (store.state.user.token) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      let user = store.state.user.user
      user.telephone = ''
      if (user.telephone) {
          next()
      } else {
        // next()
        if (to.path === '/user/bindMobile') {
          next()
        } else {
          next({ path: '/user/bindMobile' })
        }
        NProgress.done()
        console.log(router)
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
