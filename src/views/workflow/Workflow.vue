<template>
  <div class="workflow shadow rounded-lg">
    <WorkflowWizard :steps="steps" />

    <transition
      :enter-active-class="enterAnimation"
      :leave-active-class="leaveAnimation"
      mode="out-in"
      appear
    >
      <router-view class="workflow__content" />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import WorkflowWizard from "@/components/WorkflowWizard";

export default {
  name: "Workflow",
  components: {
    WorkflowWizard
  },
  data: () => ({
    enterAnimation: "",
    leaveAnimation: ""
  }),
  computed: {
    ...mapState("workflow", {
      basicInformation: "basicInformation",
      terms: "terms"
    }),
    currentPageIndex() {
      return this.steps.findIndex(step => this.$route.name === step.link);
    },
    previousPageIndex() {
      return this.steps.findIndex(step => this.$route.name === step.link);
    },
    steps() {
      return [
        {
          title: this.$t("workflow.introduction.title"),
          link: "workflow-pages-introduction",
          disabled: false
        },
        {
          title: this.$t("workflow.basicInformation.title"),
          link: "workflow-pages-basic-information",
          disabled:
            this.basicInformation.validationErrors &&
            this.$route.name !== "workflow-pages-basic-information"
        },
        {
          title: this.$t("workflow.terms.title"),
          link: "workflow-pages-terms",
          disabled:
            this.terms.validationErrors &&
            this.$route.name !== "workflow-pages-terms"
        },
        {
          title: this.$t("workflow.profile.title"),
          link: "workflow-pages-profile",
          disabled:
            this.terms.validationErrors &&
            this.$route.name !== "workflow-pages-profile"
        }
      ];
    }
  },
  watch: {
    $route(to, from) {
      const toIndex = this.steps.findIndex(step => to.name === step.link);
      const fromIndex = this.steps.findIndex(step => from.name === step.link);
      this.enterAnimation =
        fromIndex < toIndex ? "animated fadeInLeft" : "animated fadeInRight";
      this.leaveAnimation =
        fromIndex > toIndex ? "animated fadeOutLeft" : "animated fadeOutRight";
    }
  }
};
</script>

<style scoped>
.workflow {
  background-color: white;
  overflow: hidden;
  max-width: 32rem;
  width: 100%;
  margin: 0 auto;
}

.workflow__content {
  padding: var(--space-5) var(--space-8);
}
</style>
