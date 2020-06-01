<template>
  <router-link
    :to="toWithLocale"
    v-bind="$attrs"
    :class="{
      btn: ['primary', 'secondary'].includes(type),
      'btn--primary': type === 'primary',
      'btn--secondary': type === 'secondary'
    }"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  name: "LocalizedLink",
  props: {
    to: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: "link",
      validator(value) {
        return ["link", "primary", "secondary"].includes(value);
      }
    }
  },
  computed: {
    toWithLocale() {
      const params = this.to.params || {};
      return {
        ...this.to,
        params: {
          ...params,
          locale: this.$i18n.locale
        }
      };
    }
  }
};
</script>
