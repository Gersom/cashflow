<script setup>
import IconEdit from '@icons/actions/IconEdit.vue'

const emit = defineEmits(['edit'])
const props = defineProps({
  title: {
    type: String,
    default: 'Place holder'
  },
  selectedText: {
    type: String,
    default: 'value'
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  marginBottom: {
    type: String,
    default: '25px'
  }
})
</script>

<template>
  <div
    class="card-title"
    :class="{ 'is-edit': props.isEdit }"
    :style="{ marginBottom: props.marginBottom }"
  >
    <h3
      v-if="!props.isEdit"
      class="title"
    >
      <span class="normal-title">
        {{ props.title }}
      </span>
      <span class="two-point-title"> :</span>
    </h3>

    <button
      v-if="props.isEdit"
      class="title"
      @click="emit('edit')"
    >
      <span class="normal-title">
        {{ props.title }}
      </span>
      <span class="normal-title selected-text">
        {{ props.selectedText }}
      </span>
      <div class="icon-title">
        <IconEdit />
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.card-title {
  width: fit-content;
  .title {
    color: var(--title-color);
    margin: 0;
    padding: 0 0 15px 0;
    position: relative;
    transition: ease 0.3s color;
    // width: fit-content;
    .normal-title {
      font-size: 14px;
      font-weight: 500;
      font-family: var(--font-poppins);
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background-color: var(--primary-color);
    }
  }

  &.is-edit {
    .title {
      background: none;
      border-radius: 0;
      border: none;
      display: flex;
      position: relative;
      text-align: left;
      .selected-text {
        margin-left: 3px;
      }
    }
    .icon-title {
      height: 20px;
      margin-left: 7px;
    }
    &:hover {
      .title {
        color: var(--primary-color);
      }
    }
  }
}
</style>
