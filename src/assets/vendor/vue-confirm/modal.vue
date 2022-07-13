<template>
  <div class="vue-modal" :class="{ 'is-active': visible }" @click.self="onClickBackdrop">
    <div class="vue-modal-wrap">
      <div class="vue-modal-header">
        {{ options.title }}
        <div class="vue-modal-close" v-if="closeable" @click="onClickClose">X</div>
      </div>
      <div class="vue-modal-body" ref="body">
        {{ options.content }}
      </div>
      <div class="vue-modal-footer" ref="footer">
        <button @click="hideModal">Cancel</button>
        <button @click="onClickOk">
          <template v-if="is_loading">loading ...</template>
          <template v-else>Ok</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Register from "./index";
  export default {
    name: "VueModal",
    props: {
      allowedShow:{
        
      }
    },
    data() {
      return {
        is_loading: false,
        closeable: true,
        backdrop: true,
        visible: false,
        options: {
          title: "Default title",
          content: "Default content",
          onOk: () => {},
        },
      };
    },
    methods: {
      hideModal() {
        this.visible = false;
      },
      onClickBackdrop() {
        if (this.backdrop) {
          this.hideModal();
        }
      },
      onClickClose() {
        if (this.closeable) {
          this.hideModal();
        }
      },
      async onClickVisible() {
        this.visible_footer = true;
        await this.$nextTick();
        console.log(this.$refs.footer);
      },
      showModalConfirm(payload) {
        console.log("showModalConfirm");
        console.log(payload);
        this.options = { ...this.options, ...payload };
        this.visible = true;
      },
      onClickOk() {
        console.log("on click oke button");
        if (typeof this.options.onOk == "function") {
          this.is_loading = true;
          this.closeable = false;
          this.backdrop = false;
          Promise.resolve(this.options.onOk()).then(() => {
            this.visible = false;
            this.is_loading = false;
            this.closeable = true;
            this.backdrop = true;
          });
        } else {
          this.visible = false;
        }
      },
    },
    created() {
      Register.EventBus.$on("showModalConfirm", this.showModalConfirm);
    },
    mounted() {
      let body = document.querySelector("body");
      body.appendChild(this.$el);
    },
    beforeDestroy() {
      this.$el.remove();
      Register.EventBus.$off("showModalConfirm", this.showModalConfirm);
    },
  };
</script>

<style lang="scss" scoped>
  .vue-modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
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
      content: "";
    }
    &.is-active {
      opacity: 1;
      visibility: visible;
    }
    &-wrap {
      top: 0;
      display: inline-block;
      vertical-align: middle;
      width: 400px;
      background: #ffffff;
      text-align: left;
    }
    &-header {
      padding: 12px 16px;
      border-bottom: 1px solid #ccc;
      position: relative;
    }
    &-body {
      padding: 12px 16px;
      min-height: 20px;
    }
    &-footer {
      padding: 12px 16px;
      border-top: 1px solid #ccc;
      text-align: right;
      button {
        display: inline-block;
        background: #fff;
        border: 1px solid #ccc;
        color: #000;
        outline: none;
        box-shadow: none;
        padding: 6px 12px;
        ~ button {
          margin-left: 20px;
        }
      }
    }
    &-close {
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 1;
      cursor: pointer;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>
