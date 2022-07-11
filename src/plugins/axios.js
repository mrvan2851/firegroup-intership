import { default as instance } from "axios";
import cookie from '@/plugins/cookie'
import store from '@/store'
let axios = instance.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 60 * 1000,
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});
axios.CancelToken = instance.CancelToken;
axios.isCancel = instance.isCancel;
axios.interceptors.request.use(function (config) {
  let token = cookie.get("test_token");
  if (token) {
    config.headers["Authorization"] =  token;
  }
  return config;
});
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch("auth/logout");
    }
    return Promise.reject(error.response);
  },
);
export default axios;
