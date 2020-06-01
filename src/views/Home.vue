<template>
  <div class="home rounded-lg shadow">
    <div class="home__logo">
      <Logo />
    </div>

    <h1>{{ $t("home.header") }}</h1>

    <LocalizedLink
      :to="{ name: 'workflow-pages-introduction' }"
      data-testid="pages-button"
    >
      {{ $t("home.optionPages") }} <ChevronRightIcon decorative />
    </LocalizedLink>

    <LocalizedLink :to="{ name: 'stepper' }" data-testid="stepper-button">
      {{ $t("home.optionStepper") }} <ChevronRightIcon decorative />
    </LocalizedLink>
  </div>
</template>

<script>
import ChevronRightIcon from "vue-material-design-icons/ChevronRight";
import Logo from "@/components/Logo";
import LocalizedLink from "@/components/LocalizedLink";

export default {
  name: "Home",
  components: {
    Logo,
    LocalizedLink,
    ChevronRightIcon
  },
  created() {
    this.$store.commit("workflow/resetState");
  }
};
</script>

<style scoped>
.home {
  background-color: white;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  max-width: 42rem;
  margin: 0 auto;
}

.home__logo {
  position: relative;
  grid-column: 1 / -1;
  text-align: center;
  padding-top: var(--space-10);
  padding-bottom: var(--space-3);
}

.home > h1 {
  margin: 0;
  padding-left: var(--space-10);
  padding-right: var(--space-10);
  padding-bottom: var(--space-10);
  font-weight: var(--font-light);
  grid-column: 1 / -1;
}

.home > a {
  padding: var(--space-5);
  color: var(--color-blue-100);
  background-color: var(--color-blue-700);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  border-radius: 0;
}

.home > a:hover {
  background-color: var(--color-blue-800);
}

.home > a:first-of-type {
  border-right: solid 1px var(--color-blue-100);
}
</style>
