import Vue from "vue";
import axios from "axios";
import api from "@/plugins/api";
import "@/plugins/vue-axe";
import "@/plugins/vuelidate";
import "@/plugins/v-debounce";

const extendAxiosInstance = () => {
  [
    "request",
    "delete",
    "get",
    "head",
    "options",
    "post",
    "put",
    "patch"
  ].forEach(method => {
    axios[`$${method}`] = function() {
      return this[method].apply(this, arguments).then(res => res && res.data);
    };
  });
};

export default store => {
  extendAxiosInstance();

  api({ $axios: axios }, (namespace, apiInstance) => {
    Vue.prototype[`$${namespace}`] = apiInstance;
    store[`$${namespace}`] = apiInstance;
  });
};
