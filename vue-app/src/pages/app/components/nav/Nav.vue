<script setup>
defineOptions({ name: "NavCustom" });
import { ref } from "vue";
import { useAppStore } from "@stores/app";
import DialogBlur from "@layouts/DialogBlur.vue";
import IconInfo from "@icons/nav/IconInfo.vue";
import IconLogo from "@icons/others/IconLogo.vue";
import InfoModal from "./components/InfoModal.vue";
import links from "./data/link-list.js";
import NavLink from "./components/NavLink.vue";
import IconOpenNav from "@icons/nav/IconOpenNav.vue";

const appStore = useAppStore();

const showInfoModal = ref(false);
const openNav = ref(false);

const openInfoModal = () => {
  showInfoModal.value = true;
  openNav.value = false;
};
const closeInfoModal = () => {
  showInfoModal.value = false;
};
</script>

<template>
  <nav :class="['nav', { 'is-open': openNav }]">
    <button
      class="open-nav"
      type="button"
    >
      <IconOpenNav @click="openNav = true" />
    </button>

    <div class="nav-content">
      <div
        class="logo"
        type="button"
      >
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
          @change-route="openNav = false"
        />
      </div>

      <button
        class="button-info"
        type="button"
        @click="openInfoModal"
      >
        <div class="icon-info">
          <IconInfo />
        </div>
      </button>
    </div>

    <button
      class="nav-blur"
      type="button"
      @click="openNav = false"
    />

    <DialogBlur
      :button-close="true"
      :show="showInfoModal"
      @close="closeInfoModal"
    >
      <InfoModal />
    </DialogBlur>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  --nav-width: 58px;
  height: 100vh;
  width: var(--nav-width);
  position: relative;
  .open-nav { display: none; }
  .nav-blur { display: none; }
  .nav-content {
    align-items: center;
    background: var(--background-color2);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-start;
    left: 0px;
    padding: 15px 0;
    position: fixed;
    top: 0;
    width: var(--nav-width);
  }
  .logo {
    position: relative;
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
      transition: 0.3s ease color;
      &:hover {
        color: var(--secondary-color);
      }
    }
  }
  .items {
    width: 100%;
  }
  
  @media (width >= 1400px) {
    --nav-width: 75px;
  }
  @media (width <= 720px) {
    .nav-content {
      justify-content: center;
    }
    .logo {
      &:after { display: none; }
      .version {
        position: absolute;
        top: calc(100% + 5px);
      }
    }
    .items {
      margin: auto 0;
    }
    .button-info {
      margin-top: initial;
    }
  }
  @media (width <= 600px) {
    width: 0px;
    transition: .3s ease width;
    .open-nav {
      display: block;
      border: none;
      background: none;
      height: 30px;
      color: var(--primary-color);
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 0;
      margin: 0;
    }
    .nav-blur {
      background: rgb(var(--primary-color-rgb) / 10%);
      backdrop-filter: blur(3px);
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 100;
      border: none;
      padding: 0;
      margin: 0;
    }
    .nav-content {
      transition: .3s ease transform;
      transform: translateX(-100%);
      z-index: 101;
      // box-shadow: 6px 0px 7px 2px #282a3600;
    }
    &.is-open {
      // width: var(--nav-width);
      .nav-blur { display: block; }
      .nav-content {
        transform: translateX(0);
        // box-shadow: 6px 0px 7px 2px #282a36;
      }
    }
  }
}
</style>
