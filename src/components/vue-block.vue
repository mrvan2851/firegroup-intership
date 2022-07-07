<template>
  <div class="vue-block">
    <div class="vue-block-header">
      <slot name="option" v-bind:option="user">
        {{ user.name }}
      </slot>
    </div>
    <div class="vue-block-body">
      <slot></slot>
    </div>
    <div class="vue-block-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name : 'VueBlock',
    props:{

    },
    data(){
      return {
        heading : 'heading from component',
        user :{
          name : 'Nam',
          age : 18
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vue-block{
    &-header{
      color: #000;
      font-size: 20px;
    }
    &-body{
      font-size: 14px;
    }
  }
</style>