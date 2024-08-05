<script setup>

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

</script>

<template>
    <div  :style="{ background: props.data.color }" class="bookmark">
        <span class="bookmark-data"> 
            <i :class="`icon icon-${props.data.iconName}`"/>
            <p class="bookmark-name"> {{props.data.name}}</p>
        </span>
        <span  :style="{ background: props.data.color }" class="fix" />
    </div>
</template>

<style lang="scss" scoped>
.bookmark {
    height: 24px;
    position: relative;
    top: 0px;
    color: var(--text-color);
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
            margin: 0;
            padding: 0;
            line-height: 2;
            font-size: 10px;
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