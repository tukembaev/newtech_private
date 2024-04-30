import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getChats } from 'service/ChatService'
import { setMessageChat } from 'store/slices/ChatSlice'
import userInfo from 'utils/userInfo'
import HandleWsNotifications from './HandleWsNotifications/HandleWsNotifications'
import HandleWsChat from './HandleWsChat/HandleWsChat'

const WsNotifications = () => {
  const location = useLocation()
  const shouldRenderWebSocketComponent = !location.pathname.includes('/chats/')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = userInfo()
  let data
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await getChats(data)

        dispatch(
          setMessageChat({
            messagechat: response.data,
          }),
        )
      } catch (error) {
        console.log(error.response)
        if (error?.response?.data?.code === 'token_not_valid') {
          const socket = new WebSocket('wss://tm.unet.kg/ws/online_status/')

          socket.onopen = () => {
            socket.send(
              JSON.stringify({ command: 'disconnect', user_id: user?.userId }),
            )
            socket.close()
          }

          navigate('/')
        }
      }
    }
    if (user?.userId) {
      getData()
    }
  }, [])
  const allChats = useSelector((state) => state.chat.messagechat)

  return (
    <>
      {user?.userId ? (
        <>
          <HandleWsNotifications user_id={user.userId} />
          {shouldRenderWebSocketComponent &&
            allChats?.map((item) => (
              <HandleWsChat
                key={item.id}
                chatId={item.id}
                user_id={user?.userId}
              />
            ))}
          <HandleWsChat user_id={user?.userId} />
        </>
      ) : null}
    </>
  )
}

export default WsNotifications
