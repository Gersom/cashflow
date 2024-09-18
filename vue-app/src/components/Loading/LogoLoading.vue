<script setup>
import IconLogo from '@icons/others/IconLogo.vue'
import LoadingComponent from '@components/Loading/Loading.vue'
</script>

<template>
  <div class='logo-title'>
    <div class="logo-icon">
      <IconLogo />
    </div>
    <div class="logo-loading">
      <LoadingComponent />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .logo-icon {
    height: 60px;
  }

  .logo-loading {
    height: 30px;
    margin-top: 15px;
  }
}
</style>
