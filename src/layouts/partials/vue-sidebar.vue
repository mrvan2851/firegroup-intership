<template>
  <div class="vue-sidebar">
    <ul>
      <li v-for="item in options" :key="item.id" :class="{ 'is-active' : setActive(item.id) }">
        <router-link :to="{ name : item.route }">
           {{ item.text }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name : 'Sidebar',
    data(){
      return {
        options : [
          {
            id : 'Dashboard',
            route: 'Dashboard',
            text: 'Dashboard'
          },
          {
            id : 'Article',
            route: 'Article',
            text: 'Article'
          }
        ],
        modules : {
          'Dashboard' : ['Dashboard'],
          'Article': ['Article' , 'CreateArticle' , 'DetailArticle'],
        }
      }
    },
    methods:{
      setActive(key){
        let nameRouter = this.$route.name 
        if( this.modules[key].includes(nameRouter )){
          return true 
        }
        return false 
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vue-sidebar{
    ul{
      list-style-type: none;
      padding: 0;
      li{
        a{
          display: flex;
          width: 100%;
          min-height: 32px;
          align-items: center;
          padding: 6px 12px;
          font-size: 14px;
          color: #000;
          text-decoration: none;
        }
        &.is-active{
          a{
            color: #5B86E5;
          }
        }
      }
    }
  }
</style>