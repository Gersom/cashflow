<script setup>
import IconLogo from '@icons/others/IconLogo.vue'

const props = defineProps({
  title: {
    type: Boolean,
    default: true
  },
  titlePrimary: {
    type: String,
    default: 'Cash'
  },
  titleSecondary: {
    type: String,
    default: 'Flow'
  }
})
</script>

<template>
  <div class="logo-title">
    <div class="logo-icon">
      <IconLogo />
    </div>
    <h2
      v-if="props.title"
      class="title"
    >
      <span style="--clr-logo: var(--secondary-color)">
        {{ props.titlePrimary }}
      </span>
      <span style="--clr-logo: var(--primary-color)">
        {{ props.titleSecondary }}
      </span>
    </h2>
  </div>
</template>

<style lang="scss" scoped>
.logo-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .logo-icon {
    height: 60px;
  }

  .title {
    font-size: 30px;
    margin: 5px 0 0 0;
    font-weight: 400;
    span {
      color: var(--clr-logo);
    }
  }
}
</style>
