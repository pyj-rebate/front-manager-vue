import {
  UserLayout,
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts'
export const dynRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: {
    title: '首页',
    static: true
  },
  redirect: '/rebate',
  children: [{
    path: '/auto',
    name: 'auto',
    redirect: '/auto/completeList',
    component: PageView,
    meta: {
      title: '自动生成',
      'icon': 'code',
      keepAlive: true
    },
    children: [{
      path: '/auto/completeList',
      name: 'frame',
      component: () => import('@/views/auto/AutoList'),
      meta: {
        title: '代码生成',
        keepAlive: true
      }
    }]
  }, {
    path: '/sys',
    redirect: '/sys/user',
    component: PageView,
    meta: {
      title: '系统',
      'icon': 'setting'
    },
    children: [{
      path: '/sys/user',
      name: 'user',
      component: () => import('@/views/sys/user/UserList'),
      meta: {
        title: '用户管理',
        keepAlive: true
      }
    }, {
      path: '/sys/personal',
      name: 'personal',
      hidden: true,
      component: () => import('@/views/user/UserInfo'),
      meta: {
        title: '个人资料',
        keepAlive: true,
        hidden: true,
        static: true
      }
    }, {
      path: '/sys/role',
      name: 'role',
      component: () => import('@/views/sys/role/RoleList'),
      meta: {
        title: '角色管理',
        keepAlive: true
      }
    }, {
      path: '/sys/menu',
      name: 'menu',
      component: () => import('@/views/sys/menu/MenuList'),
      meta: {
        title: '菜单管理',
        keepAlive: true
      }
    }, {
      path: '/sys/api',
      name: 'api',
      component: () => import('@/views/sys/api/ApiList'),
      meta: {
        title: '接口管理',
        keepAlive: true
      }
    }, {
      path: '/sys/organization',
      name: 'organization',
      component: () => import('@/views/sys/organization/OrganizationList'),
      meta: {
        title: '组织机构',
        keepAlive: true
      }
    }, {
      path: '/sys/area',
      name: 'area',
      component: () => import('@/views/sys/area/AreaList'),
      meta: {
        title: '区域管理',
        keepAlive: true
      }
    }, {
      path: '/sys/dict',
      name: 'dict',
      component: () => import('@/views/sys/dict/DictList'),
      meta: {
        title: '数据字典',
        keepAlive: true
      }
    }, {
      path: '/sys/log',
      name: 'log',
      component: () => import('@/views/sys/log/LogList'),
      meta: {
        title: '操作日志',
        keepAlive: true
      }
    }]
  }, {
    path: '/example',
    component: PageView,
    meta: {
      title: '示例',
      static: true
    },
    children: [
      {
        path: '/example/bigFile',
        name: 'bigFile',
        component: () => import('@/views/example/BigFile'),
        meta: {
          title: '大文件上传',
          keepAlive: true,
          static: true
        }
      }
    ]
  }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true,
  meta: {
    static: true
  }
}]
