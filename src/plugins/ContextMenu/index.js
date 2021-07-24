export default {
  install(Vue) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    Vue.prototype.$menu = {
      EventBus: new Vue(),
      show(event) {
        this.EventBus.$emit("onToggleShow", { event });
      },
    };
  },
};
