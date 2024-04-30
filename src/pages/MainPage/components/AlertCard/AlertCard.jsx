import React, { useEffect, useState } from 'react'
import styles from './AlertCard.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAlertData } from 'service/AlertService.js'
import { setAlertById } from 'store/slices/AlertSlice'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Button } from 'components'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import Notification from 'utils/Notifications'
import { AnswerToInvite } from 'service/CollectiveService'
import userInfo from 'utils/userInfo'
// accardion
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Badge from '@mui/material/Badge'

function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0)
  const onScroll = (event) => setScrollTop(event.target.scrollTop)
  return [scrollTop, { onScroll }]
}

const AlertCard = () => {
  const [scrollTop, scrollProps] = useScrollTop()
  const [data, setData] = useState([])
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
  const user = userInfo()

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

  const openLink = (item) => {
    if (item?.link.includes('task')) {
      navigate(`/${item?.link}`)
    } else {
      navigate(`/${item?.link}`)
    }
  }
  const openMessage = () => {
    navigate(`/chats/`)
  }

  const handleAccept = async (item) => {
    try {
      let response = await AnswerToInvite(item[0], {
        members: [{ user_id: user.userId, is_confirmed: true }],
      })

      setNotify({
        isOpen: true,
        message: 'Вы успешно добавлены',
        type: 'success',
        sound: 'success',
      })

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

  const handleDecline = async (item) => {
    try {
      let response = await AnswerToInvite(item[0], {
        members: [{ user_id: user.userId, is_confirmed: false }],
      })

      setNotify({
        isOpen: true,
        message: 'Отказано',
        type: 'success',
        sound: 'success',
      })
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
  const alert = useSelector((state) => state.alert.alerts)
  const messages = useSelector((state) => state.alert.alertsMessages)
  let all_alerts = [...alert, ...messages]

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
        transition: 'box-shadow 0.3s',
        height: width < 900 ? 'unset' : '735px',
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
            <AccordionDetails>
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
                                item?.link.includes('teams') ||
                                item?.link.includes('command')
                              ) {
                                setOpenModal({
                                  modalActive: true,
                                  inviterName: item.surname_name,
                                  command: item.command,
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
                                item?.link.includes('teams') ||
                                item?.link.includes('command')
                              ) {
                                setOpenModal({
                                  modalActive: true,
                                  inviterName: item.surname_name,
                                  command: item.command,
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
        modalTitle={`${openModal.inviterName} приглашает Вас в свою команду`}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => handleDecline(openModal.command)}
              className={styles.btn_pin_close}
            >
              Отказать
            </Button>
            <Button
              onClick={() => handleAccept(openModal.command)}
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

export default AlertCard
