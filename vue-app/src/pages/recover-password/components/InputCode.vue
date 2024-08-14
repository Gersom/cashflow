<script setup>
import { ref } from "vue";
import InputText from "@components/CustomInput/InputText.vue";
import IconSheet from "@icons/nav/IconSheet.vue";
import IconSuccess from "@icons/state/IconSuccess.vue";
import IconWarning from "@icons/state/IconWarning.vue";

const emit = defineEmits(["validate"]);

const stateValidation = ref(null);
const text = ref("Código de recuperación");
const textNotification = ref("");

const props = defineProps({
  inputValue: {
    type: String,
    default: "",
  },
})

const validateValue = (e) => {
  const regexEspecial = /^[a-zA-Z0-9\s]+$/;

  if (e.target.value === "") {
    textNotification.value = "";
    stateValidation.value = null;
    emit("validate", e.target.value, false);
  }
  else if (e.target.value.includes(" ")) {
    textNotification.value = "El código no puede contener espacios";
    stateValidation.value = false;
    emit("validate", e.target.value, false);
  } 
  else if (e.target.value.length !== 6) {
    textNotification.value = "El código debe tener 6 caracteres";
    stateValidation.value = false;
    emit("validate", e.target.value, false);
  }
  else if (!regexEspecial.test(e.target.value)) {
    textNotification.value = "El código no puede contener caracteres especiales";
    stateValidation.value = false;
    emit("validate", e.target.value, false);
  }
  else {
    textNotification.value = "Código válido";
    stateValidation.value = true;
    emit("validate", e.target.value, true);
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
      placeholder="* * * * *"
      :model-value="props.inputValue"
      :icon-component="IconSheet"
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
