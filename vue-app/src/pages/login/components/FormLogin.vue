<script setup>
import { ref } from 'vue'

// Components
import CustomButtom from '@components/CustomButton/index.vue'
import Email from "@components/FormInput/Email.vue"
import Password from "@components/FormInput/Password.vue";

// Icons
import IconLogin from '@icons/login/IconLogIn.vue'

const emit = defineEmits(["submit"]);

const disabledBtn = ref(true)

const emailValue = ref("")
const passwordValue = ref("")

const emailValidate = ref(false)
const passwordValidate = ref(false)

const handleData = () => {
  const validate = emailValidate.value && passwordValidate.value
  disabledBtn.value = !validate
  return validate
}
const handlerEmail = (text, isValid) => {
  emailValue.value = text
  emailValidate.value = isValid
  handleData()
};
const handlerPassword = (text, isValid) => {
  passwordValue.value = text
  passwordValidate.value = isValid
  handleData()
}
const handleSubmit = async(e) => {
  e.preventDefault()
  emit('submit', {
    email: emailValue.value,
    password: passwordValue.value
  })
}
</script>

<template>
  <form class="form-login" @submit="handleSubmit">
    <div class="input-container">
      <Email @validate="handlerEmail" />
    </div>
    <div class="input-container">
      <Password @validate="handlerPassword" />
    </div>

    <div class="recover-password-link">
      <router-link :to="{ name: 'RecoverPassword' }">
        ¿Olvidaste tu contraseña?
      </router-link> 
    </div>

    <div class="submit-button">
      <CustomButtom
        text="Iniciar Sesión"
        type="submit"
        :disabled="disabledBtn"
        :animation="true"
        :icon-component="IconLogin"
      />
    </div>

    <p class="register-link">
      No tienes una cuenta? 
      <router-link :to="{ name: 'Register' }">
        Registrate
      </router-link> 
    </p>
  </form>
</template>

<style lang='scss' scoped>
  .form-login  {
    .input-container {
      margin-top: 10px;
      &:first-child {
        margin-top: 0px;
      }
    }
    
    .submit-button {
      margin-top: 15px;
    }

    .register-link {
      text-align: center;
    }
      
    .recover-password-link,
    .register-link {
      margin-top: 7px;
      font-size: 14px;
    }
  }
</style>
