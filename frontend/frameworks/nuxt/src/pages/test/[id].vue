<template>
  {{ route.params.id }}
  <NuxtLink to="/">
    test
  </NuxtLink>
  <img src="/image.jpg">
</template>

<script setup lang="ts">

  const route = useRoute()
  console.log(route)

  useHead({
    title: 'Teststestest'
  })

</script>

<style scoped>

</style>
