<template>
  <form @submit.prevent="validateAndSubmit">
    <label for="firstName">
      {{ $t("workflow.basicInformation.firstName") }} {{ $t("mandatory") }}
      <input
        id="firstName"
        v-model="$v.firstName.$model"
        type="text"
        aria-required="true"
      />
      <div v-if="firstNameErrors.length">
        <small v-for="error in firstNameErrors" :key="error">{{ error }}</small>
      </div>
    </label>

    <label for="lastName">
      {{ $t("workflow.basicInformation.lastName") }} {{ $t("mandatory") }}
      <input
        id="lastName"
        v-model="$v.lastName.$model"
        type="text"
        aria-required="true"
      />
      <div v-if="lastNameErrors.length">
        <small v-for="error in lastNameErrors" :key="error">{{ error }}</small>
      </div>
    </label>

    <label for="username">
      {{ $t("workflow.basicInformation.username") }} {{ $t("mandatory") }}
      <input
        id="username"
        v-model.trim="$v.username.$model"
        v-debounce="validateGithubUser"
        type="text"
        aria-required="true"
      />
      <small v-if="isPendingGithubUserSearch">{{ $t("loading") }}</small>
      <div v-if="usernameErrors.length">
        <small v-for="error in usernameErrors" :key="error">{{ error }}</small>
      </div>
    </label>

    <LocalizedLink :to="{ name: 'workflow-pages-introduction' }">
      {{ $t("workflow.back") }}
    </LocalizedLink>

    <button type="submit" :disabled="$v.$anyError">
      {{ $t("workflow.next") }}
    </button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import LocalizedLink from "@/components/LocalizedLink";

export default {
  name: "WorkflowBasicInformation",
  components: {
    LocalizedLink
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    username: {
      required,
      exists() {
        return this.isGithubUserExists;
      }
    }
  },
  computed: {
    ...mapGetters({
      isGithubUserExists: "workflow/isGithubUserExists",
      isPendingGithubUserSearch: "workflow/isPendingGithubUserSearch"
    }),
    firstName: {
      get() {
        return this.$store.state.workflow.basicInformation.firstName;
      },
      set(value) {
        this.$store.commit("workflow/setBasicInformationFirstName", value);
      }
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required &&
        errors.push(
          this.$t("validation.required", {
            field: this.$t("workflow.basicInformation.firstName")
          })
        );
      return errors;
    },
    lastName: {
      get() {
        return this.$store.state.workflow.basicInformation.lastName;
      },
      set(value) {
        this.$store.commit("workflow/setBasicInformationLastName", value);
      }
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required &&
        errors.push(
          this.$t("validation.required", {
            field: this.$t("workflow.basicInformation.lastName")
          })
        );
      return errors;
    },
    username: {
      get() {
        return this.$store.state.workflow.basicInformation.username;
      },
      set(value) {
        this.$store.commit("workflow/setBasicInformationUsername", value);
      }
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      const field = this.$t("workflow.basicInformation.username");
      !this.$v.username.required &&
        errors.push(
          this.$t("validation.required", {
            field
          })
        );
      !this.$v.username.exists &&
        errors.push(this.$t("validation.unexistingUser"));
      return errors;
    }
  },
  methods: {
    ...mapActions({
      searchGithubUser: "workflow/searchGithubUser"
    }),
    validateAndSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$store.commit(
          "workflow/setBasicInformationValidationErrors",
          true
        );
      } else {
        this.$store.commit(
          "workflow/setBasicInformationValidationErrors",
          false
        );
        this.$router.push({
          name: "workflow-pages-terms",
          locale: this.$i18n.locale
        });
      }
    },
    validateGithubUser() {
      this.searchGithubUser(this.username).catch(() => {});
    }
  }
};
</script>
