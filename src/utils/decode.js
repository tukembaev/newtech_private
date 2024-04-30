import jwt_decode from 'jwt-decode'

const tokenDecode = (refresh) => {
  const { user_id } = jwt_decode(refresh)
  return user_id
}

export default tokenDecode
