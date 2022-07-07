<template>
  <div>
    Detail Article {{ id  }}
  </div>
</template>

<script>
  export default {
    name : 'Detail',
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