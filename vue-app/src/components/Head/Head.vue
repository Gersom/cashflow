<script setup>
defineOptions({
  name: 'Head'
})
</script>

<template>
  <header class="head">
    <div class="head-info">
      <h2>Bienvenido</h2>
      <small>User2345</small>
    </div>
    <div class="profile--container">
      <img
        src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="profile_img">
    </div>
  </header>
</template>

<style scoped>
.head {
  height: 10%;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.head-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.head h2 {
  color: var(--primary-color);
  display: block;
  line-height: .9;
  margin: 0;
  padding: 0;
}

.head small {
  margin: 0;

  padding: 0 .2rem;
  color: var(--button-text-color);


}

.profile--container {
  position: relative;
  width: 45px;
  height: 45px;
  overflow: hidden;
  border-radius: 50%;
  border: 1rem;
  background-color: var(--primary-color);
  box-shadow: 0px 0px 0px 3px var(--primary-color);

}
</style>
