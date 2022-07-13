import Modal from './modal'
export default {
  install(Vue, options) {
    this.EventBus = new Vue()
    Vue.component("vue-modal-confirm", Modal);
    Vue.prototype.$confirm = (options) => {
      this.EventBus.$emit("showModalConfirm", options);
    };
  },
};
