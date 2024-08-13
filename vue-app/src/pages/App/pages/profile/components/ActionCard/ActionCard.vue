<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Layout
import DialogBlur from '@layouts/DialogBlur.vue'

// Icons components
import IconClose from "@icons/actions/IconClose.vue"
import IconLogOut from "@icons/login/IconLogOut.vue"

// Components global
import CardTitle from '@components/CardTitle/CardTitle.vue'
import CustomButton from '@components/CustomButton/index.vue'

// Components Local
import ConfirmDeleteAccount from './components/ConfirmDeleteAccount.vue'

// Data
const showDeleteAccountDialog = ref(false)
const router = useRouter()

// Methods
const handleLogout = () => {
  router.push({ name: 'Login' })
}
const handleDeleteAccount = () => {
  showDeleteAccountDialog.value = true
}
const handleCloseDialog = () => {
  showDeleteAccountDialog.value = false
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

    <DialogBlur
      :show="showDeleteAccountDialog"
      :button-close="true"
      @close="handleCloseDialog"
    >
      <ConfirmDeleteAccount
        @close="handleCloseDialog"
      />
    </DialogBlur>
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
