import React from 'react'
import styles from './ProfilePage.module.scss'
import { useState } from 'react'
import userInfo from 'utils/userInfo'
import {
  ChangePassword,
  ChangePin,
  ChangeProfileImage,
} from 'service/AuthService'
import {
  changeImageAvatar,
  changePassword,
  changePinCode,
} from 'store/slices/UserSlice'
import { useDispatch } from 'react-redux'
import DynamicUserInfo from 'utils/DynamicUserInfo'
import Notification from 'utils/Notifications'
import { Button } from 'components'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import PinCode from 'hooks/PinCode/PinCode'
import { useNavigate } from 'react-router-dom'
import option from 'assets/icons/settings.png'
import exit from 'assets/icons/logout.png'
function ProfilePage({ userId }) {
  const [openModal, setOpenModal] = useState(false)
  const [openModalOption, setOpenModalOption] = useState(false)

  const [openModalPassword, setOpenModalPassword] = useState(false)
  const [verifyPin, setVerifyPin] = useState(false)
  const [modalText, setModalText] = useState('Введите старый ПИН')
  const [isShown, setIsShown] = useState(false)
  const [isShownImg, setIsShownImg] = useState(false)
  const [pinCode, setPinCode] = useState()

  const [file, setFile] = useState('')
  const [password, setPassword] = useState('')
  const [currentDynamicUser, getDynamic] = useState()

  const dispatch = useDispatch()

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const user = userInfo()
  const navigate = useNavigate()
  const [userPinCode] = useState(user.pin)
  const handleOpen = () => {
    setOpenModal(true)
  }
  const handleOpenPassword = () => {
    setOpenModalPassword(true)
  }

  const changePinValidation = () => {
    if (String(pinCode).length === 4 && pinCode === userPinCode) {
      setNotify({
        isOpen: true,
        message: 'ПИН подтвержден',
        type: 'success',
        sound: 'success',
      })
      setModalText('Введите новый ПИН-код')
      setVerifyPin(true)
    } else {
      setNotify({
        isOpen: true,
        message: 'Неправильный ПИН-код',
        type: 'error',
        sound: 'error',
      })
    }
  }

  const changePasswordValidation = () => {
    if (String(pinCode).length === 4 && pinCode === userPinCode) {
      setNotify({
        isOpen: true,
        message: 'ПИН подтвержден',
        type: 'success',
        sound: 'success',
      })
      setIsShown(true)
      setOpenModalPassword(false)
    } else {
      setNotify({
        isOpen: true,
        message: 'Неправильный ПИН-код',
        type: 'error',
        sound: 'error',
      })
    }
  }

  const handleClick = (event) => {
    setIsShown(false)
    setIsShownImg(false)
  }

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

  const createUserPin = async () => {
    try {
      let response = await ChangePin(pinCode)
      dispatch(
        changePinCode({
          pin: pinCode,
        }),
      )
      setNotify({
        isOpen: true,
        message: 'Пин успешно изменен',
        type: 'success',
        sound: 'success',
      })

      setTimeout(() => {
        setOpenModal(false)
      }, 1000)
      localStorage.removeItem('token')
      localStorage.removeItem('task')
      localStorage.removeItem('user')
      navigate('/')
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали новый пароль',
        type: 'error',
        sound: 'error',
      })
    } else
      try {
        let response = await ChangePassword(password)
        dispatch(
          changePassword({
            new_password: password,
          }),
        )
        setNotify({
          isOpen: true,
          message: 'Пароль успешно изменен',
          type: 'success',
          sound: 'success',
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
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

  const [isExpanded, setIsExpanded] = useState(false)

  const handleClickImg = () => {
    setIsExpanded(!isExpanded)
  }

  const handleExit = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('task')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className={styles.profile_wrapper}>
      {user.surName === 'UNET' ? (
        ''
      ) : userId === undefined ? (
        <div className={styles.profile_header}>
          <img src={option} onClick={() => setOpenModalOption(true)} alt="" />
        </div>
      ) : (
        ''
      )}
      {user.surName === 'UNET' ? (
        ''
      ) : userId === undefined ? (
        <div className={styles.profile_exit}>
          <img src={exit} onClick={handleExit} alt="" />
        </div>
      ) : (
        ''
      )}
      <div className={styles.both_side}>
        <div className={styles.left_side}>
          <div className={styles.info_heading}>
            {/* <div className={styles.profile_status}>
                <div className={styles.dot}></div>
                <p>В сети</p>
              </div> */}
            <div className={styles.avatar}>
              <div className={styles.avatar_img}>
                <img
                  src={currentDynamicUser?.imeag}
                  alt="avatar"
                  onClick={handleClickImg}
                  style={{ cursor: 'pointer' }}
                />{' '}
              </div>
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
            </div>
          </div>
        </div>
        <div className={styles.right_side}>
          <div className={styles.profile_right_info}>
            <div className={styles.info}>
              <div className={styles.avatar2}>
                <img
                  src={currentDynamicUser?.imeag}
                  alt=""
                  className={styles.image__cover}
                />
              </div>
            </div>
            <div className={styles.info}>
              <p
                style={{
                  fontSize: '16px',
                  width: '150px',
                  borderBottom: '1px solid grey',
                }}
              >
                {currentDynamicUser?.first_name} {currentDynamicUser?.surname}
              </p>
            </div>
            <div className={styles.info}>
              <span>Контактный Email</span>

              {currentDynamicUser?.email === null ? (
                <p style={{ fontSize: '14px' }}>Не указано</p>
              ) : (
                <a href="mailto:{user.email}"> {currentDynamicUser?.email} </a>
              )}
            </div>
            <div className={styles.info4}>
              <span>Номер</span>
              <p>
                {currentDynamicUser?.number_phone === null ||
                currentDynamicUser?.number_phone === ''
                  ? 'Не указано'
                  : currentDynamicUser?.number_phone}
              </p>
            </div>
            <div className={styles.info}>
              {user.user_type === 'S' ? (
                <span>Группа</span>
              ) : (
                <span>Должность</span>
              )}
              <p style={{ fontSize: '14px' }}>
                {currentDynamicUser?.position === null ||
                currentDynamicUser?.position === ''
                  ? 'Не указано'
                  : currentDynamicUser?.position}
              </p>
            </div>
            <div className={styles.info4}>
              {user.user_type === 'S' ? (
                <span>Направление</span>
              ) : (
                <span>Подразделение</span>
              )}

              <p>
                {currentDynamicUser?.division === null ||
                currentDynamicUser?.division === ''
                  ? 'Не указано'
                  : currentDynamicUser?.division}
              </p>
            </div>

            <ModalWindow
              openModal={openModalPassword}
              setOpenModal={setOpenModalPassword}
              modalText={'Введите ПИН '}
              width={'unset'}
            >
              <PinCode setPinCode={setPinCode} passwordVisible={true} />
              <Button
                onClick={() => setOpenModalPassword(false)}
                className={styles.btn_pin_close}
              >
                Закрыть
              </Button>
              <Button
                onClick={changePasswordValidation}
                className={styles.btn_pin}
              >
                Подтвердить
              </Button>
            </ModalWindow>

            <ModalWindow
              openModal={openModal}
              setOpenModal={setOpenModal}
              modalText={modalText}
            >
              {verifyPin === false ? (
                <>
                  <PinCode setPinCode={setPinCode} passwordVisible={true} />
                  <Button
                    onClick={() => setOpenModal(false)}
                    className={styles.btn_pin_close}
                  >
                    Закрыть
                  </Button>
                  <Button
                    onClick={changePinValidation}
                    className={styles.btn_pin}
                  >
                    Подтвердить
                  </Button>
                </>
              ) : (
                <>
                  <PinCode setPinCode={setPinCode} passwordVisible={false} />
                  <Button
                    onClick={() => setOpenModal(false)}
                    className={styles.btn_pin_close}
                  >
                    Закрыть
                  </Button>
                  <Button onClick={createUserPin} className={styles.btn_pin}>
                    Изменить
                  </Button>
                </>
              )}
            </ModalWindow>
          </div>
        </div>
        <DynamicUserInfo
          idEmployee={userId === undefined ? user.userId : userId}
          getDynamic={getDynamic}
        />
        <Notification notify={notify} setNotify={setNotify} />

        <ModalWindow
          openModal={openModalOption}
          setOpenModal={setOpenModalOption}
          modalTitle={'Изменение профиля'}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              onClick={() => navigate('/personalcard')}
              className={styles.btn_pin}
            >
              Личная карточка
            </Button>

            {!isShownImg && (
              <Button
                onClick={() => setIsShownImg(true)}
                className={styles.btn_pin}
              >
                Изменить фото профиля
              </Button>
            )}

            {isShownImg && (
              <div className={styles.info6}>
                {userId === undefined ? (
                  <>
                    {' '}
                    <div className={styles.download}></div>{' '}
                    <input
                      type="file"
                      className={styles.download}
                      accept="image/*"
                      onChange={onFileChange}
                      style={{ paddingTop: '7px' }}
                    />
                  </>
                ) : (
                  ''
                )}
                {file === '' ? (
                  ''
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
              </div>
            )}

            {!isShown && (
              <Button className={styles.btn_pin} onClick={handleOpenPassword}>
                Изменить пароль
              </Button>
            )}
            {isShown && (
              <div className={styles.info6}>
                <span>Введите новый пароль </span>
                <input
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.password_change}
                />
                <Button className={styles.btn2} onClick={handleSubmit}>
                  Изменить
                </Button>
              </div>
            )}
            <Button onClick={handleOpen} className={styles.btn_pin}>
              Изменить пин-код
            </Button>
          </div>

          <Button
            onClick={() => {
              handleClick()
              setOpenModalOption(false)
            }}
            className={styles.btn_pin_close_option}
          >
            Закрыть
          </Button>
        </ModalWindow>
      </div>
    </div>
  )
}

export default ProfilePage
