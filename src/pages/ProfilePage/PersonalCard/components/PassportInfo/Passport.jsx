import pencil from 'assets/icons/pencil.svg'
import { useEffect, useState } from 'react'
import {
    getPersonalEmployee,
    patchPersonalEmployee,
} from 'service/PersonalCardService'
import Notification from 'utils/Notifications'
import styles from '../LocationInfo/LocationInfo.module.scss'
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from 'react-redux'
import { setPersonalInfo } from 'store/slices/PersonalCard'

const Passport = ({ data }) => {
  const info = useSelector((state) => state.personalcard.personal_info)
  const [change, setChange] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [surname, setCountry] = useState(info?.surname || '')
  const [last_name, setRegion] = useState(info?.last_name || '')
  const [first_name, setVillage] = useState(info?.first_name || '')
  const [citizenship, setCity] = useState(info?.citizenship || '')

  const [english, setEnglish] = useState('')
  const [surnameEn, setSurNameEn] = useState('')
  const [last_nameEn, setLastNameEn] = useState('')
  const [first_nameEn, setFirstNameEn] = useState('')
  const [citizenshipEn, setCityEn] = useState('')

  const [kyrgyz, setKyrgyz] = useState('')
  const [surnameKy, setSurNameKy] = useState('')
  const [last_nameKy, setLastNameKy] = useState('')
  const [first_nameKy, setFirstNameKy] = useState('')
  const [citizKyshipKy, setCityKy] = useState('')

  const [render, setRender] = useState(false)
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      let response = await getPersonalEmployee(data, 'ru')

      dispatch(
        setPersonalInfo({
          personal_info: response.data,
        }),
      )
    } catch (error) {}
  }

  useEffect(() => {
    getData()
    setRender(false)
  }, [render])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let response = await patchPersonalEmployee(
        {
          surname,
          last_name,
          first_name,
          citizenship,
        },
        'ru',
      )

      setNotify({
        isOpen: true,
        message: 'Личные данные сс',
        type: 'success',
        sound: 'success',
      })

      if (english) {
        let responseEn = await patchPersonalEmployee(
          {
            surname: surnameEn,
            last_name: last_nameEn,
            first_name: first_nameEn,
            citizenship: citizenshipEn,
          },
          'en',
        )

        let responseKy = await patchPersonalEmployee(
          {
            surname: surnameKy,
            last_name: last_nameKy,
            first_name: first_nameKy,
            citizenship: citizKyshipKy,
          },
          'ky',
        )
      }
      setNotify({
        isOpen: true,
        message: 'Личные данные установлены',
        type: 'success',
        sound: 'success',
      })

      setRender(true)
      setChange(false)
    } catch (error) {
      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error',
        sound: 'error',
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div style={{ width: '100%', height: '100%' }}>
        {change ? (
          <div className={styles.Location_true}>
            <div className={styles.LocationHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Персональные данные</h4>
              </div>
              <div className={styles.headerRight}></div>
            </div>

            <ul className={styles.Location_desc}>
              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Имя</p>
                <p className={styles.Location_info}>{info?.first_name}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Фамилия</p>
                <p className={styles.Location_info}>{info?.surname}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Отчество</p>
                <p className={styles.Location_info}>{info?.last_name}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Национальность</p>
                <p className={styles.Location_info}>{info?.citizenship}</p>
              </li>
            </ul>

            <div className={styles.Location_change_block}>
              <ul className={styles.Location_desc_true}>
                {/* <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Имя</h3>
                  <input
                    type="text"
                    value={first_name}
                    className={styles.Location_info_change_inp}
                    onChange={(e) =>   setVillage(e.target.value) }
                  />
                </li>

                <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Фамилия</h3>
                  <input
                    value={surname}
                    type="text"
                    className={styles.Location_info_change_inp}
                    onChange={(e) => setCountry(e.target.value)}

                  />
                </li> */}

                <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Отчество</h3>
                  <input
                    value={last_name}
                    type="text"
                    className={styles.Location_info_change_inp}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </li>

                <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Национальность</h3>

                  <input
                    value={citizenship}
                    type="text"
                    className={styles.Location_info_change_inp}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </li>
                <button
                  onClick={() => setEnglish(true)}
                  className={styles.change_btn_Cancel}
                >
                  <p>Добавить данные на английском</p>
                </button>
              </ul>

              {english ? (
                <ul className={styles.Location_desc_true}>
                  <li className={styles.Location_list_true}>
                    <h3 className={styles.Location_title}>Name</h3>
                    <input
                      type="text"
                      className={styles.Location_info_change_inp}
                      onChange={(e) => setFirstNameEn(e.target.value)}
                    />
                  </li>

                  <li className={styles.Location_list_true}>
                    <h3 className={styles.Location_title}>Surname</h3>
                    <input
                      type="text"
                      className={styles.Location_info_change_inp}
                      onChange={(e) => setSurNameEn(e.target.value)}
                    />
                  </li>

                  <li className={styles.Location_list_true}>
                    <h3 className={styles.Location_title}>Patronymic</h3>
                    <input
                      type="text"
                      className={styles.Location_info_change_inp}
                      onChange={(e) => setLastNameEn(e.target.value)}
                    />
                  </li>

                  <li className={styles.Location_list_true}>
                    <h3 className={styles.Location_title}>nationality</h3>

                    <input
                      type="text"
                      className={styles.Location_info_change_inp}
                      onChange={(e) => setCityEn(e.target.value)}
                    />
                  </li>
                  <button
                    onClick={() => setEnglish(true)}
                    className={styles.change_btn_Cancel}
                  >
                    <p onClick={() => setKyrgyz(true)}>
                      Добавить данные на кыргызском языке
                    </p>
                  </button>
                </ul>
              ) : null}

              {kyrgyz ? (
                <ul className={styles.Location_desc_true}>
                  <li className={styles.Location_list_true}>
                    <h3 className={styles.Location_title}>Аты</h3>
                    <input
                      type="text"
                      className={styles.Location_info_change_inp}
                      onChange={(e) => setFirstNameKy(e.target.value)}
                    />
                  </li>

                  <li className={styles.Location_list_true}>
                    <h3 className={styles.Location_title}>Фамилиясы</h3>
                    <input
                      type="text"
                      className={styles.Location_info_change_inp}
                      onChange={(e) => setSurNameKy(e.target.value)}
                    />
                  </li>

                  <li className={styles.Location_list_true}>
                    <h3 className={styles.Location_title}>Атасынын аты</h3>
                    <input
                      type="text"
                      className={styles.Location_info_change_inp}
                      onChange={(e) => setLastNameKy(e.target.value)}
                    />
                  </li>

                  <li className={styles.Location_list_true}>
                    <h3 className={styles.Location_title}>Улуту</h3>

                    <input
                      type="text"
                      className={styles.Location_info_change_inp}
                      onChange={(e) => setCityKy(e.target.value)}
                    />
                  </li>
                </ul>
              ) : null}

              <div className={styles.change_btn}>
                <button
                  onClick={() => setChange(false)}
                  className={styles.change_btn_Cancel}
                >
                  <p>Отмена</p>
                </button>
                <button
                  onClick={handleSubmit}
                  className={styles.change_btn_save}
                >
                  <p style={{ color: 'white' }}>Сохранить Изменения</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.Location}>
            <div className={styles.LocationHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Персональные данные</h4>
              </div>
              <div className={styles.headerRight}>
                <img
                  src={pencil}
                  onClick={() => setChange(true)}
                  className={styles.headerRight_info}
                />
              </div>
            </div>

            <ul className={styles.Location_desc}>
              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Имя</p>
                <p className={styles.Location_info}>{info?.first_name}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Фамилия</p>
                <p className={styles.Location_info}>{info?.surname}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Отчество</p>
                <p className={styles.Location_info}>{info?.last_name}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Национальность</p>
                <p className={styles.Location_info}>{info?.citizenship}</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default Passport
