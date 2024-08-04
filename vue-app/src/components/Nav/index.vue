<script setup>
defineOptions({ name: "Nav" });
import IconLogo from "@icons/others/IconLogo.vue";
import IconInfo from "@icons/nav/IconInfo.vue";
import links from "./data/link-list.js";
import NavLink from "./components/NavLink.vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@stores/app";

const appStore = useAppStore();
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
      <div class="logo" type="button">
        <div class="icon-logo">
          <IconLogo />
        </div>
        <span class="version">{{ appStore.version }}</span>
      </div>
      <div class="items">
        <NavLink
          v-for="(link, index) in links"
          :key="`nav-link-${index}`"
          :icon-component="link.icon"
          :page-name="link.pageName"
          :text="link.text"
        />
      </div>
      <button class="button-info" type="button" @click="toLogout">
        <div class="icon-info">
          <IconInfo />
        </div>
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  height: 100%;
  width: 61px;
  position: relative;
  // &:before {
  //   content: "";
  //   height: 70px;
  //   width: 70px;
  //   background: var(--background-color2);
  // }
  .nav-content {
    background: var(--background-color2);
    width: 61px;
    padding: 15px 0;
    height: 100%;
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    left: 0px;
  }
  .logo {
    .icon-logo {
      height: 20px;
    }
    .version {
      font-size: 10px;
    }
    &:after {
      content: "";
      height: 1px;
      width: 100%;
      background: rgb(255 255 255 / 10%);
      margin: 15px 0 0px 0;
      display: block;
    }
  }
  .button-info {
    background: none;
    border: none;
    margin-top: auto;
    .icon-info {
      height: 20px;
      color: var(--text-color);
    }
  }
  .items {
    width: 100%;
  }
  // .items > * {
  //   margin-top: 25px;
  // }
  // .items > *:first-child {
  //   margin-top: 0px;
  // }
}
</style>
