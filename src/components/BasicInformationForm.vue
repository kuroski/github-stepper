<template>
  <form @submit.prevent="submitForm">
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

    <slot v-if="!noActions" name="actions">
      <button
        class="btn btn--primary mt-5"
        type="submit"
        :disabled="$v.$anyError"
      >
        {{ $t("workflow.submit") }}
      </button>
    </slot>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import TextField from "@/components/TextField";

export default {
  name: "BasicInformationForm",
  components: {
    TextField
  },
  props: {
    noActions: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isPendingGithubUserSearch: false,
    github: null,
    firstName: "",
    lastName: "",
    username: ""
  }),
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
        return !!this.github;
      }
    }
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required &&
        errors.push(this.$t("validation.required"));
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push(this.$t("validation.required"));
      return errors;
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
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        this.$emit("submit", {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          github: this.github
        });
        return true;
      }
    },
    validateGithubUser() {
      this.isPendingGithubUserSearch = true;
      return this.$api
        .getByUsername(this.username)
        .then(
          response => {
            this.github = response;
          },
          _error => {
            // TODO: handle form error
          }
        )
        .finally(() => {
          this.isPendingGithubUserSearch = false;
        });
    }
  }
};
</script>
