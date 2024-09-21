<script setup>
import { apiAuth } from '@src/services/api'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CardTitle from '@components/CardTitle/CardTitle.vue'
import LogoTitle from '@components/LogoTitle/LogoTitle.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Iniciar sesión'
  },
  logoTitle: {
    type: String,
    default: ''
  },
  verifySession: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

onMounted(async () => {
  if (props.verifySession) {
    try {
      const { data } = await apiAuth.post({ url: '/token/verify' })
      if (data?.success) {
        router.push({ name: 'AppHome' })
      }
    } catch (error) {
      if (error.request.status === 401) {
        console.log('Session expired')
      }
    }
  }
})
</script>

<template>
  <div class="login-layout">
    <div class="card">
      <div class="logo">
        <LogoTitle
          :title="!props.logoTitle"
        />
        <p
          v-if="!!props.logoTitle"
          class="logo-subtitle"
        >
          {{ props.logoTitle }}
        </p>
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
    padding: 30px 25px;
    border-radius: 15px;
    background: var(--background-color2);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    .logo-subtitle {
      background: linear-gradient(
        90deg,
        var(--secondary-color) 15%,
        var(--primary-color) 80%
      );
      background-clip: text;
      color: transparent;
      font-family: var(--font-poppins);
      margin: 5px 0 0 0;
      font-weight: 400;
      font-size: 25px;
      text-align: center;
    }
  }

  .logo {
    margin-bottom: 15px;
  }
}
</style>
