<script setup>
import NroWhatsapp from "@components/FormInput/NroWhatsapp.vue";
import Nickname from "@components/FormInput/Nickname.vue";
import Email from "@components/FormInput/Email.vue";
import Url from "@components/FormInput/Url.vue";
import Password from "@components/FormInput/Password.vue";
import ConfirmPassword from "@components/FormInput/ConfirmPassword.vue";
import { ref } from "vue";

const nicknameValue = ref("");
const nicknameValidate = ref(false);
const handlerNickname = (text, isValid) => {
  nicknameValue.value = text;
  nicknameValidate.value = isValid;
};

const nroWhatsappValue = ref("");
const nroWhatsappValidate = ref(false);
const handlerNroWhatsapp = (text, isValid) => {
  nroWhatsappValue.value = text;
  nroWhatsappValidate.value = isValid;
};

const emailValue = ref("");
const emailValidate = ref(false);
const handlerEmail = (text, isValid) => {
  emailValue.value = text;
  emailValidate.value = isValid;
};

const urlValue = ref("");
const urlValidate = ref(false);
const handlerUrl = (text, isValid) => {
  urlValue.value = text;
  urlValidate.value = isValid;
};

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
</script>

<template>
  <form class="input-section">
    <!-- Nickname Section -->
    <div class="item">
      <Nickname @validate="handlerNickname" />
    </div>

    <!-- Whatsapp Section -->
    <div class="item">
      <NroWhatsapp @validate="handlerNroWhatsapp" />
    </div>

    <!-- Email Section -->
    <div class="item">
      <Email @validate="handlerEmail" />
    </div>

    <!-- Url Section -->
    <div class="item">
      <Url @validate="handlerUrl" />
    </div>

    <!-- Password Section -->
    <div class="item">
      <Password @validate="handlerPassword" />
    </div>

    <!-- Confirm Password Section -->
    <div class="item">
      <ConfirmPassword
        :password="passwordValue"
        @validate="handlerConfirmPassword"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.input-section {
  padding: 25px;
  margin: 20px 0;
  border-radius: 10px;
  background-color: var(--background-color2);

  .item {
    margin-top: 20px;
  }
  .item:first-child {
    margin-top: 0px;
  }
}
</style>
