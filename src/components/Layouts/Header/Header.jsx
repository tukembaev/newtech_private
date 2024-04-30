import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import unetLogo from 'assets/img/UNET.png'
import { Button } from 'components'
import SlidingPaneTariffInfo from 'components/TariffPlan/SlidingPaneTariffInfo/SlidingPaneTariffInfo'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import AlertPopOver from 'pages/MainPage/components/AlertCard/AlertPopOver'
import PersonalMenuCard from 'pages/ProfilePage/PersonalMenu/PersonalMenuCard'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { getTariffSubscription } from 'service/TariffService'
import { setMyTariff } from 'store/slices/TariffSlice'
import useSWR from 'swr'
import DynamicAvatar from 'utils/DynamicAvatar'
import MessageNotification from 'utils/MessageNotification'
import SlidingPaneUtil from 'utils/SlidingPaneUtil'
import userInfo from 'utils/userInfo'

import MenuDrawerMobile from '../Sidebar/components/Menu/MenuDrawerMobile'
import styles from './Header.module.scss'

function Header({ width, setBackgroundImage }) {
  const [currentDynamicAvatar, getDynamicAvatar] = useState()
  const navigate = useNavigate()
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const initialMuteStatus = localStorage.getItem('mute') === 'true'
  const [muteStatus, setMuteStatus] = useState(initialMuteStatus)
  const handleSwitchMute = () => {
    const newMuteStatus = !muteStatus
    setMuteStatus(newMuteStatus)
    localStorage.setItem('mute', newMuteStatus.toString())
  }
  const user = userInfo()

  function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications'
    }
    if (count > 99) {
      return 'more than 99 notifications'
    }
    return `${count} notifications`
  }
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.alert.alerts)
  const messages = useSelector((state) => state.alert.alertsMessages)
  const {
    data: response,
    error,
    isValidating: isLoading,
  } = useSWR('/subscription/', getTariffSubscription)

  if (response) {
    dispatch(
      setMyTariff({
        myTariff: response.data,
      }),
    )
  } else if (error) {
    console.log(console.log(error.data))
  }

  const myTariffInfo = useSelector((state) => state.tariff.myTariff)
  const storedData = localStorage.getItem('subscription_title')
  const logInSubTitle = JSON.parse(storedData)

  let all_alerts = [...alert, ...messages]
  useEffect(() => {
    all_alerts = [...alert, ...messages]
  }, [alert, messages])
  useEffect(() => {
    if (
      myTariffInfo?.subscription?.[0]?.tariff?.title !== undefined &&
      myTariffInfo?.subscription?.[0]?.tariff?.title !== logInSubTitle
    ) {
      localStorage.removeItem('token')
      localStorage.removeItem('task')
      localStorage.removeItem('user')
      localStorage.removeItem('subscription_title')
      localStorage.removeItem('background')
      localStorage.removeItem('subscription')

      const socket = new WebSocket('wss://tm.unet.kg/ws/online_status/')

      socket.onopen = () => {
        socket.send(
          JSON.stringify({ command: 'disconnect', user_id: user?.userId }),
        )
        socket.close()
      }
      navigate('/')
    }
  }, [myTariffInfo?.subscription?.[0]?.tariff?.title])
  return (
    <>
      <div className={styles.header__wrapper}>
        {width >= 1000 ? (
          <div className={styles.logo__wrapper}>
            <img
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
              src={unetLogo}
              alt=""
            />
          </div>
        ) : (
          <MenuDrawerMobile width={width} />
        )}
        <p className={styles.date_interval}>
          <Moment format="HH:mm" interval={1000} />
        </p>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <ScaleLoader color="white" size={10} />
          </div>
        ) : myTariffInfo?.subscription?.[0]?.tariff?.title === 'Базовый' ? (
          <span
            className={styles.tariff_btn}
            onClick={() => setState({ isPaneOpen: true })}
            style={{ backgroundColor: 'rgba(109, 106, 106, 0.44)' }}
          >
            Базовый
          </span>
        ) : myTariffInfo?.subscription?.[0]?.tariff?.title === 'Стандарт' ? (
          <span
            className={styles.tariff_btn}
            onClick={() => setState({ isPaneOpen: true })}
            style={{ background: 'green' }}
          >
            Стандарт
          </span>
        ) : myTariffInfo?.subscription?.[0]?.tariff?.title === 'Продвинутый' ? (
          <span
            className={styles.tariff_btn}
            onClick={() => setState({ isPaneOpen: true })}
            style={{
              background:
                'linear-gradient(181deg, #0352B0 -10.79%, rgba(6, 204, 231, 0.41) 163.57%)',
            }}
          >
            Продвинутый
          </span>
        ) : myTariffInfo?.subscription?.[0]?.tariff?.title ===
          'Индивидуальный' ? (
            <span
            className={styles.tariff_btn}
            onClick={() => setState({ isPaneOpen: true })}
            style={{ background: 'red' }}
          >
              {' '}
              Индивидуальный{' '}
            </span>
        ) : (
          <span
            className={styles.tariff_btn}
            onClick={() => setState({ isPaneOpen: true })}
            style={{
              background:
                'linear-gradient(181deg, #E9820A -19.07%, rgba(231, 141, 6, 0.41) 162.38%)',
              color: 'black',
            }}
          >
            Pro
          </span>
        )}

        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState2) => (
            <>
              {width > 1080 ? (
                <div className={styles.alerts}>
                  <IconButton
                    aria-label={notificationsLabel(100)}
                    {...bindTrigger(popupState2)}
                  >
                    <Badge
                      badgeContent={all_alerts.length}
                      color="primary"
                      style={{ zIndex: '0' }}
                    >
                      <NotificationsActiveIcon className={styles.alert} />
                    </Badge>
                  </IconButton>
                </div>
              ) : (
                ''
              )}

              <Popover
                {...bindPopover(popupState2)}
                style={{
                  backgroundColor: '95%',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <AlertPopOver />
              </Popover>
            </>
          )}
        </PopupState>
        <IconButton>
          {muteStatus ? (
            <VolumeOffIcon
              onClick={handleSwitchMute}
              className={styles.alert}
            />
          ) : (
            <VolumeUpIcon onClick={handleSwitchMute} className={styles.alert} />
          )}
        </IconButton>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <>
              <div className={styles.user__wrapper}>
                <div className={styles.avatar2} {...bindTrigger(popupState)}>
                  <img
                    src={currentDynamicAvatar?.imeag}
                    alt=""
                    className={styles.image__cover}
                  />
                </div>
              </div>

              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {/* <ProfilePage /> */}
                <PersonalMenuCard setBackground={setBackgroundImage} />
              </Popover>
            </>
          )}
        </PopupState>
      </div>
      {width > 600 ? (
        <SlidingPaneUtil
          size="70%"
          title="Ваш тариф"
          state={state}
          setState={setState}
          isWhite={true}
        >
          <SlidingPaneTariffInfo />
          {/* <AddResources setState={setState} setNotify={setNotify} />{" "} */}
        </SlidingPaneUtil>
      ) : (
        <SlidingPaneUtil
          size="100%"
          title="Ваш тариф"
          state={state}
          setState={setState}
          isWhite={true}
        >
          <SlidingPaneTariffInfo />
          {/* <AddResources setState={setState} setNotify={setNotify} />{" "} */}
        </SlidingPaneUtil>
      )}
      <MessageNotification notify={notify} setNotify={setNotify} />
      <DynamicAvatar getDynamic={getDynamicAvatar} />
    </>
  )
}

export default Header
