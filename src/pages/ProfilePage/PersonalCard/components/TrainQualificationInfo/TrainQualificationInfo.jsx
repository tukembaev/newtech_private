import pencil from 'assets/icons/pencil.svg'
import { useEffect, useState } from 'react'
import styles from './TrainQualificationInfo.module.scss'

import deleteIcon from 'assets/icons/trash_del.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteTrainings,
    getPersonalEmployee,
    postQualifications
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'

const TrainQualificationInfo = () => {
  const [change, setChange] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [title, setTitle] = useState(null)
  const [kind, setKind] = useState(null)
  const [position, setPosition] = useState(null)
  const [started, setStarted] = useState(null)
  const [ended, setEnded] = useState(null)
  const [certification_type, setCertification_type] = useState(null)
  const [certification, setCertification] = useState(null)

  let data
  const dispatch = useDispatch()
  const user = userInfo()
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
    // getDataKy()
  }, [render])
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = {
        title,
        kind,
        started,
        ended,
        certification_type,
        certification,
      }
      let response = await postQualifications(data, 'ru')

      setNotify({
        isOpen: true,
        message: 'Квалификация добавлена',
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
      let response = await deleteTrainings(id)
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
    <div className={styles.wrapper}>
      <div style={{ width: '100%', height: '100%' }}>
        {change ? (
          <div className={styles.Activity_true}>
            <div className={styles.ActivityHeader}>
              <div className={styles.header_left}>
                {/* <img onClick={() => setChange(false)}  alt="" className={styles.header_left_img} /> */}
                <h4 className={styles.header_left_info}>
                  Повышение квалификации
                </h4>
              </div>
              <div className={styles.headerRight}></div>
            </div>

            <div className={styles.Activity_change_block}>
              <ul className={styles.Activity_desc}>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Тема</h3>
                  <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.Activity_info_change_inp}
                  />
                </li>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Начало</h3>
                  <input
                    type="date"
                    onChange={(e) => setStarted(e.target.value)}
                    className={styles.Activity_info_change_inp}
                  />
                </li>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Конец</h3>
                  <input
                    onChange={(e) => setEnded(e.target.value)}
                    type="date"
                    className={styles.Activity_info_change_inp}
                  />
                </li>

                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Вид повышения</h3>
                  <input
                    type="text"
                    onChange={(e) => setKind(e.target.value)}
                    className={styles.Activity_info_change_inp}
                  />
                </li>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Вид документа</h3>
                  <input
                    onChange={(e) => setCertification_type(e.target.value)}
                    type="text"
                    className={styles.Activity_info_change_inp}
                  />
                </li>
                <li className={styles.Activity_list_true}>
                  <h3 className={styles.Activity_title}>Документ</h3>
                  <input
                    onChange={(e) => setCertification(e.target.files[0])}
                    type="file"
                    className={styles.Activity_info_change_inp}
                  />
                </li>

                <div className={styles.change_btn}>
                  {/* <button className={styles.change_btn_add}>
                    <p style={{ color: "white" }}>Добавить еще</p>
                  </button> */}
                </div>
              </ul>

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
          <div className={styles.Activity}>
            <div className={styles.ActivityHeader}>
              <div className={styles.header_left}>
                {/* <img src={back} alt="" className={styles.header_left_img} /> */}
                <h4 className={styles.header_left_info}>
                  Повышение квалификации
                </h4>
              </div>
              <div className={styles.headerRight}>
                <img
                  src={pencil}
                  onClick={() => setChange(true)}
                  className={styles.headerRight_info}
                ></img>
              </div>
            </div>
            {info?.trainings
              ?.filter((elem) => elem.title !== null)
              .map((item) => (
                <ul className={styles.Activity_desc}>
                  <li className={styles.Activity_list}>
                    <p className={styles.Activity_title}>Тема</p>
                    <p className={styles.Activity_info}>{item?.title}</p>
                  </li>

                  <li className={styles.Activity_list}>
                    <p className={styles.Activity_title}>Начало</p>
                    <p className={styles.Activity_info}>{item?.started}</p>
                  </li>

                  <li className={styles.Activity_list}>
                    <p className={styles.Activity_title}>Конец</p>
                    <p className={styles.Activity_info}>{item?.ended}</p>
                  </li>

                  <li className={styles.Activity_list}>
                    <p className={styles.Activity_title}>Вид повышения</p>
                    <p className={styles.Activity_info}>{item?.kind}</p>
                  </li>
                  <li className={styles.Activity_list}>
                    <p className={styles.Activity_title}>Вид документа</p>
                    <p className={styles.Activity_info}>
                      {item?.certification_type}
                    </p>
                  </li>

                  <li className={styles.Activity_list}>
                    <p className={styles.Activity_title}>Документ</p>
                    <button className={styles.change_btn_download}>
                      <a
                        target="_blank"
                        href={item?.certification}
                        style={{ color: 'white' }} rel="noreferrer"
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
                  </li>
                </ul>
              ))}
          </div>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default TrainQualificationInfo
