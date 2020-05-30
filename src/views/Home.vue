<template>
  <div>
    <h1>{{ $t("home.header") }}</h1>

    <router-link :to="{ name: 'workflow-pages' }">
      {{ $t("home.optionPages") }}
    </router-link>

    <router-link :to="{ name: 'workflow-stepper' }">
      {{ $t("home.optionStepper") }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
