import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const loadedLanguagesCache = [];

function loadLocaleMessages() {
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages()
});

export function loadLocaleMessagesAsync(locale) {
  if (loadedLanguagesCache.length > 0 && i18n.locale === locale) {
    return Promise.resolve(locale);
  }

  // If the language was already loaded
  if (loadedLanguagesCache.includes(locale)) {
    i18n.locale = locale;
    return Promise.resolve(locale);
  }

  // If the language hasn't been loaded yet
  return import(
    /* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.json`
  ).then(messages => {
    i18n.setLocaleMessage(locale, messages.default);
    loadedLanguagesCache.push(locale);
    i18n.locale = locale;
    return Promise.resolve(locale);
  });
}

export default i18n;
