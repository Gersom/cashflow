<script setup>
import { ref } from "vue";
import InputPassword from "@components/CustomInput/InputPassword.vue";
import IconPassword from "@icons/form/IconPassword.vue";
import IconSuccess from "@icons/state/IconSuccess.vue";
import IconWarning from "@icons/state/IconWarning.vue";

const emit = defineEmits(["validate"]);
const props = defineProps({
  password: {
    type: String,
    default: "",
  },
  textInput: {
    type: String,
    default: "Confirmar contraseña",
  }
});

const inputValue = ref("");
const stateValidation = ref(null);
const textNotification = ref("");

const validateValue = () => {
  if (inputValue.value === "") {
    textNotification.value = "";
    stateValidation.value = null;
    emit("validate", inputValue.value, false);
  } else if (inputValue.value !== props.password) {
    textNotification.value = "La contraseña no coincide";
    stateValidation.value = false;
    emit("validate", inputValue.value, false);
  } else {
    textNotification.value = "Contraseña coincide";
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
      <span>{{ textNotification || props.textInput }}</span>
    </div>
    <InputPassword
      @input="validateValue"
      v-model="inputValue"
      :icon-component="IconPassword"
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
