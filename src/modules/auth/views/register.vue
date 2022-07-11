<template>
  <div class="vue-app-register-page">
    <div class="vue-app-register-page-header">Register Account</div>
    <div class="vue-app-register-page-body">
      <form class="vue-app-register-page-form" novalidate @submit.stop.prevent="onSubmit">
        <div class="vue-app-register-page-form-item">
          <input type="text" v-model="form.name" placeholder="Full name" />
          <div class="vue-app-register-page-form-error" v-if="formstate">
            <template v-if="!validation.form.name.required">Name is required !</template>
          </div>
        </div>
        <div class="vue-app-register-page-form-item">
          <input type="email" v-model="form.email" placeholder="Email" />
          <div class="vue-app-register-page-form-error" v-if="formstate">
            <template v-if="!validation.form.email.required">Email is required !</template>
          </div>
        </div>
        <div class="vue-app-register-page-form-item">
          <input type="password" v-model="form.password" placeholder="Password" />
          <div class="vue-app-register-page-form-error" v-if="formstate">
            <template v-if="!validation.form.password.required">Password is required !</template>
            <template v-else-if="!validation.form.password.minLength">
              Password min length 6 character!
            </template>
          </div>
        </div>
        <div class="vue-app-register-page-form-item">
          <button type="submit">Create Free Account</button>
        </div>
      </form>
    </div>
    <div class="vue-app-register-page-footer">
      Already have an account?
      <router-link :to="{ name: 'Login' }">Login Now</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    name: "Register",
    components: {
      
    },
    data() {
      return {
        form: {
          email: "van100@gmail.com",
          password: "123456",
          timezone: "Asia/Bangkok",
          name: "van",
        },
        formstate: false,
        is_loading: false,
      };
    },
    computed: {
      validation() {
        const email = {
          required: this.form.email ? true : false,
        };
        const password = {
          required: this.form.password ? true : false,
          minLength: this.form.password.length >= 6 ? true : false,
        };
        const name = {
          required: this.form.name ? true : false,
        };
        return {
          form:{
            email,
            password,
            name,
          },
          valid : email.required && password.required && password.minLength && name.required
        };
      },
    },
    methods: {
      ...mapActions({
        register : 'auth/register'
      }),
      onSubmit() {
        this.formstate = true;
        if( this.is_loading || !this.validation.valid ) return 
        this.is_loading = true 
        this.register(this.form).then((res)=>{
          console.log(res);
          let { status  } = res 
          if( status ){
            this.$router.push({
              name : 'Dashboard'
            })
          }
          this.is_loading = false
        })
        .catch((err)=>{
          console.log(err);
          this.is_loading = false 
        })
      },
    },
    watch:{

    },
    created(){

    },
    mounted(){
      
    }
  };
</script>

<style lang="scss" scoped>
  .vue-app-register-page {
    &-header {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 700;
      font-size: 38px;
      color: #5b86e5;
      margin-bottom: 20px;
    }
    &-body {
    }
    &-form {
      &-item {
        display: block;
        margin-bottom: 20px;
        position: relative;
        input {
          height: 32px;
          display: block;
          padding: 8px 12px;
          background: #fff;
          border: 1px solid #ccc;
          font-size: 14px;
          width: 100%;
          &:focus {
            box-shadow: none;
            outline: none;
            border-color: #5b86e5;
          }
        }
        button {
          display: block;
          width: 100%;
          padding: 8px 12px;
          height: 32px;
          text-align: center;
          color: #fff;
          background: #5b86e5;
          border: 1px solid #5b86e5;
        }
      }
      &-error {
        color: #f2545d;
      }
    }
  }
</style>
