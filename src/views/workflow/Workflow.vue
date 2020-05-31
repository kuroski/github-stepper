<template>
  <div>
    <WorkflowWizard :steps="steps" />
    <router-view />
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
        }
      ];
    }
  }
};
</script>
