<template>
  <div>
      <h1>
        Dashboard
      </h1>
      {{ user }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name : 'Dashboard',
    data(){
      return {

      }
    },
    computed:{
      ...mapGetters({
        user : 'auth/getUser'
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>