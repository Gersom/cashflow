<script setup>
// Imports nodemodules
import { ref } from "vue"
import { useRouter } from 'vue-router'

// Icons
import IconGeometricFigures from '@icons/nav/IconGeometricFigures.vue'

// Layouts
import LoginLayout from '@layouts/LoginLayout.vue';

// Components
import CustomButtom from '@components/CustomButton/index.vue'
import Email from "@components/FormInput/Email.vue"

const router = useRouter()

const handleSubmit = (e) => {
  e.preventDefault()
  // router.push({ name: 'AppHome' })
}


const emailValue = ref("");
const emailValidate = ref(false);
const handlerEmail = (text, isValid) => {
  emailValue.value = text;
  emailValidate.value = isValid;
};

</script>

<template>
<div class='recover-password'>
  <LoginLayout title="Recuperar contraseña">

    <form class="login-form" @submit="handleSubmit">
      <div class="input-container">
        <Email @validate="handlerEmail" />
      </div>

      <p>Te enviaremos un código de verificación a tu correo electrónico para recuperar tu contraseña</p>

      <div class="submit-button">
        <CustomButtom
          text="Enviar codigo"
          type="submit"
          :animation="true"
          :icon-component="IconGeometricFigures"
        />
      </div>

      <p class="register-link">
        Ya te acordaste de tu contraseña?
        <router-link :to="{ name: 'Login' }">
          Inicia sesión
        </router-link> 
      </p>
    </form>

  </LoginLayout>
</div>
</template>

<style lang='scss' scoped>
.recover-password {
  .login-form  {
    .input-container {
      margin-top: 15px;
      &:first-child {
        margin-top: 0px;
      }
    }
    
    .submit-button {
      margin-top: 25px;
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
}
</style>
