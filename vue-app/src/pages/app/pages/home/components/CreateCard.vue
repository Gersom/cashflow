<script setup>
import { ref, onMounted } from 'vue'
import { useCategoriesStore } from '@app-page/stores/categories';
import { useMovementsStore } from '@app-page/stores/movements';

// Components
import CardTitle from '@components/CardTitle/CardTitle.vue'
import CustomButton from "@components/CustomButton/GeneralButton.vue"

// Custom Inputs
import CustomInputCurrency from "@components/CustomInput/InputCurrency.vue"
import CustomInputRadio from "@components/CustomInput/InputRadio.vue"
import CustomInputText from "@components/CustomInput/InputText.vue"
import CustomInputTextarea from "@components/CustomInput/InputTextarea.vue"
import InputCategory from "@components/CustomInput/InputCategory/InputCategory.vue"
import { useAccountsStore } from '@app-page/stores/accounts';

// Icons
import IconAdd from "@icons/actions/IconAdd.vue"

const categoriesStore = useCategoriesStore()
const movementsStore = useMovementsStore()
const accountsStore = useAccountsStore()

const inputRadioDataTwo = [
  { value: 'expense', text: 'Gasto' },
  { value: 'income', text: 'Ingreso' }
]

const inputTextDefault = ref('')
const inputCurrencyExpense = ref('0.00')
const inputTextareaDefault = ref('')
const inputRadioTwo = ref(inputRadioDataTwo[0])
const selectedCategories = ref([])

const handleChangeCategories = (categories) => {
  selectedCategories.value = categories
}
const submitMovement = async (e) => {
  e.preventDefault()
  const dataForm = {
    title: inputTextDefault.value,
    description: inputTextareaDefault.value,
    amount: parseFloat(inputCurrencyExpense.value),
    type: inputRadioTwo.value.value,
    categories: [...selectedCategories.value],
    accountId: accountsStore.selected.id
  }
  await movementsStore.createMovement(dataForm)
}

onMounted(() => {
  categoriesStore.fillCategories()
})
</script>

<template>
  <form class="card create-card" @submit="submitMovement">
    <CardTitle title="Crear nuevo movimiento" />

    <div class="form">
      <div class="input-group">
        <p>Titulo</p>
        <CustomInputText v-model="inputTextDefault" />
      </div>
      <div class="input-group">
        <p>Monto</p>
        <CustomInputCurrency
          :transaction-type="inputRadioTwo.value"
          v-model="inputCurrencyExpense"
        />
      </div>
      <div class="input-group">
        <p>Tipo</p>
        <CustomInputRadio :data="inputRadioDataTwo" v-model="inputRadioTwo" />
      </div>
      <div class="input-group">
        <p>Descripción</p>
        <CustomInputTextarea v-model="inputTextareaDefault" />
      </div>
      <div class="input-group">
        <p>Categoria</p>
        <InputCategory @change-categories="handleChangeCategories" />
      </div>
    </div>

    <CustomButton
      text="Crear movimiento"
      type="submit"
      :animation="true"
      :icon-component="IconAdd"
    />
  </form>
</template>

<style lang="scss" scoped>
.card {
  &.create-card {
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
}
</style>