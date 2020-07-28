// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/index',
    children: [
      {
        path: '/dashboard/index',
        name: 'analysis',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', keepAlive: true, icon: bxAnaalyse }
      },
      // 货物管理
      {
        path: '/goods',
        redirect: '/goods/goodsManage',
        component: RouteView,
        meta: { title: '货物管理', icon: 'form' },
        children: [
          {
            path: '/goods/goodsManage',
            name: 'GoodsManage',
            component: () => import('@/views/goods/goodsManage'),
            meta: { title: '货物管理 ', keepAlive: true }
          },
          {
            path: '/goods/importGoods',
            name: 'ImportGoods',
            component: () => import('@/views/goods/importGoods'),
            meta: { title: '输入货物', keepAlive: true }
          },
          {
            path: '/goods/transactionDetails',
            name: 'TransactionDetails',
            component: () => import('@/views/goods/transactionDetails'),
            meta: { title: '交易明细', keepAlive: true }
          }
        ]
      },
      // 票据

      {
        path: '/bill',
        redirect: '/bill/newBill',
        component: RouteView,
        meta: { title: '票据打印', icon: 'form' },
        children: [
          {
            path: '/bill/newBill',
            name: 'NewBill',
            component: () => import('@/views/bill/newBill'),
            meta: { title: '销货清单', keepAlive: true }
          },
          {
            path: '/bill/soldList',
            name: 'SoldList',
            component: () => import('@/views/bill/soldList'),
            meta: { title: '售出记录', keepAlive: true }
          }
        ]
      },
      // 货物状态
      {
        path: '/goodStstus',
        redirect: '/goodStstus/backlog',
        component: RouteView,
        meta: { title: '货物状态', icon: 'form' },
        children: [
          {
            path: '/goodStstus/backlog',
            name: 'Backlog',
            component: () => import('@/views/goodStstus/backlog'),
            meta: { title: '积压货物', keepAlive: true }
          }
        ]
      },
      {
        path: '/note/index',
        name: 'note',
        component: () => import('@/views/note/index'),
        meta: { title: '记事本/图片', keepAlive: true, icon: bxAnaalyse }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
