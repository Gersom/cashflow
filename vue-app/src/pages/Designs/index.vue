<script setup>
defineOptions({ name: "DesignsPage" });
defineEmits(["vnode-unmounted"]);

import { useThemeStore } from "@stores/theme";
import ButtonsSection from "./components/Buttons.vue";
import CustomButton from "@components/CustomButton/index.vue";
import IconAdd from "@icons/actions/IconAdd.vue";
import InputsSection from "./components/Inputs.vue";
import FormSection from "./components/Form.vue";

const themeStore = useThemeStore();
const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<template>
  <div class="DesingPage">
    <h1 class="title">Desing Page</h1>
    <p>Tema actual: {{ themeStore.currentTheme }}</p>
    <CustomButton
      text="Cambiar tema"
      :icon-component="IconAdd"
      :transparent="true"
      @click="toggleTheme"
    />
    <h2 class="title">FORM</h2>
    <FormSection />

    <h2 class="title">INPUTS</h2>
    <InputsSection />

    <h2 class="title">BUTTONS</h2>
    <ButtonsSection />
  </div>
</template>

<style lang="scss" scoped>
.DesingPage {
  margin-top: 20px;
  padding: 20px;
  color: var(--text-color);
  .title {
    color: var(--title-color);
  }
}
</style>
