import Vue from "vue";

const STATUS_PENDING = "PENDING";
const STATUS_FULFILLED = "FULFILLED";
const STATUS_REJECTED = "REJECTED";

const getDefaultState = () => ({
  status: null,
  basicInformation: {
    validationErrors: true,
    firstName: "",
    lastName: "",
    username: ""
  },
  terms: {
    validationErrors: true,
    email: "",
    confirmed: false
  },
  github: {}
});

export default {
  namespaced: true,
  state: getDefaultState,
  getters: {
    isGithubUserExists(state) {
      return state.github && Object.keys(state.github).length > 0;
    },
    isPendingGithubUserSearch(state) {
      return state.status === STATUS_PENDING;
    }
  },
  actions: {
    init({ dispatch, state, getters }) {
      const username = state.basicInformation.username;
      if (!getters.isGithubUserExists && username)
        dispatch("searchGithubUser", username);
    },
    searchGithubUser({ commit }, username) {
      commit("setStatus", STATUS_PENDING);
      return this.$api.getByUsername(username).then(
        response => {
          commit("setStatus", STATUS_FULFILLED);
          commit("setGithub", response);
        },
        error => {
          commit("setStatus", STATUS_REJECTED);
          commit("setGithub", {});
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
    setBasicInformationFirstName(state, payload) {
      Vue.set(state.basicInformation, "firstName", payload);
    },
    setBasicInformationLastName(state, payload) {
      Vue.set(state.basicInformation, "lastName", payload);
    },
    setBasicInformationUsername(state, payload) {
      Vue.set(state, "github", {});
      Vue.set(state.basicInformation, "username", payload);
    },
    setBasicInformationValidationErrors(state, payload) {
      Vue.set(state.basicInformation, "validationErrors", payload);
    },
    setTermsEmail(state, payload) {
      Vue.set(state.terms, "email", payload);
    },
    setTermsConfirmed(state, payload) {
      Vue.set(state.terms, "confirmed", payload);
    },
    setTermsValidationErrors(state, payload) {
      Vue.set(state.terms, "validationErrors", payload);
    },
    setGithub(state, payload) {
      Vue.set(state, "github", payload);
    },
    setStatus(state, payload) {
      Vue.set(state, "status", payload);
    }
  }
};
