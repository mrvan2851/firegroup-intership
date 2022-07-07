let isBoard = true
export default async function ({ next, to }) {
  if ( !isBoard ) {
    next({ name: 'Article' })
    return false
  }
  return true
}
