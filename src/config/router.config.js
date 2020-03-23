import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
/* import { bxAnaalyse } from '@/core/icons' */
import { dynRouterMap } from './dynRouter.config'
import { frontRouterMap } from './frontRouter.config'

export const asyncRouterMap = dynRouterMap

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [frontRouterMap,
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
      }
    ]
  },

  {
    path: '/403',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/500',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500')
  }

]
