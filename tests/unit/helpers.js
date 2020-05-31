import { render } from "@testing-library/vue";
import registerPlugins from "@/plugins";
import i18n from "@/i18n";
import routes from "@/router/routes";

export const renderWithDependencies = (
  component,
  options = {},
  callback = a => a
) => {
  const mergedOptions = {
    routes,
    store: {
      strict: true,
      modules: {
        workflow
      }
    },
    ...options
  };

  return render(component, mergedOptions, (vue, store, router) => {
    registerPlugins(store);

    const result = callback(vue, store, router) || {};

    return {
      vue,
      store,
      router,
      i18n,
      ...result
    };
  });
};
