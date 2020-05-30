import { render } from "@testing-library/vue";
import Vuei18n from "vue-i18n";
import routes from "@/router/routes";
import en from "@/locales/en";

export const renderWithDependencies = (
  component,
  options = {},
  callback = () => {}
) =>
  render(component, { routes, ...options }, vue => {
    vue.use(Vuei18n);

    const i18n = new Vuei18n({
      locale: "en",
      fallbackLocale: "en",
      messages: { en }
    });

    const result = callback(vue);
    return { ...result, i18n };
  });
