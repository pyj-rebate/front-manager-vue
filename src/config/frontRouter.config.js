import {
  BlankLayout
} from '@/layouts'
export const frontRouterMap = {
  path: '/',
  name: 'index',
  component: BlankLayout,
  meta: {
    title: '核对',
    static: true
  },
  redirect: '/rebate',
  children: [{
    path: '/rebate',
    name: 'rebate',
    component: () => import('@/views/rebate/Rebate'),
    meta: {
      title: '财务核对',
      'icon': 'code',
      keepAlive: true
    }
  }, {
    path: '/rebate/finance',
    name: 'finance',
    component: () => import('@/views/finance/FinanceList'),
    meta: {
      title: '财务核对',
      'icon': 'code',
      keepAlive: true
    }
  }]
}
