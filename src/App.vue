<template>
  <div class="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style scoped>
.app {
  padding: var(--space-5);
  min-width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
</style>
