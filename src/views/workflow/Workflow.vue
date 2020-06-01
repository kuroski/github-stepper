<template>
  <div class="workflow shadow rounded-lg">
    <WorkflowWizard :steps="steps" />
    <router-view class="workflow__content" />
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
  computed: {
    ...mapState("workflow", {
      basicInformation: "basicInformation",
      terms: "terms"
    }),
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
