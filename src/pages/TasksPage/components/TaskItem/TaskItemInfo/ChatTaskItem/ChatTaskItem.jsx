
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import {
  getTaskChat,
  postMessageTask,
} from 'service/TaskService'
import {
  getChatData,
  postMessageChat,
} from 'service/ChatService'

import {
  createSupportMessage,
  getSupportMessagesById,
} from 'service/SupportService'
import {
  postMessageToTask,
  setTaskChat,
} from 'store/slices/TaskSlice'
import {
  postMessageToChat,
  setChatById,
} from 'store/slices/ChatSlice'
import DynamicUserInfo from 'utils/DynamicUserInfo'
import userInfo from 'utils/userInfo'
import styles from './ChatTaskItem.module.scss'
import Message from './components/Message'
import Notification from 'utils/Notifications'
import {
  setMessageSupportChat,
  postMessageToSupportChat,
} from 'store/slices/SupportSlice'
import send from 'assets/icons/send.svg'

const ChatTaskItem = ({ globalChat, SupportChat, SupportComplete }) => {
  const [currentDynamicUser, getDynamic] = useState()
  const [render, setRender] = useState(false)
  const [loadMore, setLoadMore] = useState({
    currentMessageState: 5,
    ShowMoreClicked: false,
  })
  const dispatch = useDispatch()
  const { id } = useParams()

  const [data, setData] = useState()
  const user = userInfo()
  const [text, setText] = useState()

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const getData = async () => {
    if (globalChat === false && SupportChat === false) {
      try {
        let response = await getTaskChat(id, data)
        dispatch(
          setTaskChat({
            taskchat: response.data,
          }),
        )
      } catch (error) {
        console.log(error.response)
      }
    } else if (globalChat === true) {
      try {
        let response = await getChatData(id, data)
        dispatch(
          setChatById({
            messageId: response.data,
          }),
        )
      } catch (error) {
        console.log(error.response)
      }
    } else if (SupportChat === true) {
      try {
        let response = await getSupportMessagesById(id, data)

        dispatch(
          setMessageSupportChat({
            support_message: response.data,
          }),
        )
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  useEffect(() => {
    getData()
    setRender(false)
  }, [render])
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (text === '') {
      setNotify({
        isOpen: true,
        message: 'Введите сообщение',
        type: 'warning',
        sound: 'warning',
      })
    } else if (globalChat === true) {
      try {
        let response = await postMessageChat(id, text)
        dispatch(
          postMessageToChat({
            message: text,
          }),
        )

        setRender(true)
        setText('')
      } catch (error) {
        console.log(error.response)
      }
    } else if (SupportChat === true) {
      try {
        let response = await createSupportMessage(id, text)
        dispatch(
          postMessageToSupportChat({
            commentm: text,
          }),
        )

        setRender(true)
        setText('')
      } catch (error) {
        console.log(error.response)
      }
    } else {
      try {
        let response = await postMessageTask(id, text)
        dispatch(
          postMessageToTask({
            commentm: text,
          }),
        )

        setRender(true)
        setText('')
      } catch (error) {
        console.log(error.response)
      }
    }
  }
  const all_messages = useSelector((state) =>
    globalChat === true
      ? state.chat.messageId
      : SupportChat === true
        ? state.support.support_message
        : state.task.taskchat,
  )
  let renderMessage = all_messages?.slice(0, loadMore.currentMessageState)

  useEffect(() => {
    const interval = setInterval(() => {
      setRender(true)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setRender(false)
  }, [render, all_messages])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '445px',
        maxHeight: '450px',
      }}
    >
      <div id={styles.message_wrapper_id} className={styles.message_wrapper}>
        {renderMessage.length >= 5 && loadMore.ShowMoreClicked === false ? (
          <span
            onClick={() =>
              setLoadMore({ currentMessageState: 1000, ShowMoreClicked: true })
            }
          >
            {' '}
            Предыдущие сообщения
          </span>
        ) : (
          ''
        )}

        {[...renderMessage].reverse().map((item) => {
          return <Message message={item} SupportChat={SupportChat} />
        })}

        <DynamicUserInfo getDynamic={getDynamic} />
      </div>

      {SupportComplete === undefined ||
      SupportComplete === 'На рассмотрении' ? (
        <div className={styles.write_message}>
          <div className={styles.flex}>
            <form className={styles.formsong} onSubmit={handleSubmit}>
              <input
                name="message"
                className={styles.input}
                placeholder="Введите сообщение"
                value={text}
                autoComplete="off"
                onChange={(e) => setText(e.target.value)}
              ></input>

              <button
                type="submit"
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                {' '}
                <img className={styles.send} src={send} alt="" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        ''
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default ChatTaskItem
