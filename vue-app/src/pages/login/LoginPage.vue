<script setup>
// Imports nodemodules
import { ref } from "vue"
import { useRouter } from 'vue-router'
import { SERVER_URL, API_URL } from "@src/config/envs";
import axios from "axios"

// Icons
import IconLogin from '@icons/login/IconLogIn.vue'

// Layouts
import LoginLayout from '@layouts/LoginLayout.vue';

// Components
import CustomButtom from '@components/CustomButton/index.vue'
import Email from "@components/FormInput/Email.vue"
import Password from "@components/FormInput/Password.vue";

const router = useRouter()

const handleSubmit = (e) => {
  e.preventDefault()
  router.push({ name: 'AppHome' })
}


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


const postLogin = async (e) => {
  e.preventDefault()

  try {
    const response = await axios({
      method: 'POST',
      url: `${SERVER_URL}/login`,
      data: {
        email: emailValue.value,
        password: passwordValue.value
      },
      withCredentials: true
    });
    console.log('Respuesta del servidor:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

const getUser = async() => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_URL}/users`,
      withCredentials: true
    })
    console.log('Respuesta del servidor:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
</script>

<template>
<div class='login-page'>
  <LoginLayout title="Iniciar sesión">

    <form class="login-form" @submit="postLogin">
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
          :animation="true"
          :icon-component="IconLogin"
        />

        <CustomButtom
          text="GET"
          type="button"
          @click="getUser"
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

  </LoginLayout>
</div>
</template>

<style lang='scss' scoped>
.login-page {
  .login-form  {
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
}
</style>
