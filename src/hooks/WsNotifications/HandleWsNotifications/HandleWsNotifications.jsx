import React, { useEffect, useState } from 'react'

import { setAlertById, setAlertMessagesById } from 'store/slices/AlertSlice'
import { getChats } from 'service/ChatService'
import { setMessageChat } from 'store/slices/ChatSlice'
import Notification from 'utils/Notifications'
import UseWebSocket from '../WsNotifications'
import { useDispatch } from 'react-redux'

const HandleWsNotifications = ({ user_id }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const newSocket = new WebSocket(
      `wss://tm.unet.kg/ws/notifications/${user_id}/`,
    )

    newSocket.onopen = () => {
      newSocket.send(
        JSON.stringify({
          user_id: user_id,
          command: 'fetch_notifications',
        }),
      )
    }
    newSocket.onclose = (event) => {
      // console.log("WebSocket is closed", event);
    }
    newSocket.onerror = (error) => {
      // console.error("WebSocket error:", error);
    }
    newSocket.onmessage = (event) => {
      const messageFromServer = JSON.parse(event.data)

      if (messageFromServer.notifications) {
        dispatch(
          setAlertById({
            alerts: messageFromServer.notifications,
          }),
        )
      } else {
        setNotify({
          isOpen: true,
          sender: messageFromServer.sender_name,
          message: messageFromServer.message,
          type: 'info',
          image: messageFromServer.sender_avatar,
          link: messageFromServer.link,
        })
        dispatch(
          setAlertById({
            alerts: [messageFromServer, ...alert],
          }),
        )
      }
    }
  }, [user_id , dispatch])
  
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  return <>
    <Notification notify={notify} setNotify={setNotify}/>
  </>
}

export default HandleWsNotifications
