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
    <CustomButton
      text="Cerrar sesión"
      :icon-component="IconLogOut"
      @click="handleLogout"
    />

    <h4 class="title">
      Cuenta de usuario
    </h4>
    <p class="paragraph">
      Una vez que eliminas tu cuenta, no hay vuelta atrás.
    </p>
    <CustomButton
      size="small"
      :red-color="true"
      text="Borrar cuenta"
      :icon-component="IconClose"
      :transparent="true"
      @click="handleDeleteAccount"
    />
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 100%;
  width: 100%;
  color: var(--text-color);
  .icon {
    height: 30px;
    color: var(--primary-color);
  }
}
</style>
