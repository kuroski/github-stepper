<template>
  <router-link :to="toWithLocale" v-bind="$attrs">
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
