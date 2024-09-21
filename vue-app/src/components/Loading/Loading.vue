<script setup>
</script>

<template>
  <div class="loading" />
</template>

<style scoped>
  .loading {
    height: 100%;
    padding: 4px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--secondary-color);
    mask: conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
  }

  @keyframes l3 {
    0% {}
    50% { background: var(--primary-color); }
    100% { transform: rotate(1turn);}
  }
</style>
