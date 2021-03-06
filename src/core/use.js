import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'

// ext library
import VueClipboard from 'vue-clipboard2'
import PermissionHelper from '@/utils/helper/permission'
import uploader from 'vue-simple-uploader'
// import '@/components/use'
// import './directives/action'
import './directives/authorize'
import UUID from 'vue-uuid'
VueClipboard.config.autoSetContainer = true
Vue.use(UUID)
Vue.use(Antd)
Vue.use(Viser)
Vue.use(uploader)
Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)
