import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAlertMessagesById } from 'store/slices/AlertSlice'
import MessageNotification from 'utils/MessageNotification'

const HandleWsChat = ({ user_id , chatId }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const newSocket = new WebSocket(
      `wss://tm.unet.kg/ws/chat/${chatId}/`,
    )
    
    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data)

      if (receivedMessage.user !== user_id) {
        dispatch(
          setAlertMessagesById({
            alertsMessages: [...alert, receivedMessage],
          }),
        )
        setNotify({
          isOpen: true,
          sender: receivedMessage.sender,
          message: receivedMessage.content,
          type: 'info',
          image: receivedMessage.image,
        })
      }
    }
  }, [chatId , dispatch , user_id])
  
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  return <>
    <MessageNotification notify={notify} setNotify={setNotify} />
  </>
}

export default HandleWsChat
