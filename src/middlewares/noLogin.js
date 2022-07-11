export default async function ({ next, to, store }) {
  let token = store.getters['auth/getToken']
  if( token ){
    next({
      name : 'Dashboard'
    })
    return false 
  }
  return true
}
