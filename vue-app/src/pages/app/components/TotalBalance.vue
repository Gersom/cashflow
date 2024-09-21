<script setup>

const props = defineProps({
  balance: {
    type: String,
    default: '25,442.86'
  }
})

defineOptions({
  name: 'TotalBalance'
})

</script>

<template>
  <div class="balance">
    <small>Saldo total</small>
    <br>
    <h3 class="underlined">
      $ {{ props.balance }}
    </h3>
  </div>
</template>

<style scoped>
.balance{
    line-height: 1.2;
}

.balance small{
    color: var( --subtitle-color);
    font-family: var(--font-poppins);
    font-weight: 500;
    font-size: 14px;
}

.underlined {
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0 0 5px 5px;
  font-family: var(--font-poppins);
  font-weight: 500;
  font-size: 36px;
}

.underlined::first-letter{
    font-size: 20px;
    vertical-align: middle;
    text-wrap: nowrap;
}

.underlined::after {
  content: '';
  position: absolute;
  left: 5px;
  bottom: 0;
  width: 100%;
  height: 3px;
  text-wrap: nowrap;
  background-color: var(--secondary-color);
}
</style>
