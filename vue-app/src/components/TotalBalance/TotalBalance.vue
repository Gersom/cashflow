<script setup>

const props = defineProps({
  balance: {
    type: String,
    default: '25,442.86'
  }
});

defineOptions({
  name: 'TotalBalance'
})

</script>

<template>
  <div class="balance">
    <small>Saldo total</small>
    <br>
    <h5 class="underlined"> $ {{ props.balance }} </h5>
  </div>
</template>

<style scoped>
.balance{
    line-height: 1.2;
}

.balance small{
    font-size: 1.4rem;
    font-weight: 700;
    color: var( --subtitle-color);
}

.underlined {
  color: var(--text-color);
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0 0 5px 5px;
  font-size: 3.6rem;
}

.underlined::first-letter{
    font-size: 1.8rem;
    vertical-align: middle;
    text-wrap: nowrap;
}

.underlined::after {
  content: '';
  position: absolute;
  left: 5px;
  bottom: 0;
  width: 100%;
  height: .3rem;
  text-wrap: nowrap;
  background-color: var(--secondary-color);
}
</style>
