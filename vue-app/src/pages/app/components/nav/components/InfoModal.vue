<script setup>
import { useAppStore } from "@stores/app";
import LogoTitle from "@components/LogoTitle/LogoTitle.vue";

const appStore = useAppStore();
</script>

<template>
  <div class="info-modal">
    <div class="logo-title">
      <LogoTitle />
    </div>
    <!-- <h2 class="title">
      <span class="secondary">Cash</span>
      <span class="primary">Flow</span>
    </h2> -->
    <p class="description">
      {{ appStore.description }}
    </p>

    <h3 class="developers-title">
      Developers
    </h3>
    <p class="developers-paragraph">
      <a
        :href="appStore.devGersom.link"
        class="developers-link"
        target="_blank"
      >
        {{ appStore.devGersom.name }}
      </a>
      <span class="separator"> - </span>
      <a
        :href="appStore.devDavid.link"
        class="developers-link"
        target="_blank"
      >
        {{ appStore.devDavid.name }}
      </a>
    </p>

    <h3 class="version-title">
      Versión
    </h3>
    <p class="version-paragraph">
      {{ appStore.version }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.info-modal {
  color: var(--text-color);
  padding: 50px 30px;
  text-align: center;
  .logo-title {
    margin-bottom: 15px;
  }
  .title {
    font-family: var(--font-poppins);
    font-weight: 400;
    font-size: 25px;
    margin: 0 0 15px 0;
    .primary {
      color: var(--primary-color);
    }
    .secondary {
      color: var(--secondary-color);
    }
  }

  .description {
    margin: 0 0 25px 0;
  }
  .version-paragraph {
    margin-bottom: 0;
  }

  .description,
  .version-paragraph {
    max-width: 440px;
    font-size: 14px;
    color: var(--subtitle-color);
  }

  .version-title,
  .developers-title {
    font-size: 14px;
    font-family: var(--font-poppins);
    font-weight: 500;
    margin: 0 0 15px 0;
  }

  .developers-paragraph {
    background: linear-gradient(
      90deg,
      var(--secondary-color) 15%,
      var(--primary-color) 80%
    );
    background-clip: text;
    color: transparent;
    font-family: var(--font-poppins);
    margin: 0 0 25px 0;
    .developers-link {
      font-size: 16px;
      font-weight: 500;
      color: currentColor;
      &:hover {
        text-decoration: underline;
        color: var(--secondary-color);
      }
    }
  }
}
</style>
