<script setup>
// Layouts
import MasonryCards from '@app-page/layouts/MasonryCards.vue'

// Components global
import Head from '@components/Head/Head.vue'

// Components local
import ActionCard from './components/ActionCard/ActionCard.vue'
import PasswordCard from './components/PasswordCard.vue'
import PersonalCard from './components/PersonalCard.vue'
import ProfileCard from './components/ProfileCard.vue'
</script>

<template>
  <div class="profile-page">
    <main>
      <Head />
      <MasonryCards>
        <template v-slot:profile>
          <ProfileCard/>
        </template>
        <template v-slot:personal>
            <PersonalCard/>
        </template>
        <template v-slot:password>
            <PasswordCard/>
        </template>
        <template v-slot:actions>
            <ActionCard/>
        </template>
      </MasonryCards>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.profile-page {
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