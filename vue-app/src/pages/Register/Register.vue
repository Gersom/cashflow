<script setup>
// Imports nodemodules
import { ref } from "vue"
import { useRouter } from 'vue-router'

// Icons
import IconSuccess from '@icons/state/IconSuccess.vue'

// Layouts
import LoginLayout from '@layouts/LoginLayout.vue';

// Components
import CustomButtom from '@components/CustomButton/index.vue'
import Email from "@components/FormInput/Email.vue"
import Password from "@components/FormInput/Password.vue";
import Nickname from "@components/FormInput/Nickname.vue";
import NroWhatsapp from "@components/FormInput/NroWhatsapp.vue";

const router = useRouter()

const handleSubmit = (e) => {
  e.preventDefault()
  router.push({ name: 'AppHome' })
}

const nicknameValue = ref("");
const nicknameValidate = ref(false);
const handlerNickname = (text, isValid) => {
  nicknameValue.value = text;
  nicknameValidate.value = isValid;
};

const emailValue = ref("");
const emailValidate = ref(false);
const handlerEmail = (text, isValid) => {
  emailValue.value = text;
  emailValidate.value = isValid;
};

const passwordValue = ref("");
const passwordValidate = ref(false);
const handlerPassword = (text, isValid) => {
  passwordValue.value = text;
  passwordValidate.value = isValid;
};

const nroWhatsappValue = ref("");
const nroWhatsappValidate = ref(false);
const handlerNroWhatsapp = (text, isValid) => {
  nroWhatsappValue.value = text;
  nroWhatsappValidate.value = isValid;
};
</script>

<template>
<div class='register-page'>
  <LoginLayout title="Crear una cuenta">

    <form class="login-form" @submit="handleSubmit">
      <div class="input-container">
        <Nickname @validate="handlerNickname" />
      </div>
      <div class="input-container">
        <Email @validate="handlerEmail" />
      </div>
      <div class="input-container">
        <Password @validate="handlerPassword" />
      </div>
      <div class="input-container">
        <NroWhatsapp @validate="handlerNroWhatsapp" />
      </div>

      <div class="submit-button">
        <CustomButtom
          text="Registrarme"
          type="submit"
          :animation="true"
          :icon-component="IconSuccess"
        />
      </div>

      <p class="register-link">
        Ya tienes una cuenta?
        <router-link :to="{ name: 'Login' }">
          Inicia sesión
        </router-link> 
      </p>
    </form>

  </LoginLayout>
</div>
</template>

<style lang='scss' scoped>
.register-page {
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
      margin-top: 7px;
      font-size: 14px;
    }
  }
}
</style>
