<template>
  <div>
      <div v-if="is_loading">
        loading ...
      </div>
      <div v-else> 
        <template v-if="is_error">
          <div>
            error
          </div>
        </template>
        <template v-else>
          <div>
            {{ user }}
          </div>
        </template>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
  export default {
    name : 'Dashboard',
    data(){
      return {
        is_loading : true,
        is_error : false 
      }
    },
    computed:{
      ...mapGetters({
        isLogged : 'auth/isLogged',
        user: 'auth/getUser'
      })
    },
    methods:{
      ...mapActions({
        getUserInfo : 'auth/fetchUser'
      }),
      onClick(){
        this.updateUser({
          name : 'XYZ',
          age: 25
        })
      }
    },
    async  created(){
      try {
        let res = await this.getUserInfo({ id :15})
      } catch (error) {
        this.is_error = true
      }
      this.is_loading = false 
    }
  }
</script>

<style lang="scss" scoped>

</style>