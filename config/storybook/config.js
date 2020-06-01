import "normalize.css";
import "vue-material-design-icons/styles.css";
import "@/assets/main.css";
import { addDecorator } from "@storybook/vue";
import registerPlugins from "@/plugins";
import router from "@/router";
import store from "@/store";
import i18n from "@/i18n";

registerPlugins({});

addDecorator(() => ({
  router,
  store,
  i18n,
  template: "<story style='padding: 5rem;' />"
}));
