<template>
  <div>
    Detail Article {{ id  }}
  </div>
</template>

<script>
  import form from '../mixin/form'
  export default {
    name : 'Detail',
    mixins: [form],
    data(){
      return {
        id : ''
      }
    },
    created(){
      this.id = this.$route.params.id 
    }
  }
</script>

<style lang="scss" scoped>

</style>