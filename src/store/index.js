import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  plugins: [new VuexPersistence().plugin],
});

export default store;
