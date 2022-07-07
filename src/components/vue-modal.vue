<template>
  <div class="vue-modal" :class="{ 'is-active' :  visible }" @click.self="onClickBackdrop">
    <div class="vue-modal-wrap">
      <div class="vue-modal-header">
        <slot name="header"></slot>
        <div class="vue-modal-close" v-if="closeable" @click="onClickClose">
          X
        </div>
      </div>
      <div class="vue-modal-body" ref="body">
        <button @click="onClickVisible"> visible footer</button>
        <slot></slot>
      </div>
      <div class="vue-modal-footer" ref="footer" v-if="visible_footer"> 
        <h3>This is footer</h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name : 'VueModal',
    props:{
      value :{
        type:[ Boolean ]
      },
      closeable:{
        type: [ Boolean ],
        default : true
      },
      backdrop:{
        type: [ Boolean ],
        default : true
      }
    },
    data(){
      return {
        visible_footer : false
      }
    },  
    computed:{
      visible: {
        get(){
          return this.value 
        },
        set(value){
          this.$emit('input', value)
        }
      }
    },
    methods:{
      hideModal(){
        this.visible = false
      },
      onClickBackdrop(){
        if( this.backdrop ){
          this.hideModal()
        }
      },
      onClickClose(){
        if( this.closeable ){
          this.hideModal()
        }
      },
      async onClickVisible(){
        this.visible_footer = true 
        await this.$nextTick()
        console.log(this.$refs.footer);
      }
    },
    mounted(){
      let body = document.querySelector('body')
      body.appendChild(this.$el)
    },
    beforeDestroy() {
      this.$el.remove()
    },
  }
</script>

<style lang="scss" scoped>
  .vue-modal{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0,0,0,0.5);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    text-align: center;
    overflow: hidden auto;
    &:before {
      display: inline-block;
      width: 0;
      height: 100%;
      vertical-align: middle;
      content: '';
    }
    &.is-active{
      opacity: 1;
      visibility: visible;
    }
    &-wrap{
      top: 0;
      display: inline-block;
      vertical-align: middle;
      width: 400px;
      background: #ffffff;
      text-align: left;
      
    }
    &-header{
      padding:  12px 16px;
      border-bottom: 1px solid #ccc;
      position: relative;
    }
    &-body{
      padding:  12px 16px;
      min-height: 20px;
    }
    &-footer{
      padding:  12px 16px;
      border-top: 1px solid #ccc;
    }
    &-close{
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 1;
      cursor: pointer;
      opacity: 0.5;
      &:hover{
        opacity: 1;
      }
    }
  }
</style>