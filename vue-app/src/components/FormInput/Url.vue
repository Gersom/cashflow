<script setup>
import { ref } from "vue";
import InputText from "@components/CustomInput/InputText.vue";
import IconUrl from "@icons/form/IconUrl.vue";
import IconSuccess from "@icons/state/IconSuccess.vue";
import IconWarning from "@icons/state/IconWarning.vue";

const emit = defineEmits(["validate"]);

const inputValue = ref("");
const stateValidation = ref(null);
const text = ref("Url externo");
const textNotification = ref("");

const validateValue = () => {
  const regex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if (inputValue.value === "") {
    textNotification.value = "";
    stateValidation.value = null;
    emit("validate", inputValue.value, false);
  } else if (!regex.test(inputValue.value)) {
    textNotification.value = "Url no es válida";
    stateValidation.value = false;
    emit("validate", inputValue.value, false);
  } else {
    textNotification.value = "Url válido";
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
      placeholder="https://example.com/image.jpg"
      :icon-component="IconUrl"
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
