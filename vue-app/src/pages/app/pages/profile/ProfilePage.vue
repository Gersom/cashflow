<script setup>
// Layouts
import MasonryCards from '@app-page/layouts/MasonryCards.vue'

// Components global
import Head from '@app-page/components/Head.vue'
import MainContainer from '@app-page/layouts/MainContainer.vue'

// Components local
import ActionCard from './components/ActionCard/ActionCard.vue'
import PasswordCard from './components/PasswordCard.vue'
import PersonalCard from './components/PersonalCard.vue'
import ProfileCard from './components/ProfileCard.vue'
</script>

<template>
  <div class="profile-page">
    <MainContainer>
      <Head />
      <MasonryCards>
        <template #profile>
          <ProfileCard />
        </template>
        <template #personal>
          <PersonalCard />
        </template>
        <template #password>
          <PasswordCard />
        </template>
        <template #actions>
          <ActionCard />
        </template>
      </MasonryCards>
    </MainContainer>
  </div>
</template>

<style lang="scss" scoped>
</style>