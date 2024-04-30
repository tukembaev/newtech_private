import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from 'service/AuthService'
import { setUserAvatar } from 'store/slices/UserSlice'
import userInfo from './userInfo'
const DynamicAvatar = ({ idEmployee, getDynamic }) => {
  const user = userInfo()
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getUserDynamicInfo = async () => {
    try {
      let response = await getUserInfo(user.userId)

      dispatch(
        setUserAvatar({
          userAvatar: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
      if (error.response.data.code === 'token_not_valid') {
        const socket = new WebSocket('wss://tm.unet.kg/ws/online_status/')

        socket.onopen = () => {
          socket.send(
            JSON.stringify({ command: 'disconnect', user_id: user.userId }),
          )
          socket.close()
        }
        localStorage.removeItem('token')
        localStorage.removeItem('task')
        localStorage.removeItem('user')
        localStorage.removeItem('subscription_title')
        localStorage.removeItem('background')
        localStorage.removeItem('subscription')
        navigate('/')
      }
    }
  }
  useEffect(() => {
    getUserDynamicInfo()
  }, [])

  const dynamicUserInfo = useSelector((state) => state.user)
  useEffect(() => {
    getDynamic(dynamicUserInfo.userAvatar)
  })

  return <></>
}

export default DynamicAvatar
