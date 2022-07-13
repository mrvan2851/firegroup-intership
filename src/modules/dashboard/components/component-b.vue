<template>
  <div>
    ComponentB
    <button @click="onClick">
      button
    </button>
  </div>
</template>

<script>
  export default {
    name : 'ComponentB',
    data(){
      return {
        options:{
          a : 1,
          b: 2,
          c: 3
        }
      }
    },  
    methods:{
      onClick(){
        this.$eventBus.$emit('onMessage', this.options)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>