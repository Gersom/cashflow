<script setup>
import { ref } from "vue";
import InputPassword from "@components/CustomInput/InputPassword.vue";
import IconPassword from "@icons/form/IconPassword.vue";
import IconSuccess from "@icons/state/IconSuccess.vue";
import IconWarning from "@icons/state/IconWarning.vue";

defineOptions({ name: "FormInputConfirmPassword" });
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
    updateState("", null, "");
  } else if (inputValue.value !== props.password) {
    updateState("La contraseña no coincide", false);
  } else {
    updateState("Contraseña coincide", true);
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
      <div
        v-if="stateValidation !== null"
        class="icon"
      >
        <component :is="stateValidation ? IconSuccess : IconWarning" />
      </div>

      <span>{{ textNotification || props.textInput }}</span>
    </div>
    <InputPassword
      v-model="inputValue"
      :icon-component="IconPassword"
      @input="validateValue"
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
