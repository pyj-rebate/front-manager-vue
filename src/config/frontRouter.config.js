import {
  BlankLayout
} from '@/layouts'
export const frontRouterMap = {
  path: '/front',
  name: 'front',
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
  }]
}
