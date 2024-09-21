<script setup>
// No se necesita lógica adicional en el script para este componente
</script>

<template>
  <div class="masonry">
    <div class="profile-actions">
      <div class="item profile-area">
        <slot name="profile" />
      </div>
      <div class="item actions-area">
        <slot name="actions" />
      </div>
    </div>
    <div class="personal-empty">
      <div class="item personal-area">
        <slot name="personal" />
      </div>
    </div>
    <div class="password-empty">
      <div class="item password-area">
        <slot name="password" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.masonry {
    padding-bottom: 22px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 22px;

    .item {
    padding: 22px;
    border-radius: 10px;
    background-color: var(--background-color2)
    
    }

    .profile-actions {
        display: flex;
        flex-direction: column;
        gap: 22px;
        .profile-area {
            min-height: 460px;
        }
        
        .actions-area {
           min-height: 382px;
        }
    }

    .personal-area {
       min-height: 373px;
    }

    .password-area {
       min-height: 306px;
        
    }

}

</style>