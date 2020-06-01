import "normalize.css";
import "vue-material-design-icons/styles.css";
import "@/assets/main.css";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import registerPlugins from "@/plugins";

Vue.config.productionTip = false;

registerPlugins(store);

new Vue({
  router,
  store,
  i18n,
  created() {
    this.$store.dispatch("workflow/init");
  },
  render: h => h(App)
}).$mount("#app");
