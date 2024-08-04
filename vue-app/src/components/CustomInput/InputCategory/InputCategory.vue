<script setup>
  // Imports
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useThemeStore } from '@stores/theme'
  import NewItem from "./components/NewItem.vue"
  import Category from "./components/Category.vue"

  // Vue defines
  defineOptions({name: 'CustomInputCategories'})
  const emit = defineEmits(['vnode-unmounted', 'update:modelValue'])

  // Props
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  })

  // Data
  const categories = ref([
    {
      id: 1,
      color: 'orange',
      iconName: 'shopping-bag',
      name: 'Compras',
    },
    {
      id: 2,
      color: 'peru',
      iconName: 'credit-card',
      name: 'Tarjeta',
    }
  ])

  // Store
  const themeStore = useThemeStore()
  const { currentTheme } = storeToRefs(themeStore)

  // Computed
  const valueInput = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })

  // Methods
</script>

<template>
  <div
    class='custom-input-categories'
    :class="{ 'is-dark-theme': currentTheme === 'dark' }"
  >
    <div class="container">
      <button
        class="item"
        v-for="(cat, index) in categories"
        :key="`category${index}`"
      >
        <Category :data="cat" />
      </button>

      <button  class="item">
        <NewItem />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .custom-input-categories {
    .container {
      align-items: center;
      background: var(--background-color);
      border-radius: var(--border-radius);
      display: flex;
      justify-content: flex-start;
      padding: 10px 15px;
      width: 100%;
      .item {
        background: none;
        border: none;
        margin: 0 0 0 15px;
        padding: 0;
        width: 60px;
      }
      .item:first-child {
        margin-left: 0;
      }
    }

    /* Dark Theme */
    &.is-dark-theme {
      .container {
        background: rgb(20 21 26 / 30%);
      }
      .container:focus {
        background: rgb(20 21 26 / 70%);
      }
    }
  }

</style>
