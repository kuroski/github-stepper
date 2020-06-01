<template>
  <div>
    <h1>{{ $t("workflow.introduction.title") }}</h1>
    <p>
      {{ $t("workflow.introduction.description") }}
    </p>

    <WorkflowActions :back-to="{ name: 'home' }">
      <LocalizedLink
        :to="{ name: 'workflow-pages-basic-information' }"
        type="primary"
      >
        {{ $t("workflow.next") }}
      </LocalizedLink>
    </WorkflowActions>
  </div>
</template>

<script>
import LocalizedLink from "@/components/LocalizedLink";
import WorkflowActions from "@/components/WorkflowActions";

export default {
  name: "WorkflowIntroduction",
  components: {
    LocalizedLink,
    WorkflowActions
  }
};
</script>

<style scoped>
h1 {
  margin-top: 0;
  margin-bottom: var(--space-5);
}
</style>
