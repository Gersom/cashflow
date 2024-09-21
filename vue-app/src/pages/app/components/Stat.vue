<script setup>

const props = defineProps({
  label: {
    type: String,
    default: 'Home'
  },
  currency:{
    type: String,
    default: '8000'
  },
  color:{
    type: String,
    default: "#fda"
  }

});

defineOptions({
  name: 'Stat'
})

</script>

<template>
  <div class="stat">
    <div
      :style="{backgroundColor: props.color }"
      class="color"
    />
    <section class="info">
      <div class="top">
        <p>{{ label }}</p>
        <p>{{ currency }} $</p>
      </div>
      <div class="bot">
        <progress
          id="file"
          max="100"
          :value="currency/100"
        >
          70%
        </progress>
        <small :style="{ color: props.color }">{{ currency/100 }}%</small>
      </div>
    </section>
  </div>
</template>

<style scoped>
.stat{
    display: flex;
    max-height: 3.4rem;
    align-items: center;
    gap: .5rem;
}

.color{
  flex-shrink: 2;
  background-color: red;
  content: '';
  height: 2.8rem;
  width: 2.8rem;
  border-radius: 50%;
}

.info{
    display: flex;
    flex-direction: column;
    flex-grow: 3;
}

.top{
  display: flex;
  justify-content: space-between;
 
}

.top > p {
  font-size: 1.4rem;
  padding: 5px 0 0 0;
  line-height: .8;
  color:  var(--text-color);
}
.bot{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.bot small{
  padding: 0 0 0 1rem;
  font-weight: 700;
}

.bot > progress{
  padding: 0;
  margin: 0;
  width: 100%;
}

p{
  margin: 0;
  padding: 0;
}

</style>
