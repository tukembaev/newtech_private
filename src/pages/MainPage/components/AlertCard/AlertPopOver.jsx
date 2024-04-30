import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'components'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import { AnswerToInvite } from 'service/CollectiveService'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'
import styles from './AlertPopOver.module.scss'
// accardion
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'
import { setAlertById } from 'store/slices/AlertSlice'

function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0)
  const onScroll = (event) => setScrollTop(event.target.scrollTop)
  return [scrollTop, { onScroll }]
}

const AlertPopOver = () => {
  const [scrollTop, scrollProps] = useScrollTop()
  const [data, setData] = useState([])
  const user = userInfo()
  const [openModal, setOpenModal] = useState({
    modalActive: false,
    inviterName: '',
    command: '',
  })
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const alert = useSelector((state) => state.alert.alerts)
  const messages = useSelector((state) => state.alert.alertsMessages)

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])
  useEffect(() => {
    width < 600 && handleSideNavToggle()
  })
  function handleSideNavToggle() {}

  const [stateUserInfo, setStateUserInfo] = useState({
    idUser: '',
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })

  const openLink = (item) => {
    if (!item) {
      // Handle the case where item is undefined or null.
      return
    }

    const socket = new WebSocket(
      `wss://tm.unet.kg/ws/notifications/${user.userId}/`,
    )
    if (item.link && item.link.includes('task')) {
      socket.onopen = () => {
        socket.send(
          JSON.stringify({ command: 'read_notification', id: item.id }),
        )
        socket.close()
      }
      navigate(`/${item.link}`)
    } else {
      socket.onopen = () => {
        socket.send(
          JSON.stringify({ command: 'read_notification', id: item.id }),
        )
        socket.close()
      }
      navigate(`/${item.link}`)
    }
  }
  const openMessage = (item) => {
    navigate('/chats/')
  }

  const handleAccept = async (item, id_alert) => {
    const numbers = item.match(/\d+/)

    // Проверяем, есть ли числа в строке
    let extractedNumber = null
    if (numbers !== null) {
      extractedNumber = parseInt(numbers[0]) // Преобразуем из строки в число
    }

    // Ваша переменная с извлеченным числом
    const command_id = extractedNumber

    try {
      let response = await AnswerToInvite(command_id, {
        members: [{ user_id: user.userId, is_confirmed: true }],
      })
      setNotify({
        isOpen: true,
        message: 'Вы успешно добавлены',
        type: 'success',
        sound: 'success',
      })
      const socket = new WebSocket(
        `wss://tm.unet.kg/ws/notifications/${user.userId}/`,
      )
      socket.onopen = () => {
        socket.send(
          JSON.stringify({ command: 'read_notification', id: id_alert }),
        )
        socket.close()
      }
      const filteredAlerts = alert.filter(
        (alertItem) => alertItem.id !== id_alert,
      )

      dispatch(
        setAlertById({
          alerts: filteredAlerts,
        }),
      )
      setOpenModal({ modalActive: false })
    } catch (error) {
      console.log(error.response)

      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error',
        sound: 'error',
      })
    }
  }

  const handleDecline = async (item, id_alert) => {
    const numbers = item.match(/\d+/)

    // Проверяем, есть ли числа в строке
    let extractedNumber = null
    if (numbers !== null) {
      extractedNumber = parseInt(numbers[0]) // Преобразуем из строки в число
    }

    // Ваша переменная с извлеченным числом
    const command_id = extractedNumber
    try {
      let response = await AnswerToInvite(command_id, {
        members: [{ user_id: user.userId, is_confirmed: false }],
      })

      setNotify({
        isOpen: true,
        message: 'Отказано',
        type: 'success',
        sound: 'success',
      })
      const socket = new WebSocket(
        `wss://tm.unet.kg/ws/notifications/${user.userId}/`,
      )

      socket.onopen = () => {
        socket.send(
          JSON.stringify({ command: 'read_notification', id: id_alert }),
        )
        socket.close()
      }
      const filteredAlerts = alert.filter(
        (alertItem) => alertItem.id !== id_alert,
      )

      dispatch(
        setAlertById({
          alerts: filteredAlerts,
        }),
      )
      setOpenModal({ modalActive: false })
    } catch (error) {
      console.log(error.response)

      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error',
        sound: 'error',
      })
    }
  }

  // accardion
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div
      className={styles.news_card_wrapper}
      {...scrollProps}
      style={{
        boxShadow: scrollTop > 0 ? 'none' : 'none',
        maxHeight: width < 900 ? 'unset' : '750px',
        overflow: 'auto',
      }}
    >
      <div className={styles.alert_format}>
        <Badge
          badgeContent={alert.length}
          color="primary"
          style={{ zIndex: '0' }}
        >
          <Accordion
            className={styles.accardion}
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Оповещения
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ maxHeight: '35rem', overflow: 'auto' }}>
              <Typography>
                {[...alert]?.reverse().length === 0 ? (
                  <div className={styles.news_card}>
                    <div className={styles.news_heading}>
                      <div className={styles.user_info}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              paddingTop: '5px',
                            }}
                          >
                            <h4 className={styles.user_login}>
                              У вас нет новых оповещений
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  [...alert]?.map((item) => {
                    return (
                      <div className={styles.news_card}>
                        <div className={styles.news_heading}>
                          <div
                            className={styles.user_info}
                            onClick={() => {
                              if (item.status === 'U') {
                                openMessage(item)
                              } else if (
                                item?.link?.includes('teams') ||
                                item?.link?.includes('command')
                              ) {
                                setOpenModal({
                                  modalActive: true,
                                  inviterName: item.sender_name,
                                  message: item.message,
                                  id_alert: item.id,
                                  command: item.link,
                                })
                              } else {
                                openLink(item)
                              }
                            }}
                          >
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <img
                                src={item.sender_avatar}
                                style={{
                                  borderRadius: '50%',
                                  width: '34px',
                                  height: '34px',
                                  objectFit: 'cover',
                                  marginTop: '7px',
                                }}
                                alt=""
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  paddingTop: '5px',
                                }}
                              >
                                <h4 className={styles.user_login}>
                                  {item.sender_name}
                                </h4>
                                <h4 className={styles.body_title}>
                                  {item.message}
                                </h4>
                              </div>
                            </div>
                            <span className={styles.date}>
                              {item.created_at}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Badge>
      </div>
      <div className={styles.alert__messages}>
        <Badge
          badgeContent={messages.length}
          color="primary"
          style={{ zIndex: '0' }}
        >
          <Accordion
            className={styles.accardion}
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Сообщения
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {[...messages]?.reverse().length === 0 ? (
                  <div className={styles.news_card}>
                    <div className={styles.news_heading}>
                      <div className={styles.user_info}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              paddingTop: '5px',
                            }}
                          >
                            <h4 className={styles.user_login}>
                              У вас нет новых сообщений
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  [...messages]?.map((item) => {
                    return (
                      <div className={styles.news_card}>
                        <div className={styles.news_heading}>
                          <div
                            className={styles.user_info}
                            onClick={() => {
                              if (item.status === 'U') {
                                openMessage(item)
                              } else if (
                                item.link.includes('teams') ||
                                item.link.includes('command')
                              ) {
                                setOpenModal({
                                  modalActive: true,
                                  inviterName: item.sender_name,
                                  message: item.message,
                                  id_alert: item.id,
                                  command: item.link,
                                })
                              } else {
                                openLink(item)
                              }
                            }}
                          >
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <img
                                src={item.image}
                                style={{
                                  borderRadius: '50%',
                                  width: '34px',
                                  height: '34px',
                                  objectFit: 'cover',
                                  marginTop: '7px',
                                }}
                                alt=""
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  paddingTop: '5px',
                                }}
                              >
                                <h4 className={styles.user_login}>
                                  {item.sender}
                                </h4>
                                <h4 className={styles.body_title}>
                                  {item.content}
                                </h4>
                              </div>
                            </div>
                            <span className={styles.date}>{item.sent_at} </span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Badge>
      </div>
      <ModalWindow
        setOpenModal={setOpenModal}
        openModal={openModal.modalActive}
        modalTitle={`${openModal.inviterName}`}
        modalText={`${openModal?.message}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() =>
                handleDecline(openModal.command, openModal.id_alert)
              }
              className={styles.btn_pin_close}
            >
              Отказать
            </Button>
            <Button
              onClick={() =>
                handleAccept(openModal.command, openModal.id_alert)
              }
              className={styles.btn_pin}
            >
              Принять
            </Button>
          </div>
        </div>
      </ModalWindow>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default AlertPopOver
