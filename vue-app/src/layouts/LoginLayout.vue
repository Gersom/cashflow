<script setup>
import CardTitle from '@components/CardTitle/CardTitle.vue'
import LogoTitle from '@components/LogoTitle/LogoTitle.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Iniciar sesión'
  }
})
</script>

<template>
  <div class='login-layout'>
    <div class="card">
      <div class="logo">
        <LogoTitle />
      </div>
      <CardTitle :title="props.title" />
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--primary-color);
  background: linear-gradient(45deg, var(--secondary-color) 0%, var(--primary-color) 100%);

  .card {
    width: 100%;
    max-width: 400px;
    padding: 50px 25px;
    border-radius: 15px;
    background: var(--background-color2);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  .logo {
    margin-bottom: 25px;
  }
}
</style>
