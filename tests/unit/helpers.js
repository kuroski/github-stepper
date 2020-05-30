import { render } from "@testing-library/vue";
import i18n from "@/i18n";
import routes from "@/router/routes";

export const renderWithDependencies = (
  component,
  options = {},
  callback = a => a
) =>
  render(component, { routes, ...options }, vue => ({
    ...callback(vue),
    i18n
  }));
