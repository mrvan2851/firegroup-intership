import Vue from 'vue'
import mixin from './mixin'
import VueConfirm from '@/assets/vendor/vue-confirm'
Vue.mixin(mixin)
Vue.prototype.$eventBus = new Vue()

Vue.use(VueConfirm)