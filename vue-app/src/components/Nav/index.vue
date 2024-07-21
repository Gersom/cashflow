<script setup>
defineOptions({ name: 'Nav' })
import links from './data/link-list.js'
import NavLink from './components/NavLink.vue';
</script>

<template>
  <nav class="nav">
    <p>
      <strong>Current route path:</strong> {{ $route.fullPath }}
    </p>
    <div>
      <NavLink
        v-for="(link, index) in links"
        :key="`nav-link-${index}`"
        :icon-component="link.icon"
        :page-name="link.pageName"
        :text="link.text"
      />
    </div>
    <p>
      Cerrar sessión
    </p>
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
}
</style>
