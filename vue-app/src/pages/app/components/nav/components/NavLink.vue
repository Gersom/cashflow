<script setup>
defineOptions({ name: "NavLink" });
const props = defineProps({
  iconComponent: {
    type: Object,
    default: null,
  },
  pageName: {
    type: String,
    default: "Home",
  },
  text: {
    type: String,
    default: "button",
  },
});

import { computed } from "vue";
import { useRoute } from "vue-router";

const emit = defineEmits(["change-route"]);
const route = useRoute();
const isRouteCurrent = computed(() => {
  return route?.name?.toLowerCase() === props?.pageName?.toLowerCase();
});

const handleToRoute = () => {
  emit("change-route");
};
</script>

<template>
  <div :class="['nav-link', { 'is-current-page': isRouteCurrent }]">
    <RouterLink
      :to="{ name: pageName }"
      @click="handleToRoute"
    >
      <div class="link-icon">
        <component :is="iconComponent" />
      </div>
      <span class="link-text">
        {{ text }}
      </span>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.nav-link {
  & >a {
    display: flex;
    align-items: center;
    padding: 15px 0;
    position: relative;
    justify-content: center;
    flex-direction: column;
    &:before {
      content: "";
      height: calc(100% - 30px);
      width: 4px;
      background: var(--primary-color);
      position: absolute;
      left: 0;
      display: block;
      opacity: 0;
      transition: 0.5s ease opacity;
    }
  }

  .link-icon {
    height: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .link-text {
    display: none;
    font-size: 12px;
    margin-top: 5px;
  }
  .link-icon,
  .link-text {
    color: var(--text-color);
    transition: color 0.3s;
  }

  &:hover {
    .link-icon,
    .link-text {
      color: var(--secondary-color);
    }
  }

  &.is-current-page {
    a:before {
      opacity: 1;
    }
    .link-icon,
    .link-text {
      color: var(--primary-color);
    }
  }

  @media (width >= 1400px) {
    .link-text {
      display: block;
    }
  }
  @media (width <= 720px) {
    .link-icon {
      height: 24px;
    }
  }
}

</style>
