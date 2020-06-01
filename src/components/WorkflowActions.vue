<template>
  <div class="workflow-actions">
    <slot name="back">
      <LocalizedLink :to="backTo" type="secondary">
        {{ $t("workflow.back") }}
      </LocalizedLink>
    </slot>

    <slot />
  </div>
</template>

<script>
import LocalizedLink from "@/components/LocalizedLink";

export default {
  name: "WorkflowActions",
  components: {
    LocalizedLink
  },
  props: {
    backTo: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.workflow-actions {
  margin-top: var(--space-5);
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
