<script setup>
import { ref } from 'vue'
import CardTitle from '@components/CardTitle/CardTitle.vue'
import CustomButton from '@components/CustomButton/GeneralButton.vue'
import CustomInputColorPicker from '@components/CustomInput/InputColorPicker.vue'
import CustomInputText from '@components/CustomInput/InputText.vue'
import CustomInputTextarea from '@components/CustomInput/InputTextarea.vue'
import IconEdit from '@icons/actions/IconEdit.vue'
import IconSave from '@icons/actions/IconSave.vue'
import SelectIcon from './components/SelectIcon.vue'
import IconTriangle from '@icons/others/IconTriangle.vue'

defineProps({
  dataform: {
    type: Object,
    default: () => ({
      id: '',
      name: '',
      iconName: '',
      color: ''
    })
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  updateShow: {
    type: Boolean,
    default: false
  }
})

const nameCategory = ref('')
const descripciónCategory = ref('')
const colorCategory = ref('transparent')
const iconNameCategory = ref('')

const handleSubmit = (e) => {
  e.preventDefault()
}

</script>

<template>
  <form
    class="category-form"
    @submit="handleSubmit"
  >
    <CardTitle
      :title="`${isEdit ? 'Editar' : 'Crear nueva'} categoria`"
    />
    <div class="category-form-content">
      <div class="input-group">
        <p class="title">
          Nombre <strong class="required">*</strong>
        </p>
        <CustomInputText v-model="nameCategory" />
      </div>

      <div class="input-group">
        <p class="title">
          Descripción
        </p>
        <CustomInputTextarea v-model="descripciónCategory" />
      </div>

      <div class="input-group input-group-color">
        <div class="title title-color">
          <span>Color <strong class="required">*</strong></span>
          <div
            v-show="colorCategory === 'transparent'"
            class="color-info"
          >
            <p>El color no puede ser transparente</p>
            <div class="triangle-icon">
              <IconTriangle />
            </div>
          </div>
        </div>
        <CustomInputColorPicker v-model="colorCategory" />
      </div>

      <div class="input-group">
        <p class="title">
          Icono <strong class="required">*</strong>
        </p>
        <SelectIcon
          v-model="iconNameCategory"
          :color="colorCategory"
        />
      </div>
    </div>
    <div class="buttons">
      <div class="button-submit">
        <CustomButton
          :text="isEdit ? 'Editar' : 'Crear'"
          type="submit"
          :animation="true"
          :disabled="colorCategory === 'transparent' || iconNameCategory === '' || nameCategory.length < 3 || nameCategory.length > 20"
          :icon-component="isEdit ? IconEdit : IconSave"
        />
      </div>
      <!-- <div
        v-if="props.isEdit"
        class="button-delete"
      >
        <CustomButton
          color="var(--error-color)"
          text="Eliminar"
          type="button"
          :icon-component="IconClose"
          :transparent="true"
          @click="handleDeleteMovement"
        />
      </div> -->
    </div>
  </form>
</template>

<style lang="scss" scoped>
.category-form {
  .input-group {
    .title { margin-bottom: 5px;}
    .title-color {
      display: flex;
      align-items: center;
      position: relative;
      .color-info {
        position: absolute;
        bottom: calc(100% + 10px);
        left: 0;
        background: var(--background-color);
        border-radius: 5px;
        padding: 10px 15px;
        color: var(--warning-color);
        display: none;
        p { margin: 0; }
        .triangle-icon {
          color: var(--background-color);
          height: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: calc(100% - 5px);
          left: 5px;
          transform: rotate(65deg);
        }
      }
    }
    &.input-group-color {
      &:hover .title-color {
        .color-info {
          display: block;
        }
      }
    }
  }
  .buttons {
    margin-top: 25px;
  }
  .required {
    font-size: 14px;
    color: var(--error-color);
  }
}
</style>
