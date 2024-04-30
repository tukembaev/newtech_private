import { useState } from 'react'

import styles from './RegisterForTest.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { createNewUser } from 'service/AdminService'
import { postRegisterUser } from 'store/slices/AdminSlice'
import Notification from 'utils/Notifications'

import { getUserInfo, logintrash } from 'service/AuthService'
import { setUser } from 'store/slices/UserSlice'
import tokenDecode from 'utils/decode'
import { getCurrentDate } from 'utils/todayDateForInput'

const RegisterForTest = ({ setLoginMail }) => {
  //UserInfo
  const [gender, setGender] = useState(null)
  const [first_name, setFirst_name] = useState(null)
  const [last_name, setLast_name] = useState(null)
  const [middle_name, setMiddle_name] = useState('')
  const [data_of_birth, setData_of_birth] = useState(null)
  const [number_phone, setNumber_phone] = useState(null)
  const [email, setEmail] = useState(null)
  const [inn, setInn] = useState(null)
  const [password, setPassword] = useState(null)
  const [checkPassword, setCheckPassword] = useState(null)

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const dispatch = useDispatch()

  //Const & Let
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (
      gender === null ||
      first_name === null ||
      last_name === null ||
      data_of_birth === null ||
      number_phone === null ||
      email === null ||
      inn === null ||
      password === null
    ) {
      setNotify({
        isOpen: true,
        message: 'Заполните все поля!',
        type: 'warning',
        sound: 'warning',
      })
    } else if (inn.length < 5) {
      setNotify({
        isOpen: true,
        message: 'ИНН слишком короткий',
        type: 'warning',
        sound: 'warning',
      })
    } else if (checkPassword !== password) {
      setNotify({
        isOpen: true,
        message: 'Пароль не совпадает!',
        type: 'warning',
        sound: 'warning',
      })
    } else
      try {
        let emailtrash = 'free'
        let passwordtrash = 'free'
        let responsed = await logintrash(emailtrash, passwordtrash)
        localStorage.setItem('token', responsed.data.access)
        const userIdd = tokenDecode(responsed.data.refresh)
        let userResponsed = await getUserInfo(userIdd)
        const datas = { ...userResponsed.data, token: responsed.data.access }

        dispatch(setUser(datas))

        let response = await createNewUser(
          gender,
          first_name,
          last_name,
          middle_name,
          data_of_birth,
          number_phone,
          email,
          inn,
          password,

          // number,
          // issued_by,
          // date_of_issue,
          // date_end
        )

        dispatch(
          postRegisterUser({
            gender,
            first_name,
            last_name,
            middle_name,
            data_of_birth,
            number_phone,
            email,
            inn,
            password,

            // number,
            // issued_by,
            // date_of_issue,
            // date_end,
          }),
        )

        setNotify({
          isOpen: true,
          message: 'Пользователь успешно добавлен!, Авторизуйтесь через ИНН',
          type: 'success',
          sound: 'success',
        })
        //Добавить интервал
        setLoginMail(false)
      } catch (error) {
        console.log(error.response)

        setNotify({
          isOpen: true,
          message: 'Ошибка!',
          type: 'error',
          sound: 'error',
        })
      }
  }

  const forSelect = useSelector((state) => state.order.position)

  //Consts & Let
  const dataRector = [forSelect]

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Регистрация пользователя</div>
        <form action="#">
          <span className={styles.gender_title}>Выберите пол</span>

          <div className={styles.user_details}>
            <div className={styles.input_pox}>
              <span className={styles.datails}>Имя</span>
              <input
                type="text"
                placeholder="Имя"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_pox}>
              <span className={styles.datails}>Фамилия</span>
              <input
                type="text"
                placeholder="Фамилию"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_pox}>
              <span className={styles.datails}>Дата рождения</span>
              <input
                type="date"
                placeholder="Дату рождения"
                value={data_of_birth}
                max={getCurrentDate()}
                onChange={(e) => setData_of_birth(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_pox}>
              <span className={styles.datails}>Номер телефона</span>
              <input
                type="number"
                placeholder="Номер телефона"
                value={number_phone}
                onChange={(e) => setNumber_phone(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_pox}>
              <span className={styles.datails}>Почта</span>
              <input
                type="text"
                placeholder="Почту"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_pox}>
              <span className={styles.datails}>ИНН</span>
              <input
                type="number"
                placeholder="ИНН"
                value={inn}
                onChange={(e) => setInn(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_pox}>
              <span className={styles.datails}>Пароль</span>
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.input_pox}>
              <span className={styles.datails}>Повторить пароль</span>
              <input
                type="password"
                placeholder="Пароль"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.gender_details}>
              <div style={{ display: 'flex', paddingRight: '25px' }}>
                <input
                  style={{
                    height: '18px',
                    width: '18px',
                    background: '#d9d9d9',
                    borderRadius: '50%',
                    marginRight: '10px',
                    border: '5px solid transparent',
                  }}
                  type="radio"
                  name="gender"
                  id="dot-1"
                  value={gender}
                  onChange={(e) => setGender('Мужчина')}
                  required
                />
                <span className={styles.gender}>Мужчина</span>
              </div>
              <div style={{ display: 'flex' }}>
                <input
                  style={{
                    height: '18px',
                    width: '18px',
                    background: '#d9d9d9',
                    borderRadius: '50%',
                    marginRight: '10px',
                    border: '5px solid transparent',
                  }}
                  type="radio"
                  name="gender"
                  id="dot-2"
                  value={gender}
                  onChange={(e) => setGender('Женщина')}
                  required
                />
                <span className={styles.gender}>Женщина</span>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <button
              className={styles.go_back}
              onClick={() => setLoginMail(false)}
            >
              Вернуться
            </button>
            <input
              type="submit"
              onClick={handleSubmit}
              value="Зарегистрироваться"
            />
          </div>
        </form>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  )
}

export default RegisterForTest
