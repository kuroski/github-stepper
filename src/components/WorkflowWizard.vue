<template>
  <nav class="workflow-wizard" data-testid="workflow-wizard">
    <div v-for="step in steps" :key="step.link">
      <span v-if="step.disabled" class="workflow-wizard__step">
        {{ step.title }}
      </span>
      <LocalizedLink
        v-else
        class="workflow-wizard__step"
        :to="{ name: step.link }"
        exact-active-class="workflow-wizzard__step--active"
      >
        {{ step.title }}
      </LocalizedLink>
    </div>
  </nav>
</template>

<script>
import { array, guard, object, string, boolean, nullable } from "decoders";
import LocalizedLink from "@/components/LocalizedLink";

const stepDecoder = object({
  title: string,
  link: string,
  disabled: boolean
});

const stepsDecoder = guard(nullable(array(stepDecoder)));

export default {
  name: "WorkflowWizard",
  components: {
    LocalizedLink
  },
  props: {
    steps: {
      type: Array,
      required: true,
      validator: stepsDecoder
    }
  }
};
</script>

<style scoped>
.workflow-wizard {
  counter-reset: steps;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: var(--space-5) var(--space-8);
  background-color: var(--color-blue-300);
}

.workflow-wizard > div {
  counter-increment: steps;
  position: relative;
  color: var(--color-blue-900);
}

.workflow-wizard > div:not(:first-child) {
  margin-top: var(--space-2);
}

.workflow-wizard__step {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
}

a.workflow-wizard__step {
  color: var(--color-blue-900);
}

a.workflow-wizard__step:hover {
  color: var(--color-blue-600);
}

.workflow-wizard__step::before {
  content: counter(steps) ". ";
}

.workflow-wizzard__step--active::after {
  content: "←";
}
</style>
