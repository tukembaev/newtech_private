import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import ShieldIcon from '@mui/icons-material/Shield'
import { Button } from 'components'
import ChangeBackground from 'components/ChangeBackground/ChangeBackground'
import BackgroundModal from 'hooks/BackgroundModal/BackgroundModal'
import { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ChangeProfileImage } from 'service/AuthService'
import { changeImageAvatar } from 'store/slices/UserSlice'
import DynamicUserInfo from 'utils/DynamicUserInfo'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'
import styles from './PersonalMenu.module.scss'
import PersonalInfo from './components/PersonalInfo'

function PersonalMenuCard({ userId, setBackground }) {
  const [openModal, setOpenModal] = useState(false)
  const [openBackground, setOpenBackground] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const [isShownImg, setIsShownImg] = useState(false)
  const [file, setFile] = useState('')
  const [currentDynamicUser, getDynamic] = useState()
  const [EfficiencyColor, setEfficiencyColor] = useState('grey')
  const dispatch = useDispatch()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const user = userInfo()

  const navigate = useNavigate()
  const [userPinCode] = useState(user?.pin)

  const [phone, setPhone] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [newPin, setNewPin] = useState(false)

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const ChangeImage = async ({ file }) => {
    let response = await ChangeProfileImage(file)

    dispatch(changeImageAvatar(response.data))
    setNotify({
      isOpen: true,
      message: 'Фотография успешно обновлена',
      type: 'success',
      sound: 'success',
    })
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const handleClickImg = () => {
    setIsExpanded(!isExpanded)
  }

  const handleExit = () => {
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

  const dataOrders = [
    { title: 'Завершенные', value: 70, color: '#FFB03A' },
    {
      title: 'В процессе выполнения',
      value: user.efficiency,
      color: '#18AF55',
    },
  ]

  useEffect(() => {
    if (dataOrders[1].value <= 40) {
      setEfficiencyColor('red')
    } else if (dataOrders[1].value <= 80) {
      setEfficiencyColor('#FFB03A')
    } else if (dataOrders[1].value > 80) {
      setEfficiencyColor('#18AF55')
    }
  }, [dataOrders[1].value])

  var currentURL = window.location.pathname
  var regex = /^\/$/
  // background
  const backgroundImage = localStorage.getItem('background')
  setBackground(backgroundImage)

  // console.log(currentDynamicUser?.imeag);
  let numberPhone = 0
  // {currentDynamicUser?.number_phone === null ||
  //   currentDynamicUser?.number_phone === ""
  //     ? numberPhone = "Не указано"
  //     : numberPhone = currentDynamicUser?.number_phone}
  if (
    currentDynamicUser?.number_phone === null ||
    currentDynamicUser?.number_phone === ''
  ) {
    numberPhone = 'Не указано'
  } else {
    numberPhone = currentDynamicUser?.number_phone
  }

  return (
    <>
      {isExpanded && (
        <div className={styles.avatar_img2} onClick={handleClickImg}>
          <img
            src={currentDynamicUser?.imeag}
            alt="Expanded Avatar"
            style={{
              cursor: 'pointer',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              maxWidth: '380px',
              maxHeight: '380px',
            }}
          />
        </div>
      )}

      <div className={styles.profile_wrapper}>
        <div className={styles.personal_info}>
          <div className={styles.user_avatar}>
            <img
              src={currentDynamicUser?.imeag}
              alt="avatar"
              onClick={handleClickImg}
              style={{ cursor: 'pointer' }}
              className={styles.user_avatar_img}
            />{' '}
          </div>
          <div className={styles.user_name}>
            <span>
              {user?.firstName} {user?.surName}
            </span>
            <br />
            <span style={{ color: '#525C69B3', fontSize: '13px' }}>
              {user?.position}
            </span>
            <br />
          </div>

          <div className={styles.user_online}>online</div>
        </div>

        <div className={styles.wallpaper_block}>
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
            }}
            className={styles.change_wallpaper}
          >
            <span style={{ color: 'white' }}>Тема оформления</span>
            <button
              className={styles.btn_change}
              onClick={() => setOpenBackground(true)}
            >
              Изменить
            </button>
          </div>
          {!isShownImg && (
            <div id={styles.foto_profile} className={styles.change_wallpaper}>
              <span>Фото профиля</span>
              {userId === undefined ? (
                <>
                  {' '}
                  <div className={styles.download}></div>{' '}
                  {file === '' ? (
                    <label htmlFor="fileInput" className={styles.btn_change}>
                      Изменить
                    </label>
                  ) : (
                    <Button
                      className={styles.btn2}
                      onClick={() => {
                        ChangeImage({ file })
                      }}
                    >
                      {' '}
                      Обновить
                    </Button>
                  )}
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={onFileChange}
                  />
                </>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
        <div
          style={{ border: `0.5px solid ${EfficiencyColor}` }}
          className={styles.Efficiency}
        >
          <div className={styles.single_pie}>
            <div className={styles.pie_size}>
              <PieChart
                animate
                animationDuration={1000}
                animationEasing="ease-in"
                center={[40, 40]}
                data={dataOrders}
                lengthAngle={360}
                lineWidth={21}
                paddingAngle={0}
                radius={25}
                startAngle={0}
                label={null}
                labelPosition={80}
                labelStyle={{
                  fontSize: '12px',
                  fontColor: 'FFFFFA',
                  fontWeight: '800',
                }}
                style={{
                  width: '50px',
                  heigth: '50px',
                  marginTop: "5px",
                  marginLeft: '10px',
                }}
              />
            </div>
            <span>{user.efficiency}%</span>
          </div>
          <div>
            {' '}
            <span>Эффективность</span>
          </div>
        </div>
        <div>
          <PersonalInfo
            icons={
              <PhoneIphoneIcon sx={{ fontSize: '14px', marginRight: '10px' }} />
            }
            phone={phone}
            setPhone={setPhone}
            title={numberPhone ? numberPhone : 'Не указано'}
            setNotify={setNotify}
            button={setPhone}
          />
        </div>

        <div>
          <PersonalInfo
            icons={
              <AlternateEmailIcon
                sx={{ fontSize: '14px', marginRight: '10px' }}
              />
            }
            title={user?.email ? user?.email : 'Не указано'}
          />
        </div>
        <div>
          <PersonalInfo
            icons={
              <ShieldIcon sx={{ fontSize: '14px', marginRight: '10px' }} />
            }
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            title={'Безопастность'}
            setNotify={setNotify}
            button={setNewPassword}
          />
        </div>
        <div>
          <PersonalInfo
            icons={
              <LockOpenIcon sx={{ fontSize: '14px', marginRight: '10px' }} />
            }
            newPin={newPin}
            setNewPin={setNewPin}
            title={'Двухэтапная аутентификация '}
            setNotify={setNotify}
            button={setNewPin}
            btnId="id"
          />
        </div>
        <div
          className={styles.footer_card_btns}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {regex.test(currentURL) ? (
            <div
              style={{ width: '50%' }}
              onClick={() => navigate(`/alerts/${user.userId}`)}
            >
              <PersonalInfo
                icons={
                  <PersonIcon sx={{ fontSize: '18px', marginRight: '10px' }} />
                }
                title={'В систему'}
              />
            </div>
          ) : (
            <div onClick={() => navigate('/personalcard')}>
              <PersonalInfo
                icons={
                  <PersonIcon sx={{ fontSize: '18px', marginRight: '10px' }} />
                }
                title={'Личная карточка'}
              />
            </div>
          )}

          <div onClick={handleExit} className={styles.logout}>
            <MeetingRoomOutlinedIcon sx={{ color: 'gray' }} />
            <span>Выйти</span>
          </div>
        </div>
        <DynamicUserInfo
          idEmployee={userId === undefined ? user?.userId : userId}
          getDynamic={getDynamic}
        />
      </div>
      <BackgroundModal
        openModal={openBackground}
        setOpenModal={setOpenBackground}
      >
        <ChangeBackground setOpenModal={setOpenBackground} />
      </BackgroundModal>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  )
}

export default PersonalMenuCard
