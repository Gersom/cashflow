<script setup>
import { ref, computed } from 'vue'
import CardTitle from '@components/CardTitle/CardTitle.vue'
import ConfirmPassword from '@components/FormInput/ConfirmPassword.vue'
import CustomButton from '@components/CustomButton/GeneralButton.vue'
import IconSave from '@icons/actions/IconSave.vue'
import Password from '@components/FormInput/Password.vue'

const formData = ref({
  currentPassword: { value: '', isValid: false },
  newPassword: { value: '', isValid: false },
  confirmPassword: { value: '', isValid: false }
})

const isFormValid = computed(() =>
  Object.values(formData.value).every(field => field.isValid)
)

// Methods
const handleInput = (field, text, isValid) => {
  formData.value[field] = { value: text, isValid }
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const data = {}
  Object.keys(formData.value).forEach(key => {
    data[key] = formData.value[key].value
  })

  console.log('data', data)
}

</script>

<template>
  <form
    class="card card-profile"
    @submit="handleSubmit"
  >
    <CardTitle title="Crear nueva contraseña " />
    <div class="card-pwds">
      <Password
        text-input="Contraseña actual"
        @validate="(txt, valid) => handleInput('currentPassword', txt, valid)"
      />
      <Password
        text-input="Nueva contraseña"
        @validate="(txt, valid) => handleInput('newPassword', txt, valid)"
      />
      <ConfirmPassword
        text-input="Confirmar nueva contraseña"
        :password="formData.newPassword.value"
        @validate="(txt, valid) => handleInput('confirmPassword', txt, valid)"
      />

      <CustomButton
        :disabled="!isFormValid"
        type="submit"
        :icon-component="IconSave"
        text="Cambiar contraseña"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.card {
  height: 100%;
  width: 100%;

  .card-pwds{
    display: flex;
    flex-flow: column;
    gap: 15px;
  }
}
</style>