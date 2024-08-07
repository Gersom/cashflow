<script setup>
import { useThemeStore } from '@stores/theme'
import { storeToRefs } from 'pinia'
import MasonryCards from '@layouts/MasonryCards.vue'
import Head from '@components/Head/Head.vue'


defineOptions({
  name: 'Profile'
})

const themeStore = useThemeStore()
const { currentTheme } = storeToRefs(themeStore)
const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <div class="home-page">
    <main>
      <Head />
      <MasonryCards>
        <template v-slot:profile>
          
        </template>
        <template v-slot:personal>
          
        </template>
        <template v-slot:password>
         
        </template>
        <template v-slot:actions>
          
        </template>
      </MasonryCards>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  height: 100svh;
  overflow-y: auto;
  background-color: var(--background-color);

  main {
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
  }

  h2 {
    color: var(--primary-color);
    margin: 0;
  }
}
</style>