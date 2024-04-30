import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChatData, getChats } from 'service/ChatService'
import { setChatById, setMessageChat } from 'store/slices/ChatSlice'
import ChatPage from './ChatPage'

const ChatPageContainer = () => {
  const [data] = useState()
  const [id, setId] = useState()
  const [render, setRender] = useState(false)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    try {
      let response = await getChats(data)

      dispatch(
        setMessageChat({
          messagechat: response.data,
        }),
      )
    } catch (error) {}
  }

  useEffect(() => {
    getData()
    setRender(false)
  }, [render])

  const getMessageId = async () => {
    try {
      let response2 = await getChatData(id, data)

      dispatch(
        setChatById({
          messageId: response2.data,
        }),
      )
      setLoading(false)
    } catch (error) {
      console.log(error.response2)
    }
  }

  useEffect(() => {
    getMessageId()
    setRender(false)
  }, [render, id])

  const allChats = useSelector((state) => state.chat)

  useEffect(() => {
    dispatch(
      setChatById({
        messageId: [],
      }),
    )
  }, [window.location.pathname])

  return (
    <>
      <ChatPage
        all_chats={allChats}
        setRender={setRender}
        setId={setId}
        setLoading={setLoading}
        loading={loading}
      />
    </>
  )
}

export default ChatPageContainer
