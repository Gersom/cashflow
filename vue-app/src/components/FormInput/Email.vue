<script setup>
import { ref } from "vue";
import InputText from "@components/CustomInput/InputText.vue";
import IconEmail from "@icons/form/IconEmail.vue";
import IconSuccess from "@icons/state/IconSuccess.vue";
import IconWarning from "@icons/state/IconWarning.vue";

const emit = defineEmits(["validate"]);

const inputValue = ref("");
const stateValidation = ref(null);
const text = ref("Correo electrónico");
const textNotification = ref("");

const validateValue = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validatePoint = (text) => {
    const parts = text.split("@");
    const domain = parts[1];
    return domain.split(".").length <= 2;
  };

  if (inputValue.value === "") {
    textNotification.value = "";
    stateValidation.value = null;
    emit("validate", inputValue.value, false);
  } else if (!regex.test(inputValue.value)) {
    textNotification.value = "Correo electrónico no es válido";
    stateValidation.value = false;
    emit("validate", inputValue.value, false);
  } else if (!validatePoint(inputValue.value)) {
    textNotification.value = "Correo electrónico no es válido";
    stateValidation.value = false;
    emit("validate", inputValue.value, false);
  } else {
    textNotification.value = "Correo electrónico válido";
    stateValidation.value = true;
    emit("validate", inputValue.value, true);
  }
};
</script>

<template>
  <div
    class="user-name"
    :class="{
      'is-warning': stateValidation == false,
      'is-success': stateValidation == true,
    }"
  >
    <div class="title">
      <div class="icon" v-if="stateValidation == true">
        <IconSuccess />
      </div>
      <div class="icon" v-if="stateValidation == false">
        <IconWarning />
      </div>
      <span>{{ textNotification || text }}</span>
    </div>
    <InputText
      @input="validateValue"
      placeholder="david@cashflow.com"
      v-model="inputValue"
      :icon-component="IconEmail"
    />
  </div>
</template>

<style lang="scss" scoped>
.user-name {
  .title {
    font-size: 14px;
    color: var(--text-color);
    margin: 0 0 5px 5px;
    display: flex;
  }
  .icon {
    height: 16px;
    margin-right: 5px;
  }

  &.is-warning {
    .title,
    .icon {
      color: var(--warning-color);
    }
  }
  &.is-success {
    .title,
    .icon {
      color: var(--success-color);
    }
  }
}
</style>
