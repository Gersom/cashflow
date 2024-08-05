<script setup>
import { ref } from "vue";
import InputText from "@components/CustomInput/InputText.vue";
import IconWhtasapp from "@icons/form/IconWhatsapp.vue";
import IconSuccess from "@icons/state/IconSuccess.vue";
import IconWarning from "@icons/state/IconWarning.vue";

const emit = defineEmits(["validate"]);

const inputValue = ref("");
const stateValidation = ref(null);
const text = ref("Nro de whatsapp");
const textNotification = ref("");

const validateValue = () => {
  const whatsappRegex = /^\+\d{2,3}\d{9,10}$/;

  if (inputValue.value === "") {
    textNotification.value = "";
    stateValidation.value = null;
    emit("validate", inputValue.value, false);
  } else if (inputValue.value[0] !== "+" && inputValue.value[0] !== "0") {
    textNotification.value = 'El número de whatsapp debe empezar con "+" ó "0"';
    stateValidation.value = false;
    emit("validate", inputValue.value, false);
  } else if (!whatsappRegex.test(inputValue.value)) {
    textNotification.value = "El número de whatsapp no es válido";
    stateValidation.value = false;
    emit("validate", inputValue.value, false);
  } else {
    textNotification.value = "Número de whatsapp válido";
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
      v-model="inputValue"
      placeholder="+519********"
      :icon-component="IconWhtasapp"
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
