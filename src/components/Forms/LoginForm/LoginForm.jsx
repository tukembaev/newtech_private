import googleIcon from 'assets/icons/google-icon.svg'
import help from 'assets/icons/help.svg'
import { gapi } from 'gapi-script'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import PinCode from 'hooks/PinCode/PinCode'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  ChangePin,
  SendDevice,
  getEmailDatacor,
  getUserInfo,
  login,
  logintrash,
  postToMail,
} from 'service/AuthService'
import { getImage } from 'service/BackgroundService'
import { getTariffSubscription } from 'service/TariffService'
import {
  changePinCode,
  postMail,
  setUser,
} from 'store/slices/UserSlice'
import Notification from 'utils/Notifications'
import tokenDecode from 'utils/decode'

import rostok from 'assets/icons/rostok.png'
import { Button } from 'components'
import RegisterForTest from '../RegisterForm/RegisterForTest'
import styles from './LoginForm.module.scss'
function LoginForm() {
  //UseState
  const [loginMail, setLoginMail] = useState(false)
  const [password, setPassword] = useState('')
  const [userPinCode, setUserPinCode] = useState()
  const [pinCode, setPinCode] = useState()
  const [userId, setUserId] = useState()
  const [email, setEmail] = useState('')
  const [emailCor, setEmailCor] = useState('')
  const [device, setDevice] = useState('')
  //TEST GOOGLE

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    setDevice(userAgent)
  }, [])

  //Dispatch & Navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let data
  //МОДАЛКА
  const [openModal, setOpenModal] = useState(false)

  let socket = null

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    } else {
      console.log(socket)
      // Handle the case when the socket is not open
    }
  }

  //Notifications
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  //UseSelector
  const user = useSelector((state) => state.user)

  const { loading, withLoading } = useLoading(false)
  //Functions
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (email === '') {
      setNotify({
        isOpen: true,
        message: 'Введите ИНН!',
        type: 'warning',
        sound: 'warning',
      })
    } else if (password === '') {
      setNotify({
        isOpen: true,
        message: 'Введите пароль!',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      try {
        await withLoading(async () => {
          let response = await login(email, password)
          localStorage.setItem('token', response.data.access)
          const userId = tokenDecode(response.data.refresh)

          let userResponse = await getUserInfo(userId)
          const data = { ...userResponse.data, token: response.data.access }

          let response4 = await getTariffSubscription(data)

          localStorage.setItem(
            'subscription',
            JSON.stringify(response4.data.subscription[0].tariff.features[0]),
          )
          localStorage.setItem(
            'subscription_title',
            JSON.stringify(response4.data.subscription[0].tariff.title),
          )
          let response3 = await getImage(data)
          localStorage.setItem('background', response3.data?.file)
          let response2 = await SendDevice(device)

          setUserId(data.user)
          sendMessage({ user_id: userId })
          setUserPinCode(data.pin)
          dispatch(setUser(data))
          setOpenModal(true)
        })
      } catch (error) {
        setNotify({
          isOpen: true,
          message:
            error.response.data.detail ||
            `Пароль ${error.response.data.password}`,
          type: 'error',
          sound: 'error',
        })
      }
    }
  }

  const signIn = async (event) => {
    event.preventDefault()
    const _auth0k = (googleUser) => {
      const emails = googleUser.getBasicProfile().getEmail()
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {})

      async function f() {
        try {
          let emailtrash = 'free'
          let passwordtrash = 'free'
          let responsed = await logintrash(emailtrash, passwordtrash)
          localStorage.setItem('token', responsed.data.access)
          const userIdd = tokenDecode(responsed.data.refresh)
          let userResponsed = await getUserInfo(userIdd)
          const datas = { ...userResponsed.data, token: responsed.data.access }
          setUserId(datas.user)
          setUserPinCode(datas.pin)
          dispatch(setUser(datas))
          try {
            let responses = await getEmailDatacor(emails)

            emailtrash = responses.data.username
            passwordtrash = responses.data.password
          } catch (error) {
            setNotify({
              isOpen: true,
              message:
                error.response.data.detail ||
                `Пароль ${error.response.data.password}`,
              type: 'error',
              sound: 'error',
            })
            emailtrash = 'lol'
            passwordtrash = 'lol'
          }
          localStorage.removeItem('token')
          localStorage.removeItem('task')
          localStorage.removeItem('user')
          let response = await logintrash(emailtrash, passwordtrash)
          localStorage.setItem('token', response.data.access)
          const userId = tokenDecode(response.data.refresh)
          let userResponse = await getUserInfo(userId)
          const data = { ...userResponse.data, token: response.data.access }
          setUserId(data.user)
          setUserPinCode(data.pin)
          dispatch(setUser(data))
          setOpenModal(true)

          // navigate(`/alerts/${userId}`);
        } catch (error) {
          setNotify({
            isOpen: true,
            message:
              error.response.data.detail ||
              `Пароль ${error.response.data.password}`,
            type: 'error',
            sound: 'error',
          })
        }
      }
      f()
    }

    const _authErr = () => {
      setNotify({
        isOpen: true,
        message: 'Ошибка авторизации',
        type: 'error',
        sound: 'error',
      })
    }
    const GOOGLE_AUTH = gapi.auth2.getAuthInstance()
    GOOGLE_AUTH.signIn({
      scope: 'profile email',
    }).then(_auth0k, _authErr)
  }
  // useEffect(() => {
  //   function start() {
  //     gapi.auth2
  //       .init({
  //         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //       })
  //       .then(() => console.log("sgp-onoxo.ru"));
  //   }
  //   gapi.load("client:auth2", start);
  // });

  const pinLogIn = () => {
    localStorage.setItem('mute', false)
    if (String(pinCode).length === 4 && pinCode === userPinCode) {
      setNotify({
        isOpen: true,
        message: 'Добро пожаловать!',
        type: 'success',
      })

      const socket = new WebSocket('wss://tm.unet.kg/ws/online_status/')

      socket.onopen = () => {
        socket.send(JSON.stringify({ command: 'connect', user_id: userId }))
        socket.close()
      }

      setTimeout(() => {
        window.location.href = `/alerts/${userId}`
      }, 1000)
    } else {
      setNotify({
        isOpen: true,
        message: 'Неправильный Пин-Код',
        type: 'error',
        sound: 'error',
      })
    }
  }

  const createUserPin = async () => {
    try {
      let response = await ChangePin(pinCode)
      dispatch(
        changePinCode({
          pin: pinCode,
        }),
      )
      setTimeout(() => {
        setNotify({
          isOpen: true,
          message: 'Пин успешно изменен',
          type: 'success',
          sound: 'success',
        })
      }, 1000)

      setNotify({
        isOpen: true,
        message: 'Добро пожаловать!',
        type: 'success',
        sound: 'success',
      })
      setTimeout(() => {
        navigate(`/alerts/${userId}`)
      }, 1000)
    } catch (error) {
      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error',
        sound: 'error',
      })
    }
  }

  const handleSubmitByMail = async (event) => {
    event.preventDefault()

    let response = await postToMail(emailCor)
    dispatch(
      postMail({
        email: emailCor,
      }),
    )

    setNotify({
      isOpen: true,
      message: 'Сообщение на почту успешно отправлено!',
      type: 'success',
      sound: 'success',
    })
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <div>
      {loginMail === false ? (
        <div>
          <h2 className={styles.login__title}>Вход</h2>
          <label className={styles.login__title__label} htmlFor="login">
            ИНН
          </label>
          <input
            id="login"
            name="username"
            value={email}
            required="required"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.login__input}
          />
          <div>
            <label className={styles.login__title__label} htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              required="required"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.login__input}
            />
          </div>
          <div className={styles.button__wrapper}>
            <ButtonLoader loading={loading} position={'center'}>
              {' '}
              <Button
                onClick={handleSubmit}
                className="auth__btn"
                style={{ margin: '15px 0 20px 0' }}
              >
                Войти
              </Button>
            </ButtonLoader>

            <Button
              className={styles.register_button}
              onClick={() => setLoginMail(true)}
              style={{ margin: '0px 0 20px 0' }}
            >
              Зарегистрироваться
              <img src={rostok} className={styles.size} alt="" />
            </Button>

            <Button
              className={styles.sign__google__btns}
              href="http://task.unet.kg/media/media/task_docs/UNET_user_guide.pdf"
            >
              Руководство пользователя{' '}
              <img src={help} className={styles.size} alt="" />
            </Button>
          </div>
          <div className={styles.helper__title}>или</div>
          <div className={styles.div_social}>
            <Button className={styles.sign__google__btns} onClick={signIn}>
              Вход <img src={googleIcon} alt="" />
            </Button>

            {/* <Button
            className={styles.sign__google__btns}
            onClick={signIn}
          >
            KSTU
            <img className={styles.sign__kstu__btn} src="https://data.kstu.kg/static/lee/kstu.png" alt="" />
          </Button> */}
          </div>
          <button
            className={styles.sign__google__btns}
            onClick={() => navigate('/')}
            style={{ marginTop: '15px', padding: '10px', cursor: 'pointer' }}
          >
            Вернуться на главную
          </button>
          <Notification notify={notify} setNotify={setNotify} />
        </div>
      ) : (
        <div style={{ maxWidth: '470px' }}>
          <RegisterForTest setLoginMail={setLoginMail} />
        </div>
      )}
      {userPinCode === null ? (
        <>
          <ModalWindow
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalTitle={
              <>
                <p>
                  Добро пожаловать в <br /> University Network!
                </p>
              </>
            }
            modalText={'Придумайте ПИН-код'}
            width={'unset'}
          >
            <PinCode setPinCode={setPinCode} passwordVisible={false} />
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>
            <Button
              style={{ width: 'unset' }}
              onClick={createUserPin}
              className={styles.btn_pin}
            >
              Сохранить
            </Button>
          </ModalWindow>{' '}
        </>
      ) : (
        <ModalWindow
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalText={'Введите ПИН-код'}
          width={'unset'}
        >
          <>
            <PinCode setPinCode={setPinCode} passwordVisible={true} />
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
            >
              {' '}
              Закрыть
            </Button>
            <Button onClick={pinLogIn} className={styles.btn_pin}>
              Войти
            </Button>
          </>
        </ModalWindow>
      )}
    </div>
  )
}

export default LoginForm
