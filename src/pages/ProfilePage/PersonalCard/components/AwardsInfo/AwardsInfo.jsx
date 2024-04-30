import pencil from 'assets/icons/pencil.svg'
import deleteIcon from 'assets/icons/trash_del.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import {
  deleteAwards,
  getPersonalEmployee,
  postAwards
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'
import styles from './AwardsInfo.module.scss'

const AwardsInfo = () => {
  const [change, setChange] = useState(false)

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [kind, setKind] = useState('')
  const [award, setAward] = useState('')
  const [received, setReceive] = useState('')
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
  const getData = async () => {
    try {
      let response = await getPersonalEmployee(data)

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

  const info = useSelector((state) => state.personalcard.personal_info)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      let response = await postAwards({
        kind,
        award,
        received,
        certification,
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
    } finally {
      setLoading(false)
    }
  }
  const deleteAward = async (id) => {
    try {
      let response = await deleteAwards(id)
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
        <div className={styles.Prize_true}>
          <div className={styles.PrizeHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>Награды </h4>
            </div>
            <div className={styles.headerRight}></div>
          </div>
          {info?.awards?.map((item) => (
            <ul className={styles.Prize_desc}>
              <li className={styles.Prize_list}>
                <h3 className={styles.Prize_title}>Награда: </h3>
                <p className={styles.Prize_info}>{item.kind}</p>
              </li>

              <li className={styles.Prize_list}>
                <h3 className={styles.Prize_title}>Название:</h3>
                <p className={styles.Prize_info}>{item.award}</p>
              </li>

              <li className={styles.Prize_list}>
                <h3 className={styles.Prize_title}>Дата:</h3>
                <p className={styles.Prize_info}>{item.received}</p>
              </li>

              <button className={styles.change_btn_download}>
                <p style={{ color: 'white' }}>Скачать документ</p>
              </button>
              <button
                onClick={() => deleteAward(item.id)}
                className={styles.change_btn_delete}
              >
                <img src={deleteIcon} style={{ color: 'white' }} alt="" />
              </button>
            </ul>
          ))}

          <ul className={styles.Prize_desc}>
            <li className={styles.Prize_list}>
              <h3 className={styles.Prize_title}>Награда</h3>
              <input
                onChange={(e) => setKind(e.target.value)}
                type="text"
                className={styles.Prize_info_change_inp}
              />
            </li>

            <li className={styles.Prize_list}>
              <h3 className={styles.Prize_title}>Название</h3>
              <input
                onChange={(e) => setAward(e.target.value)}
                type="text"
                className={styles.Prize_info_change_inp}
              />
            </li>

            <li className={styles.Prize_list}>
              <h3 className={styles.Prize_title}>Дата</h3>
              <input
                onChange={(e) => setReceive(e.target.value)}
                type="date"
                className={styles.Prize_info_change_inp}
              />
            </li>

            <li className={styles.Prize_list}>
              <h3 className={styles.Prize_title}>Файл</h3>
              <input
                onChange={(e) => setCertification(e.target.files[0])}
                type="file"
                className={styles.Prize_info_change_inp}
              />
            </li>
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
                <button
                  onClick={handleSubmit}
                  className={styles.change_btn_save}
                >
                  <p style={{ color: 'white' }}>Сохранить Изменения</p>
                </button>
              )}
            </div>
          </ul>
        </div>
      ) : (
        <div className={styles.Prize}>
          <div className={styles.PrizeHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>Награды </h4>
            </div>
            <div className={styles.headerRight}>
              <img
                src={pencil}
                onClick={() => setChange(true)}
                className={styles.headerRight_info}
              ></img>
            </div>
          </div>
          {info?.awards?.map((item) => (
            <ul className={styles.Prize_desc}>
              <li className={styles.Prize_list}>
                <h3 className={styles.Prize_title}>Награда: </h3>
                <p className={styles.Prize_info}>{item.kind}</p>
              </li>

              <li className={styles.Prize_list}>
                <h3 className={styles.Prize_title}>Название:</h3>
                <p className={styles.Prize_info}>{item.award}</p>
              </li>

              <li className={styles.Prize_list}>
                <h3 className={styles.Prize_title}>Дата:</h3>
                <p className={styles.Prize_info}>{item.received}</p>
              </li>

              <button className={styles.change_btn_download}>
                <a
                  target="_blank"
                  href={item?.certification}
                  style={{ color: 'white' }} rel="noreferrer"
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

export default AwardsInfo
