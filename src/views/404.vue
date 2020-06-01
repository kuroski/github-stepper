<template>
  <div>
    <h1>404</h1>

    <p>{{ $t("404.description") }}</p>

    <LocalizedLink :to="{ name: 'home' }" type="primary">
      {{ $t("404.backButton") }}
    </LocalizedLink>
  </div>
</template>

<script>
import LocalizedLink from "@/components/LocalizedLink";

export default {
  name: "Page404",
  components: {
    LocalizedLink
  }
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  padding: var(--space-5);
  margin: 0 auto;
  text-align: center;
}

h1 {
  color: var(--color-blue-600);
  font-size: 10rem;
  background-image: url(https://source.unsplash.com/random);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.h1:before,
.h1:after {
  position: absolute;
  content: "";
}

/* Background */
.h1:before {
  z-index: -2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: inherit;
}

/* Text Background (black zone) */
.h1:after {
  position: absolute;
  z-index: -1;
  top: 0.125em;
  right: 0.125em;
  bottom: 0.125em;
  left: 0.125em;
  background-color: #000;
}

p {
  font-weight: var(--font-light);
}
</style>
