<script setup>
import { ref, watch, computed } from 'vue'
import { useAccountsStore } from '@app-page/stores/accounts';
import IconSave from "@icons/actions/IconSave.vue"
import IconClose from "@icons/actions/IconClose.vue"
import IconEdit from "@icons/actions/IconEdit.vue"

// Components
import CardTitle from '@components/CardTitle/CardTitle.vue'
import CustomButton from "@components/CustomButton/GeneralButton.vue"
import CustomInputCurrency from "@components/CustomInput/InputCurrency.vue"
import CustomInputRadio from "@components/CustomInput/InputRadio.vue"
import CustomInputText from "@components/CustomInput/InputText.vue"
import CustomInputTextarea from "@components/CustomInput/InputTextarea.vue"
import InputCategory from "@components/CustomInput/InputCategory/InputCategory.vue"
import InputCheckBox from "@components/CustomInput/InputCheckBox.vue"

const dataTypeMovement = {
  expense: { value: 'expense', text: 'Gasto' },
  income: { value: 'income', text: 'Ingreso' }
}
const radioData = [ dataTypeMovement.income, dataTypeMovement.expense ]

const emit = defineEmits(['data-submit', 'delete-movement'])
const props = defineProps({
  dataform: {
    type: Object,
    default: () => ({
      title: '',
      amount: '0.00',
      type: 'expense',
      description: '',
      categories: [],
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

const checkboxDescription = ref(false)
const checkboxCategories = ref(false)

const titleInput = ref('')
const amountInput = ref('0.00')
const expenseInput = ref(radioData[1])
const descriptionInput = ref('')
const selectedCategories = ref([])

const accountsStore = useAccountsStore()
const propDataForm = computed(() => props.dataform)
const propUpdateShow = computed(() => props.updateShow)

watch(propDataForm, (newValue) => {
  checkboxDescription.value = !!newValue.description
  checkboxCategories.value = newValue.categories?.length > 0
  toDataChange(newValue)
})

watch(propUpdateShow, (newValue) => {
  if (!newValue) toDataChange(props.dataform)
})

watch(checkboxDescription, (newValue) => {
  if (!newValue) descriptionInput.value = ''
})

watch(checkboxCategories, (newValue) => {
  if (!newValue) selectedCategories.value = []
})

const handleChangeCategories = (categories) => {
  selectedCategories.value = categories
}
const toDataChange = (dataM) => {
  titleInput.value = dataM.title
  amountInput.value = String(dataM.amount)
  expenseInput.value = dataTypeMovement[dataM.type]
  descriptionInput.value = dataM.description
  selectedCategories.value = dataM.categories
}
const toDataReset = () => {
  titleInput.value = ''
  amountInput.value = '0.00'
  descriptionInput.value = ''
  selectedCategories.value = []
}
const submitMovement = (e) => {
  e.preventDefault()
  const dataSubmit = {
    title: titleInput.value,
    amount: parseFloat(amountInput.value),
    description: descriptionInput.value,
    type: expenseInput.value.value,
    categories: [...selectedCategories.value]
  }
  if (props.isEdit) {
    dataSubmit.id = props.dataform.id
    dataSubmit.createdAt = props.dataform.createdAt
  } else {
    dataSubmit.createdAt = new Date().toISOString().split('T')[0]
  }
  emit('data-submit', dataSubmit)
  if (!props.isEdit) toDataReset()
  else toDataChange(props.dataform)
}
const handleDeleteMovement = () => {
  emit('delete-movement', props.dataform.id)
  toDataReset()
}
</script>

<template>
  <form class="card create-card" @submit="submitMovement">
    <CardTitle
      :title="`${isEdit ? 'Editar' : 'Crear nuevo'} movimiento`"
    />
    <div class="form">
      <div class="input-group">
        <p>Titulo</p>
        <CustomInputText v-model="titleInput" />
      </div>
      <div class="input-group">
        <p>Monto</p>
        <CustomInputCurrency
          :transaction-type="expenseInput.value"
          :currency-symbol="accountsStore.currentCurrency.symbol"
          v-model="amountInput"
        />
      </div>
      <div class="input-group">
        <p>Tipo</p>
        <CustomInputRadio
          :options="radioData"
          v-model="expenseInput"
        />
      </div>

      <div class="input-group">
        <p>Mas detalles</p>
      </div>
      <div class="input-group">
        <InputCheckBox
        :text="checkboxDescription ? 'Descripción' : 'Agregar una descripción'"
        v-model="checkboxDescription"
        />
      </div>
      <div class="input-group" v-show="checkboxDescription">
        <CustomInputTextarea
        placeholder="Movimiento nuevo..."
        v-model="descriptionInput"
        />
      </div>
      <div class="input-group">        
        <InputCheckBox
        :text="checkboxCategories ? 'Categorias' : 'Agregar categorias'"
        v-model="checkboxCategories"
        />
      </div>
      <div class="input-group" v-show="checkboxCategories">
        <InputCategory
          :categories="selectedCategories"
          @change-categories="handleChangeCategories"
        />
      </div>
    </div>

    <div class="buttons">
      <div class="button-submit">
        <CustomButton
          :text="isEdit ? 'Editar' : 'Crear'"
          type="submit"
          :animation="true"
          :disabled="!titleInput || (parseFloat(amountInput) === 0 && parseFloat(amountInput) !== NaN)"
          :icon-component="isEdit ? IconEdit : IconSave"
        />
      </div>
      <div class="button-delete" v-if="props.isEdit">
        <CustomButton
          color="var(--error-color)"
          text="Eliminar"
          type="button"
          :icon-component="IconClose"
          :transparent="true"
          @click="handleDeleteMovement"
        />
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .create-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    & .form {
      padding: 0px 0 20px 0;
      display: flex;
      flex-direction: column;
      gap: 15px;

      & .input-group >  p {
        margin: 0px;
        padding: 0;
        font-size: 14px;
        font-weight: 400;
        font-family: var(--font-nunito);
        margin-bottom: 0.5rem;
        color: var(--subtitle-color);
      }
    }
  }
  .buttons {
    display: flex;
    .button-submit {
      width: 100%;
    }
    .button-delete {
      margin-left: 15px;
      max-width: 100px;
    }
  }
// .card {
// }
</style>
