import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import modal from "./plugins/ModalWindow";
import menu from "./plugins/ContextMenu";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(modal);
Vue.use(menu);

new Vue({
  render: (h) => h(App),
  store,
  router,
  vuetify,
}).$mount("#app");
