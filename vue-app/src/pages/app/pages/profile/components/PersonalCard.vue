<script setup>
import { ref, computed } from 'vue'
import CardTitle from '@components/CardTitle/CardTitle.vue'
import Nickname from '@components/FormInput/Nickname.vue';
import Email from '@components/FormInput/Email.vue';
import NroWhatsapp from '@components/FormInput/NroWhatsapp.vue';
import CustomButton from '@components/CustomButton/GeneralButton.vue';
import IconSave from '@icons/actions/IconSave.vue';


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

const nroWhatsappValue = ref("");
const nroWhatsappValidate = ref(false);
const handlerNroWhatsapp = (text, isValid) => {
  nroWhatsappValue.value = text;
  nroWhatsappValidate.value = isValid;
};

const isButtonEnabled = computed(() => {
  return nroWhatsappValidate.value && emailValidate.value && nicknameValidate.value;
});

</script>

<template>
  <div class="card card-profile">
    <CardTitle title="Datos personales"/>
    <div class="card-inputs">
      <Nickname @validate="handlerNickname"/>
      <Email @validate="handlerEmail"/>
      <NroWhatsapp @validate="handlerNroWhatsapp" />
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
  .card-inputs{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>