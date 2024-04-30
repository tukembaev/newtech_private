import { useEffect, useState } from 'react'
import styles from './ArrivalInfo.module.scss'

import pencil from 'assets/icons/pencil.svg'
import deleteIcon from 'assets/icons/trash_del.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteArrivals,
    getPersonalEmployee,
    patchPersonalEmployee,
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'
const ArrivalInfo = () => {
  const [change, setChange] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [purpose, setPurpose] = useState('')
  const [country, setCoutry] = useState('')
  const [started, setStarted] = useState('')
  const [ended, setEnded] = useState('')

  let data
  const dispatch = useDispatch()
  const [render, setRender] = useState(false)

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
      let response = await patchPersonalEmployee({
        abroad_stays: [
          {
            purpose,
            country,
            started,
            ended,
          },
        ],
      })

      setNotify({
        isOpen: true,
        message: 'Награды изменены',
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
  const info = useSelector((state) => state.personalcard.personal_info)

  const deleteUserInfo = async (id) => {
    try {
      let response = await deleteArrivals(id)
      setNotify({
        isOpen: true,
        message: 'Успешно удалено',
        type: 'success',
        sound: 'success',
      })

      setRender(true)
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
    <div>
      {change ? (
        <div className={styles.Arriv}>
          <div className={styles.ArrivHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>
                Прибывание за границей
              </h4>
            </div>
            <div className={styles.headerRight}></div>
          </div>
          <ul className={styles.Arriv_desc}>
            <li className={styles.Arriv_list}>
              <h3 className={styles.Arriv_title}>Цель прибытия</h3>
              <input
                onChange={(e) => setPurpose(e.target.value)}
                type="text"
                className={styles.Arriv_info_change_inp}
              />
            </li>

            <li className={styles.Arriv_list}>
              <h3 className={styles.Arriv_title}>В какой стране</h3>
              <input
                onChange={(e) => setCoutry(e.target.value)}
                type="text"
                className={styles.Arriv_info_change_inp}
              />
            </li>
            <li className={styles.Arriv_list}>
              <h3 className={styles.Arriv_title}>Начало</h3>
              <input
                onChange={(e) => setStarted(e.target.value)}
                type="date"
                className={styles.Arriv_info_change_inp}
              />
            </li>
            <li className={styles.Arriv_list}>
              <h3 className={styles.Arriv_title}>Конец</h3>
              <input
                onChange={(e) => setEnded(e.target.value)}
                type="date"
                className={styles.Arriv_info_change_inp}
              />
            </li>
          </ul>

          <div className={styles.change_btn}>
            <button
              onClick={() => setChange(false)}
              className={styles.change_btn_Cancel}
            >
              <p>Отмена</p>
            </button>
            <button onClick={handleSubmit} className={styles.change_btn_save}>
              <p style={{ color: 'white' }}>Сохранить Изменения</p>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.Arriv}>
          <div className={styles.ArrivHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>
                Прибывание за границей
              </h4>
            </div>
            <div className={styles.headerRight}>
              <img
                src={pencil}
                onClick={() => setChange(true)}
                className={styles.headerRight_info}
              />
            </div>
          </div>

          {info?.abroad_stays?.map((item) => (
            <ul className={styles.Arriv_desc}>
              <li className={styles.Arriv_list}>
                <h3 className={styles.Arriv_title}>Цель прибытия</h3>
                <p className={styles.Arriv_info}>{item?.purpose}</p>
              </li>

              <li className={styles.Arriv_list}>
                <h3 className={styles.Arriv_title}>В какой стране</h3>
                <p className={styles.Arriv_info}>{item?.country}</p>
              </li>
              <li className={styles.Arriv_list}>
                <h3 className={styles.Arriv_title}>Начало</h3>
                <p className={styles.Arriv_info}>{item?.started}</p>
              </li>
              <li className={styles.Arriv_list}>
                <h3 className={styles.Arriv_title}>Конец</h3>
                <p className={styles.Arriv_info}>{item?.ended}</p>
              </li>
              <button
                onClick={() => deleteUserInfo(item.id)}
                className={styles.change_btn_delete}
              >
                <img src={deleteIcon} style={{ color: 'white' }} alt="" />
              </button>
            </ul>
          ))}
        </div>
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default ArrivalInfo
