<template>
  <div>
      <h1>
        Dashboard
      </h1>
      <button @click="onClick">
        button 
      </button>
      <button @click="onConfirm">
        second 
      </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ComponentA from '../components/component-a.vue'
import ComponentB from '../components/component-b.vue'
  export default {
    name : 'Dashboard',
    components: {
      ComponentA,
      ComponentB
    },
    data(){
      return {

      }
    },
    computed:{
      ...mapGetters({
        user : 'auth/getUser'
      })
    },
    methods:{
      onClick(){
        this.$confirm({
          title : 'Confirm ??',
          content : 'Do you want ????',
          onOk: ()=>{
            return new Promise((resolve, reject) => {
              this.updateDate().then((res)=>{
                resolve()
              })
              .catch((err)=>{
                resolve()
              })
            });
          }
        })
      },
      onConfirm(){
        this.$confirm({
          title : 'second confirm ??',
          content : 'second Do you want ????'
        })
      },
      updateDate(){
        return new Promise((resolve, reject) => {
            setTimeout( ()=>{
              resolve()
            }, 10000)
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>