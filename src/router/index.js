import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import i18n, { loadLocaleMessagesAsync } from "@/i18n";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.params.locale === from.params.locale) {
    next();
    return;
  }

  const { locale } = to.params;

  loadLocaleMessagesAsync(locale).then(() => {
    document.documentElement.lang = locale;
    document.title = i18n.t("app.title");
  });

  next();
});

export default router;
