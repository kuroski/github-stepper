<template>
  <div class="checkbox">
    <label :for="id" class="checkbox__content">
      <input
        :id="id"
        :value="value"
        :checked="value"
        type="checkbox"
        v-bind="$attrs"
        :aria-required="required"
        @change="$emit('input', $event.target.checked)"
      />
      <span>{{ label }}</span>
      <slot />
    </label>

    <ul v-if="errorMessages.length" class="checkbox__errors">
      <li v-for="error in errorMessages" :key="error">{{ error }}</li>
    </ul>
  </div>
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
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    errorMessages: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.checkbox + .checkbox {
  margin-top: var(--space-5);
}

.checkbox {
  display: flex;
  flex-direction: column;
}

.checkbox__content {
  position: relative;
  display: flex;
  align-items: center;
}

.checkbox__content > input {
  margin-right: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: solid 1px var(--color-gray-500);
  color: var(--color-blue-900);
}

.checkbox__content > input::placeholder {
  color: var(--color-gray-500);
}

.checkbox__errors {
  margin-top: var(--space-2);
  margin-bottom: 0;
  list-style-position: inside;
  padding-left: 0;
  color: var(--color-red-600);
}

.checkbox__errors > li:not(:first-child) {
  margin-top: var(--space-1);
}

.checkbox__progress {
  position: relative;
  height: 2px;
  overflow: hidden;
  background-color: var(--color-blue-200);
}

.checkbox__progress::before {
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
