<template>
  <AppHeader />
  <main><RouterView /></main>
</template>

<script setup lang="ts">
import AppHeader from '../../shared/components/common/AppHeader.vue'
</script>

<style scoped>
main {
  padding: 0px 160px;
}
@media (max-width: 620px) {
  main {
    padding: 0px;
  }
}
</style>
