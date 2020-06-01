<template>
  <form @submit.prevent="validateAndSubmit">
    <h2 class="mb-5">{{ $t("workflow.terms.title") }}</h2>

    <TextField
      id="email"
      v-model="$v.email.$model"
      :label="$t('workflow.terms.email')"
      :error-messages="emailErrors"
      :placeholder="$t('workflow.terms.emailPlaceholder')"
      required
    />

    <Checkbox
      id="confirmed"
      v-model="$v.confirmed.$model"
      class="mt-5"
      type="checkbox"
      :label="$t('workflow.terms.confirmed')"
      :error-messages="confirmedErrors"
      required
    >
      <a
        href="https://ml9gky9zgaiw.i.optimole.com/o9RT94U-uj1dSAli/w:600/h:450/q:auto/https://www.chango.ca/wp-content/uploads/2019/09/spotify-spying.jpg"
        :aria-label="$t('workflow.terms.conditionLink')"
        target="_blank"
        class="ml-2"
      >
        <LinkIcon aria-hidden="true" />
        <span>{{ $t("link") }}</span>
      </a>
    </Checkbox>

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
import TextField from "@/components/TextField";
import Checkbox from "@/components/Checkbox";
import LinkIcon from "vue-material-design-icons/Link";

export default {
  name: "WorkflowBasicInformation",
  components: {
    WorkflowActions,
    TextField,
    Checkbox,
    LinkIcon
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
      !this.$v.email.required && errors.push(this.$t("validation.required"));
      !this.$v.email.email && errors.push(this.$t("validation.email"));
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
