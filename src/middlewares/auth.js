export default async function ({ next, to , store }) {
  let token = store.getters['auth/getToken']
  if( token ){
    let user = store.getters['auth/getUser']
    if( !user ){
      try {
        await store.dispatch('auth/fetchUser')
        return true
      } catch (error) {
        if( error.status == 401 ){
          store.dispatch('auth/logout')
          next({
            name : 'Login'
          })
          return false 
        }else{
          store.commit('setLoadingError', true)
          return false 
        }
      }
    }else{
      return true
    }
  }
  store.dispatch('auth/logout')
  next({
     name : 'Login'
  })
  return false 
}
