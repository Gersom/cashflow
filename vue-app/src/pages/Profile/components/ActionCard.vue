<script setup>
import { ref } from 'vue'
import CardTitle from '@components/CardTitle/CardTitle.vue'
import IconLogOut from "@icons/login/IconLogOut.vue"
import IconClose from "@icons/actions/IconClose.vue"
import CustomButton from '@components/CustomButton/index.vue'

const handleDeleteAccount = () => {
  console.log('Delete account')
}
const handleLogout = () => {
  console.log('Logout')
}

</script>

<template>
  <div class="card card-profile">
    <CardTitle title="Acciones"/>

    <h4 class="title">
      Sesión
    </h4>
    <p class="paragraph">
      Podrás volver a iniciar sesión cuando desees.
    </p>
    <div class="button">
      <CustomButton
        text="Cerrar sesión"
        :icon-component="IconLogOut"
        @click="handleLogout"
      />
    </div>

    <span class="separador" />

    <h4 class="title" style="--action-card-color: var(--error-color)">
      Cuenta de usuario
    </h4>
    <p class="paragraph">
      Una vez que eliminas tu cuenta, no hay vuelta atrás.
    </p>
    <div class="button">
      <CustomButton
        size="small"
        color="var(--error-color)"
        text="Borrar cuenta"
        :icon-component="IconClose"
        :transparent="true"
        @click="handleDeleteAccount"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 100%;
  width: 100%;
  color: var(--text-color);
  .title {
    color: var(--action-card-color, var(--title-color));
    font-weight: 400;
    font-size: 16px;
    margin: 0 0 10px 0;
  }
  .paragraph {
    margin: 0;
    font-size: 14px;
  }
  .separador {
    margin: 25px 0 0 0;
    display: block;
  }
  .button {
    margin-top: 15px;
  }
  .icon {
    height: 30px;
    color: var(--primary-color);
  }
}
</style>
