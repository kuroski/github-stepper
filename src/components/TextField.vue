<template>
  <label
    :for="id"
    class="text-field"
    :class="{ 'text-field--error': hasErrors }"
  >
    <span>{{ label }}</span>
    <input
      :id="id"
      :value="value"
      :type="type"
      v-bind="$attrs"
      :aria-required="required"
      class="shadow rounded"
      @input="$emit('input', $event.target.value)"
    />

    <div
      v-if="loading"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      class="text-field__progress"
    ></div>

    <ul v-if="hasErrors" class="text-field__errors">
      <li v-for="error in errorMessages" :key="error">{{ error }}</li>
    </ul>
  </label>
</template>

<script>
export default {
  name: "TextField",
  props: {
    id: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    errorMessages: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasErrors() {
      return this.errorMessages.length > 0;
    }
  }
};
</script>

<style scoped>
.text-field + .text-field {
  margin-top: var(--space-5);
}

.text-field {
  position: relative;
  display: flex;
  flex-direction: column;
}

.text-field > span {
  margin-bottom: var(--space-2);
}

.text-field--error > span::after {
  content: " *";
  color: var(--color-red-600);
}

.text-field > input {
  padding: var(--space-2) var(--space-3);
  border: solid 1px var(--color-gray-500);
  color: var(--color-blue-900);
}

.text-field > input::placeholder {
  color: var(--color-gray-500);
}

.text-field__errors {
  margin-top: var(--space-2);
  margin-bottom: 0;
  list-style-position: inside;
  padding-left: 0;
  color: var(--color-red-600);
}

.text-field__errors > li:not(:first-child) {
  margin-top: var(--space-1);
}

.text-field__progress {
  position: relative;
  height: 2px;
  overflow: hidden;
  background-color: var(--color-blue-200);
}

.text-field__progress::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--color-blue-600);
  animation: indeterminate 1s infinite linear;
  transform-origin: 0% 50%;
}

@keyframes indeterminate {
  0% {
    transform: translateX(0) scaleX(0);
  }
  40% {
    transform: translateX(0) scaleX(0.4);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
  }
}
</style>
