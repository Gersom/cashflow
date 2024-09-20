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
    updateState("", null, "");
  } else if (!regex.test(inputValue.value)) {
    updateState("Correo electrónico no es válido", false);
  } else if (!validatePoint(inputValue.value)) {
    updateState("Correo electrónico no es válido", false);
  } else {
    updateState("Correo electrónico válido", true);
  }
};

const updateState = (notification, validationState, emitValue = inputValue.value) => {
  textNotification.value = notification;
  stateValidation.value = validationState;
  emit('validate', emitValue, validationState === true);
};
</script>

<template>
  <div
    class="user-name"
    :class="{
      'is-warning': stateValidation === false,
      'is-success': stateValidation === true,
    }"
  >
    <div class="title">
      <div class="icon" v-if="stateValidation !== null">
        <component :is="stateValidation ? IconSuccess : IconWarning" />
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
    align-items: center;
    color: var(--text-color);
    display: flex;
    font-size: 14px;
    margin: 0 0 5px 5px;
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
