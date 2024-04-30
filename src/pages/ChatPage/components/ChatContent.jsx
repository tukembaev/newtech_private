import send from 'assets/icons/send.svg'
import deleteIcon from 'assets/icons/trash_del.svg'
import WebSocketComponent from 'http/websockets'
import PopupState from 'material-ui-popup-state'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { deleteChats } from 'service/ChatService'
import DynamicUserInfo from 'utils/DynamicUserInfo'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'

const ChatContent = ({
  item,
  setRender,
  id,
  setId,
  name,
  image,
  userId,
  loading,
}) => {
  const user = userInfo()
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [currentDynamicUser, getDynamic] = useState()
  const [stateUserInfo, setStateUserInfo] = useState({
    idUser: '',
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })

  let socket = null

  const handleOpen = () => {}

  const handleClose = () => {}

  const handleError = (error) => {
    // Handle the error (e.g., display an error message)
  }

  const handleMessage = (event) => {
    setRender(true)
  }

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    } else {
      console.log(socket)
      // Handle the case when the socket is not open
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (text === '') {
      setNotify({
        isOpen: true,
        message: ' Попытка отправки пустого сообщения',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      try {
        let newMes = {
          chat: item.id,
          command: 'new_message',
          message: text,
          sender: user.userId,
        }

        const messageToSend = JSON.stringify(newMes)
        sendMessage(messageToSend)

        setText('')
        setRender(true)
      } catch (error) {}
    }
    // scrollMessagesToBottom(); // Scroll messages to the bottom after sending a message
  }

  const scrollMessagesToBottom = () => {
    const element = document.getElementById('messages')
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }

  useEffect(() => {
    scrollMessagesToBottom()
  }, [id, item])

  const elementRef = useRef(null)
  useEffect(() => {
    const element = elementRef.current

    const observer = new MutationObserver(() => {
      element.scrollTop = element.scrollHeight
    })

    if (element) {
      observer.observe(element, { childList: true, subtree: true })
    }

    return () => {
      observer.disconnect()
    }
  }, [id])

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  useEffect(() => {
    if (width < 600) {
      handleSideNavToggle()
    }
  })

  function handleSideNavToggle() {}

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const getFormattedDate = (date) => {
    const options = { day: '2-digit', month: 'long' }
    return new Date(date).toLocaleDateString('ru-RU', options)
  }

  const getFormattedTime = (date) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Bishkek',
    }

    const isoFormattedDate = date.replace(/\./g, '-')
    const formattedTime = new Date(isoFormattedDate).toLocaleTimeString(
      'ky-KG',
      options,
    )

    return formattedTime
  }
  const [data, setData] = useState(null)
  // const [render,setRender] = useState(false)

  const deleteChat = async (id) => {
    try {
      let response2 = await deleteChats(id, data)

      setRender(true)
    } catch (error) {
      console.log(error.response2)
    }
  }

  const memoizedMessages = useMemo(() => {
    if (!item.messages) return []
    return item.messages.map((message, index, array) => {
      const isoFormattedDate = message.sent_at.replace(/\./g, '-') // Convert to ISO format
      const currentDate = getFormattedDate(isoFormattedDate)

      const previousMessage = index > 0 ? array[index - 1] : null
      const previousIsoFormattedDate = previousMessage
        ? previousMessage.sent_at.replace(/\./g, '-')
        : null
      const previousDate = previousIsoFormattedDate
        ? getFormattedDate(previousIsoFormattedDate)
        : null

      return (
        <React.Fragment key={message.id}>
          {previousDate !== currentDate && (
            <li className="date-separator">
              <span>{currentDate}</span>
            </li>
          )}

          <li className={user.userId === message.user ? 'sent' : 'replies'}>
            <img src={message.image} alt="" />
            <p>
              {message.content}
              <br /> <span>{getFormattedTime(message.sent_at)}</span>
            </p>
          </li>
        </React.Fragment>
      )
    })
  }, [item.messages])

  return (
    <div className="content">
      {id === undefined ? (
        <div className="contact-profile">
          <h4 style={{ color: 'white' }}>Выберите чат для общения</h4>
        </div>
      ) : (
        <>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <>
                <div
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setStateUserInfo({ idUser: userId })}
                >
                  <div className="contact-profile">
                    <div>
                      <img src={image === undefined ? '' : image} alt="" />
                      <p
                        style={{ color: 'white' }}
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                      >
                        {name === undefined ? '' : name}
                      </p>
                    </div>
                    {item?.messages?.length === 0 ? (
                      <button
                        onClick={() => {
                          deleteChat(item.id)
                          setId(undefined)
                        }}
                        type="submit"
                        style={{
                          border: 'none',
                          background: 'none',
                          padding: 0,
                          cursor: 'pointer',
                        }}
                      >
                        <img src={deleteIcon} className="send" alt="" />
                      </button>
                    ) : null}
                  </div>
                </div>
                {/* <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                >
                  <ProfilePage userId={stateUserInfo.idUser} />
                </Popover> */}
              </>
            )}
          </PopupState>
        </>
      )}
      {loading && item.length !== 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
          }}
        >
          <ScaleLoader color="white" size={30} />
        </div>
      ) : (
        <div id="messages" className="messages" ref={elementRef}>
          <ul>{memoizedMessages}</ul>
        </div>
      )}
      {id === undefined || loading === true ? (
        ''
      ) : (
        <div className="write_message">
          <div className="flex">
            <form className="formsong" onSubmit={handleSubmit}>
              <input
                name="message"
                className="input"
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
                <img src={send} className="send" alt="" />
              </button>
            </form>
          </div>
        </div>
      )}

      <WebSocketComponent
        url={`wss://tm.unet.kg/ws/chat/${item.id}/`}
        onOpen={handleOpen}
        onClose={handleClose}
        onError={handleError}
        onMessage={handleMessage}
        setSocket={(s) => (socket = s)}
      />
      <DynamicUserInfo getDynamic={getDynamic} />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default ChatContent
