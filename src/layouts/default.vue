<template>
  <div id="app" class="vue-layout-default">
    <div class="vue-layout-default-aside">
      <vue-navbar />
    </div>
    <div class="vue-layout-default-content">
      <router-view/>
    </div>
    <vue-modal-confirm />
  </div>
</template>
<script>
import VueNavbar from './partials/vue-sidebar.vue'
export default {
  name : 'LayoutDefault',
  components: {
    VueNavbar
  },
}
</script>
<style lang="scss" scoped>
  .vue-layout-default{
    padding: 0 0 0 200px;
    &-aside{
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 200px;
      z-index: 500;
      border-right: 1px solid #ccc;
    }
    &-content{
      position: relative;
    }
  }
</style>
