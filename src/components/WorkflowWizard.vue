<template>
  <div data-testid="workflow-wizard">
    <div v-for="step in steps" :key="step.link">
      <span v-if="step.disabled">{{ step.title }}</span>
      <LocalizedLink
        v-else
        :to="{ name: step.link }"
        active-class="workflow-wizzard__step--active"
      >
        {{ step.title }}
      </LocalizedLink>
    </div>
  </div>
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
