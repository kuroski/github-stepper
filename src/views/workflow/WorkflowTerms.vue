<template>
  <form @submit.prevent="validateAndSubmit">
    <label for="email">
      {{ $t("workflow.terms.email") }} {{ $t("mandatory") }}
      <input
        id="email"
        v-model="$v.email.$model"
        type="email"
        aria-required="true"
      />
      <div v-if="emailErrors.length">
        <small v-for="error in emailErrors" :key="error">{{ error }}</small>
      </div>
    </label>

    <label for="confirmed">
      {{ $t("workflow.terms.confirmed") }}
      <input
        id="confirmed"
        v-model="$v.confirmed.$model"
        type="checkbox"
        aria-required="true"
      />
      <div v-if="confirmedErrors.length">
        <small v-for="error in confirmedErrors" :key="error">{{ error }}</small>
      </div>
    </label>

    <WorkflowActions :back-to="{ name: 'workflow-pages-basic-information' }">
      <button class="btn btn--primary" type="submit" :disabled="$v.$anyError">
        {{ $t("workflow.submit") }}
      </button>
    </WorkflowActions>
  </form>
</template>

<script>
import { mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import WorkflowActions from "@/components/WorkflowActions";

export default {
  name: "WorkflowBasicInformation",
  components: {
    WorkflowActions
  },
  validations: {
    email: {
      required,
      email
    },
    confirmed: {
      confirmed(value) {
        return value;
      }
    }
  },
  computed: {
    ...mapState("workflow", {
      basicInformation: "basicInformation"
    }),
    email: {
      get() {
        return this.$store.state.workflow.terms.email;
      },
      set(value) {
        this.$store.commit("workflow/setTermsEmail", value);
      }
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      const field = this.$t("workflow.terms.email");
      !this.$v.email.required &&
        errors.push(
          this.$t("validation.required", {
            field
          })
        );
      !this.$v.email.email &&
        errors.push(
          this.$t("validation.email", {
            field
          })
        );
      return errors;
    },
    confirmed: {
      get() {
        return this.$store.state.workflow.terms.confirmed;
      },
      set(value) {
        this.$store.commit("workflow/setTermsConfirmed", value);
      }
    },
    confirmedErrors() {
      const errors = [];
      if (!this.$v.confirmed.$dirty) return errors;
      !this.$v.confirmed.confirmed &&
        errors.push(this.$t("validation.requiredTerm"));
      return errors;
    }
  },
  created() {
    if (this.basicInformation.validationErrors)
      return this.$router.push({
        name: "workflow-pages-basic-information",
        params: { locale: this.$i18n.locale }
      });
  },
  methods: {
    validateAndSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$store.commit("workflow/setTermsValidationErrors", true);
      } else {
        this.$store.commit("workflow/setTermsValidationErrors", false);
        this.$router.push({
          name: "workflow-pages-profile",
          params: {
            locale: this.$i18n.locale
          }
        });
      }
    }
  }
};
</script>
