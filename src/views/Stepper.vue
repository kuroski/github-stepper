<template>
  <FormWizard
    class="stepper rounded-lg shadow"
    :next-button-text="$t('workflow.next')"
    :back-button-text="$t('workflow.back')"
    :finish-button-text="$t('workflow.submit')"
    step-size="xs"
    color="var(--color-blue-700)"
    error-color="var(--color-red-600)"
  >
    <template #title><div></div></template>
    <template #footer="props">
      <div class="wizard-footer-left">
        <button
          v-if="props.activeTabIndex > 0"
          class="btn btn--secondary"
          type="button"
          @click="props.prevTab()"
        >
          {{ $t("workflow.back") }}
        </button>
      </div>
      <div class="wizard-footer-right">
        <button
          v-if="!props.isLastStep"
          class="btn btn--primary"
          type="button"
          @click="props.nextTab()"
        >
          {{ $t("workflow.next") }}
        </button>
      </div>
    </template>

    <TabContent :title="$t('workflow.introduction.title')">
      <h1>{{ $t("workflow.introduction.title") }}</h1>
      <p>
        {{ $t("workflow.introduction.description") }}
      </p>
    </TabContent>

    <TabContent
      :title="$t('workflow.basicInformation.title')"
      :before-change="validateBasicInformationForm"
    >
      <BasicInformationForm
        ref="basicInformation"
        no-actions
        @submit="basicInformationSubmitted"
      />
    </TabContent>

    <TabContent
      :title="$t('workflow.terms.title')"
      :before-change="validateTermsForm"
    >
      <TermsForm ref="terms" no-actions @submit="termsSubmitted" />
    </TabContent>

    <TabContent :title="$t('workflow.profile.title')">
      <Profile
        v-if="profile && basicInformation && terms"
        :profile="profile"
        :basic-information="basicInformation"
        :terms="terms"
      />
    </TabContent>
  </FormWizard>
</template>

<script>
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { FormWizard, TabContent } from "vue-form-wizard";
import BasicInformationForm from "@/components/BasicInformationForm";
import TermsForm from "@/components/TermsForm";
import Profile from "@/components/Profile";

export default {
  name: "Stepper",
  components: {
    FormWizard,
    TabContent,
    BasicInformationForm,
    TermsForm,
    Profile
  },
  data: () => ({
    profile: null,
    basicInformation: null,
    terms: null
  }),
  methods: {
    validateBasicInformationForm() {
      return this.$refs.basicInformation.submitForm();
    },
    validateTermsForm() {
      return this.$refs.terms.submitForm();
    },
    basicInformationSubmitted({ github, ...response }) {
      this.profile = github;
      this.basicInformation = response;
    },
    termsSubmitted(response) {
      this.terms = response;
    }
  }
};
</script>

<style scoped>
.stepper {
  background-color: white;
  overflow: hidden;
  max-width: 42rem;
  width: 100%;
  margin: 0 auto;
  padding-top: var(--space-2);
}

.stepper >>> .wizard-header {
  padding: 0;
}

.stepper >>> .wizard-tab-content {
  padding: var(--space-10) var(--space-8);
}

.stepper >>> .wizard-card-footer {
  padding: 0 var(--space-8);
}
</style>
