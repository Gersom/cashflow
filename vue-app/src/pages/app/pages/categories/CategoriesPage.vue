<script setup>
import MainContainer from '@app-page/layouts/MainContainer.vue'
import Head from '@app-page/components/Head.vue'

defineEmits(['vnode-unmounted'])
</script>

<template>
  <div class="categories-page">
    <MainContainer>
      <Head />

      <P>Categories page</P>
    </MainContainer>
  </div>
</template>

<style lang="scss" scoped>
</style>