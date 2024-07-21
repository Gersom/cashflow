<script setup>
defineOptions({ name: 'Nav' })
import IconLogo from '@icons/IconLogo.vue';
import IconLogOut from '@icons/login/IconLogOut.vue';
import links from './data/link-list.js'
import NavLink from './components/NavLink.vue';
import { useRouter } from 'vue-router'
const router = useRouter()

const toLogout = () => {
  // code
}
const toHome = () => {
  router.push('/')
}
</script>

<template>
  <nav class="nav">
    <button
      class="logo"
      type="button"
      @click="toHome"
    >
      <IconLogo />
    </button>
    <div class="items">
      <NavLink
        v-for="(link, index) in links"
        :key="`nav-link-${index}`"
        :icon-component="link.icon"
        :page-name="link.pageName"
        :text="link.text"
      />
    </div>
    <button
      class="logout"
      type="button"
      @click="toLogout"
    >
      <IconLogOut />
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  background: var(--background-color2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  color: var(--text-color);
  width: 80px;
  padding: 20px 0;
  .logo, .logout {
    height: 30px;
    border: 0;
    background: none;
    color: var(--text-color);
  }
  .logout {
    &:hover {
      color: var(--secondary-color);
    }
  }
  .items > * {
    margin: 20px 0;
  }
}
</style>
