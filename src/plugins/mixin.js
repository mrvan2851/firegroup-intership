export default {
  data(){
    return {
      hello : 'hello test'
    }
  },
  methods:{
    redirect(route){
      this.$router.push(route)
    },
    toastMessage(){

    }
  }
}