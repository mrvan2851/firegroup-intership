export default {
  data(){
    return {
      form : {
        title : '',
        content : ''
      }
    }
  },
  methods:{
    onSubmit(){
      alert('on submit')
    }
  }
}