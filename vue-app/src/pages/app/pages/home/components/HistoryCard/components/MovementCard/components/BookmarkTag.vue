<script setup>
import { getContrastColor} from '@utils/color.js';
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {
        id: 0,
        color: "orange",
        iconName: "shopping-bag",
        name: "Compras",
      };
    },
  },
});

const textColor = computed(() => getContrastColor(props.data.color))
</script>

<template>
    <div  :style="{ background: props.data.color, color:textColor}" class="bookmark">
        <span class="bookmark-data"> 
            <i :class="`icon icon-${props.data.iconName}`"/>
            <p class="bookmark-name"> {{ props.data?.name?.toUpperCase() }}</p>
        </span>
        <span  :style="{ background: props.data.color }" class="fix" />
    </div>
</template>

<style lang="scss" scoped>
.bookmark {
  height: 24px;
  position: relative;
  top: 0px;
  color: var(--title-color);
  padding: 0px 12px;
  border-radius: 8px 8px 0 0;
  font-weight: 500;
  
  z-index: 0;
  width: fit-content;
  text-align: end;

  .bookmark-data{
    height: 105%;
    display: flex;
    align-items: flex-end;
    gap: 4px;

    & > i{
      font-size: 15px;
      padding: 0 0 5px 0px;
    }

    .bookmark-name{
      font-family: var(--font-poppins);
      font-size: 10px;
      font-weight: 600;
      line-height: 2.25;
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }

  .fix {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 15px;
  }
}
</style>