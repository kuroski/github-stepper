<template>
  <form @submit.prevent="submitForm">
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
        <LinkIcon decorative />
        <span>{{ $t("link") }}</span>
      </a>
    </Checkbox>

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
import { required, email } from "vuelidate/lib/validators";
import TextField from "@/components/TextField";
import Checkbox from "@/components/Checkbox";
import LinkIcon from "vue-material-design-icons/Link";

export default {
  name: "TermsForm",
  components: {
    TextField,
    Checkbox,
    LinkIcon
  },
  props: {
    noActions: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    email: "",
    confirmed: false
  }),
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
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push(this.$t("validation.required"));
      !this.$v.email.email && errors.push(this.$t("validation.email"));
      return errors;
    },
    confirmedErrors() {
      const errors = [];
      if (!this.$v.confirmed.$dirty) return errors;
      !this.$v.confirmed.confirmed &&
        errors.push(this.$t("validation.requiredTerm"));
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
          email: this.email,
          confirmed: this.confirmed
        });
        return true;
      }
    }
  }
};
</script>
