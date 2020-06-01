<template>
  <form @submit.prevent="validateAndSubmit">
    <h2 class="mb-5">{{ $t("workflow.basicInformation.title") }}</h2>

    <TextField
      id="firstName"
      v-model="$v.firstName.$model"
      :label="$t('workflow.basicInformation.firstName')"
      :error-messages="firstNameErrors"
      :placeholder="$t('workflow.basicInformation.firstNamePlaceholder')"
      required
    />

    <TextField
      id="lastName"
      v-model="$v.lastName.$model"
      :label="$t('workflow.basicInformation.lastName')"
      :error-messages="lastNameErrors"
      :placeholder="$t('workflow.basicInformation.lastNamePlaceholder')"
      required
    />

    <TextField
      id="username"
      v-model="$v.username.$model"
      v-debounce="validateGithubUser"
      :label="$t('workflow.basicInformation.username')"
      :error-messages="usernameErrors"
      :placeholder="$t('workflow.basicInformation.usernamePlaceholder')"
      :loading="isPendingGithubUserSearch"
      required
    />

    <WorkflowActions :back-to="{ name: 'workflow-pages-introduction' }">
      <button class="btn btn--primary" type="submit" :disabled="$v.$anyError">
        {{ $t("workflow.next") }}
      </button>
    </WorkflowActions>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import WorkflowActions from "@/components/WorkflowActions";
import TextField from "@/components/TextField";

export default {
  name: "WorkflowBasicInformation",
  components: {
    WorkflowActions,
    TextField
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
        errors.push(this.$t("validation.required"));
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
      !this.$v.lastName.required && errors.push(this.$t("validation.required"));
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
      !this.$v.username.required && errors.push(this.$t("validation.required"));
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
