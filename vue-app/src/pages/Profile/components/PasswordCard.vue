<script setup>
import { ref , computed} from 'vue'
import CardTitle from '@components/CardTitle/CardTitle.vue'
import Password from '@components/FormInput/Password.vue'
import ConfirmPassword from '@components/FormInput/ConfirmPassword.vue'
import CustomButton from "@components/CustomButton/index.vue"
import IconSave from '@icons/actions/IconSave.vue'


const passwordValue = ref("");
const passwordValidate = ref(false);
const handlerPassword = (text, isValid) => {
  passwordValue.value = text;
  passwordValidate.value = isValid;
};

const confirmPasswordValue = ref("");
const confirmPasswordValidate = ref(false);
const handlerConfirmPassword = (text, isValid) => {
  confirmPasswordValue.value = text;
  confirmPasswordValidate.value = isValid;
};

const isButtonEnabled = computed(() => {
  return passwordValidate.value && confirmPasswordValidate.value;
});

</script>

<template>
  <div class="card card-profile">
        <CardTitle title="Crear nueva contraseña "/>
        <div class="card-pwds">
          <Password @validate="handlerPassword" />
          <ConfirmPassword
          :password="passwordValue"
          @validate="handlerConfirmPassword"
          />
          <CustomButton
          :disabled="!isButtonEnabled"
          :icon-component="IconSave"
          text="Cambiar contraseña"
          />
        </div>
  </div>
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