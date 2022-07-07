import axios from "./axios";
const api = {
  get(url, params = {}, cancel_token = null) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params,
          cancelToken: cancel_token ? cancel_token.token : null,
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            return reject("canceled");
          }
          reject(err);
        });
    });
  },

  post(url, data = {}) {},

  put(url, data = {}) {},

  delete(url, data = {}) {},
};

export default {
  getUser (payload) {
    let { id } = payload 
    return api.get(`/use/${id}`, { id })
  },
  getListUser(payload){
    let { page = 1, sort ='A-Z' , search  = 'name' } = payload 
    return api.get('/users',  { page , sort , search })
  }
};
