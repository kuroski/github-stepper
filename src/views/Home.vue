<template>
  <div>
    <h1>{{ $t("home.header") }}</h1>

    <LocalizedLink :to="{ name: 'workflow-pages-introduction' }">
      {{ $t("home.optionPages") }}
    </LocalizedLink>

    <LocalizedLink :to="{ name: 'workflow-stepper' }">
      {{ $t("home.optionStepper") }}
    </LocalizedLink>
  </div>
</template>

<script>
import LocalizedLink from "@/components/LocalizedLink";

export default {
  name: "Home",
  components: {
    LocalizedLink
  },
  created() {
    this.$store.commit("workflow/resetState");
  }
};
</script>
