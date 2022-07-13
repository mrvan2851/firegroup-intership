<template>
  <div>
    ComponentA
  </div>
</template>

<script>
  export default {
    name : 'ComponentA',
    methods:{
      onMessage(payload){
        console.log(payload);
      }
    },
    created(){
      this.$eventBus.$on('onMessage', this.onMessage)
    },
    beforeDestroy() {
      this.$eventBus.$off('onMessage', this.onMessage)
    },
  }
</script>

<style lang="scss" scoped>

</style>