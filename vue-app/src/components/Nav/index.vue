<script setup>
defineOptions({ name: "Nav" });
import IconLogo from "@icons/others/IconLogo.vue";
import IconLogOut from "@icons/login/IconLogOut.vue";
import links from "./data/link-list.js";
import NavLink from "./components/NavLink.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const toLogout = () => {
  // code
};
const toHome = () => {
  router.push("/");
};
</script>

<template>
  <nav class="nav">
    <div class="nav-content">
      <button class="logo" type="button" @click="toHome">
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
      <button class="logout" type="button" @click="toLogout">
        <IconLogOut />
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  height: 100%;
  width: 80px;
  position: relative;
  &:before {
    content: "";
    height: 70px;
    width: 70px;
    background: var(--background-color2);
  }
  .nav-content {
    background: var(--background-color2);
    width: 70px;
    padding: 20px 0;
    height: 100%;
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0px;
  }
  .logo,
  .logout {
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
