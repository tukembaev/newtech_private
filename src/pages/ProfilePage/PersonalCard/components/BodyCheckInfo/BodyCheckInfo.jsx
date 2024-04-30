import pencil from 'assets/icons/pencil.svg'
import deleteIcon from 'assets/icons/trash_del.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import {
    deleteBodyCheck,
    getPersonalEmployee,
    postBodyCheck
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'
import styles from './BodyCheckInfo.module.scss'

const BodyCheckInfo = () => {
  const [change, setChange] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [birth_place, setBirth_place] = useState('')
  const [passed, setPassed] = useState('')
  const [certification, setCertification] = useState('')
  const [render, setRender] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [open, setOpen] = useState({
    title: '',
  })
  let data
  const dispatch = useDispatch()
  const user = userInfo()
  const [language, setLanguage] = useState('ru')

  const getData = async () => {
    try {
      setLoading(true)
      let response = await getPersonalEmployee(data, 'ru')

      dispatch(
        setPersonalInfo({
          personal_info: response.data,
        }),
      )
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
    setRender(false)
    // getDataKy()
  }, [render])

  const info = useSelector((state) => state.personalcard.personal_info)

  const bodyCheck = info.medical_examinations

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let response = await postBodyCheck(
        {
          birth_place,
          passed,
          certification,
        },
        'ru',
      )

      setNotify({
        isOpen: true,
        message: 'Медостмотр измененен',
        type: 'success',
        sound: 'success',
      })

      setLanguage('en')

      getData()
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
  const deleteUserInfo = async (id) => {
    try {
      let response = await deleteBodyCheck(id)
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
        <div className={styles.BodyCheck}>
          <div className={styles.BodyCheckHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>Медосмотр</h4>
            </div>
            <div className={styles.headerRight}></div>
          </div>

          {bodyCheck.map((item) => (
            <ul className={styles.BodyCheck_desc}>
              <li className={styles.BodyCheck_list}>
                <h3 className={styles.BodyCheck_title}>Дата </h3>
                <p className={styles.BodyCheck_info}>{item.passed}</p>
              </li>

              <li className={styles.BodyCheck_list}>
                <h3 className={styles.BodyCheck_title}>Место прохождения</h3>
                <p className={styles.BodyCheck_info}>{item?.birth_place}</p>
              </li>

              <button className={styles.change_btn_download}>
                <a
                  target="_blank"
                  href={item?.certification}
                  style={{ color: 'white', fontSize: '14px' }} rel="noreferrer"
                >
                  Скачать документ
                </a>
              </button>
              <button
                onClick={() => deleteUserInfo(item.id)}
                className={styles.change_btn_delete}
              >
                <img src={deleteIcon} style={{ color: 'white' }} alt="" />
              </button>
            </ul>
          ))}

          <ul className={styles.BodyCheck_desc}>
            <li className={styles.BodyCheck_list}>
              <h3 className={styles.BodyCheck_title}>Место прохождения</h3>
              <input
                onChange={(e) => setBirth_place(e.target.value)}
                type="text"
                className={styles.BodyCheck_info_change_inp}
              />
            </li>

            <li className={styles.BodyCheck_list}>
              <h3 className={styles.BodyCheck_title}>Дата</h3>
              <input
                onChange={(e) => setPassed(e.target.value)}
                type="date"
                className={styles.BodyCheck_info_change_inp}
              />
            </li>

            <li className={styles.BodyCheck_list}>
              <h3 className={styles.BodyCheck_title}>Файл</h3>
              <input
                onChange={(e) => setCertification(e.target.files[0])}
                type="file"
                className={styles.BodyCheck_info_change_inp}
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
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100px',
                }}
              >
                <ScaleLoader color="grey" size={30} />
              </div>
            ) : (
              <button onClick={handleSubmit} className={styles.change_btn_save}>
                <p style={{ color: 'white' }}>Сохранить Изменения</p>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.BodyCheck}>
          <div className={styles.BodyCheckHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>Медосмотр</h4>
            </div>
            <div className={styles.headerRight}>
              <img
                src={pencil}
                onClick={() => setChange(true)}
                className={styles.headerRight_info}
              />
            </div>
          </div>
          {bodyCheck.map((item) => (
            <ul className={styles.BodyCheck_desc}>
              <li className={styles.BodyCheck_list}>
                <h3 className={styles.BodyCheck_title}>Дата </h3>
                <p className={styles.BodyCheck_info}>{item.passed}</p>
              </li>

              <li className={styles.BodyCheck_list}>
                <h3 className={styles.BodyCheck_title}>Место прохождения</h3>
                <p className={styles.BodyCheck_info}>{item?.birth_place}</p>
              </li>

              <button className={styles.change_btn_download}>
                <a
                  target="_blank"
                  href={item?.certification}
                  style={{ color: 'white', fontSize: '14px' }} rel="noreferrer"
                >
                  Скачать документ
                </a>
              </button>
            </ul>
          ))}
        </div>
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default BodyCheckInfo
