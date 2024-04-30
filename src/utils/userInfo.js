
const userInfo = () => {
  const userinfo = localStorage.getItem('user')
  const user = JSON.parse(userinfo)
  return user
}

export default userInfo
