import store from '@/store'

const PERMISSION_ENUM = {
  'add': { key: 'add', label: '新增' },
  'delete': { key: 'delete', label: '删除' },
  'edit': { key: 'edit', label: '修改' },
  'query': { key: 'query', label: '查询' },
  'get': { key: 'get', label: '详情' },
  'enable': { key: 'enable', label: '启用' },
  'disable': { key: 'disable', label: '禁用' },
  'import': { key: 'import', label: '导入' },
  'export': { key: 'export', label: '导出' }
}

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  /**
   *  使用v-if="$authorize('xxx')"
   *  其中xxx为操作码
   */
  !Vue.prototype.$authorize && Object.defineProperties(Vue.prototype, {
    $authorize: {
      get () {
        const _this = this
        return (operationCode) => {
          /* 用户是否超级管理员 */
          const { adminFlag } = _this.$store.getters.userInfo
          const operationCodes = _this.$store.getters.operationCodes
          return adminFlag === '1' || operationCodes.includes(operationCode)
        }
      }
    }
  })
  /* 废弃 */
  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        const _this = this
        return (permissions) => {
          const [permission, action] = permissions.split('.')
          const permissionList = _this.$store.getters.roles.permissions
          return permissionList.find((val) => {
            return val.permissionId === permission
          }).actionList.findIndex((val) => {
            return val === action
          }) > -1
        }
      }
    }
  })
  /* 废弃 */
  !Vue.prototype.$enum && Object.defineProperties(Vue.prototype, {
    $enum: {
      get () {
        // const _this = this;
        return (val) => {
          let result = PERMISSION_ENUM
          val && val.split('.').forEach(v => {
            result = result && result[v] || null
          })
          return result
        }
      }
    }
  })
}

export default plugin
