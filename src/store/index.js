import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import workflow from "@/store/workflow";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  plugins: [new VuexPersistence().plugin],
  modules: {
    workflow
  }
});

export default store;
