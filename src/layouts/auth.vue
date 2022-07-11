<template>
  <div id="app" class="vue-layout-auth">
    <div class="vue-layout-auth-content">
      <div class="vue-layout-auth-content-header">
        <img src="@/assets/images/logo.svg" alt="">
      </div>
      <div class="vue-layout-auth-content-body">
        <div class="vue-layout-auth-content-wrapper">
          <router-view/>
        </div>
      </div>
    </div>
    <div class="vue-layout-auth-aside">
      <div class="vue-layout-auth-aside-image">
        <img src="@/assets/images/art_work.svg" alt="">
      </div>
    </div>
    
  </div>
</template>

<style lang="scss">
  .vue-layout-auth{
    min-height: 100vh;
    width: 100%;
    position: relative;
    &-content{
      width: 60%;
      float: left;
      &-header{
        padding: 30px;
      }
      &-body{
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 100px);
      }
      &-wrapper{
        max-width: 400px;
        margin: 0 auto;
      }
    }
    &-aside{
      width: 40%;
      float: left;
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: #CCDCFF;
    }
    &:after{
      content : '';
      clear: both;
      display: table;
    }
  }
</style>
