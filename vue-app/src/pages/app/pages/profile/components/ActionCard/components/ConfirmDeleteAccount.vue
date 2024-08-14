<script setup>
import IconClose from "@icons/actions/IconClose.vue"
import CustomButton from '@components/CustomButton/index.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['close'])
const router = useRouter()
const toast = useToast()

const handleDeleteAccount = () => {
  toast.error('Tu cuenta se ha eliminado :c')
  console.log('Delete account')
  router.push({ name: 'Login' })
}
const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class='confirm-delete-account'>
    <h2 class="title">
      Borrar cuenta de usuario
    </h2>

    <div class="emoji-container">
      <label class="emoji">☹️</label>
      <span>¡No te vayas!</span>
    </div>

    <p class="description">
      Una vez que eliminas tu cuenta, no hay vuelta atrás. Se perderá toda tu información, como tus movimientos financieros, categorias registradas, y todo rastro de tu existencia, nunca nadie sabrá que un dia estuviste por aquí.
    </p>

    <h3 class="subtitle">
      ¿Estas segur@ que deseas abandonarnos?
    </h3>

    <div class="buttons">
      <CustomButton
        text="Quiero quedarme :D"
        @click="handleClose"
      />
      <CustomButton
        color="var(--error-color)"
        text="Si :c"
        :icon-component="IconClose"
        :transparent="true"
        @click="handleDeleteAccount"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.confirm-delete-account {
  text-align: center;
  width: 100%;
  max-width: 500px;
  padding: 30px;
  .title {
    margin: 0 0 25px 0;
    font-size: 25px;
    font-weight: 400;
    color: var(--error-color)
  }
  
  .emoji-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    .emoji {
      font-size: 64px;
      line-height: 1;
      margin: 0 0 10px 0;
    }
    span {
      font-size: 14px;
      color: var(--title-color);
      font-family: var(--font-poppins);
    }
  }

  .description {
    font-size: 14px;
    margin: 0 0 10px 0;
  }

  .subtitle {
    font-size: 14px;
    color: var(--title-color);
    font-family: var(--font-nunito);
    font-weight: 600;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    & > * {
      width: calc(50% - 7px);
    }
  }
}
</style>
