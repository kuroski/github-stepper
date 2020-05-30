import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

Vue.config.productionTip = false;

Vue.use(Vuelidate);

if (process.env.NODE_ENV !== "production") {
  Vue.use(import("vue-axe"));
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
