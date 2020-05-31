<template>
  <div>
    <h1>{{ $t("workflow.introduction.title") }}</h1>
    <p>
      {{ $t("workflow.introduction.description") }}
    </p>

    <LocalizedLink :to="{ name: 'home' }">
      {{ $t("workflow.back") }}
    </LocalizedLink>

    <LocalizedLink :to="{ name: 'workflow-pages-basic-information' }">
      {{ $t("workflow.next") }}
    </LocalizedLink>
  </div>
</template>

<script>
import LocalizedLink from "@/components/LocalizedLink";

export default {
  name: "WorkflowIntroduction",
  components: {
    LocalizedLink
  }
};
</script>
