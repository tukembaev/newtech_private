import pencil from 'assets/icons/pencil.svg'
import { useEffect, useState } from 'react'
import {
    deleteRanks,
    getPersonalEmployee,
    postDiplomaticRank
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'
import styles from './DiplomaticRankInfo.module.scss'
// import { useSelector } from 'react-redux';
import deleteIcon from 'assets/icons/trash_del.svg'
import { useDispatch, useSelector } from 'react-redux'

const DiplomaticRankInfo = () => {
  const [change, setChange] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [title, setTitle] = useState('')
  const [rank, setRank] = useState('')
  const [assigned, setAssigned] = useState('')
  const [certification, setCertification] = useState('')

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
      let response = await postDiplomaticRank({
        title,
        rank,
        assigned,
        certification,
      })

      setNotify({
        isOpen: true,
        message: 'данные изменены',
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
  const diplomatic = info.ranks

  const deleteUserInfo = async (id) => {
    try {
      let response = await deleteRanks(id)
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
        <div className={styles.Diplomatic}>
          <div className={styles.DiplomaticHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>
                Дипломатический ранг или иные звания{' '}
              </h4>
            </div>
          </div>
          {diplomatic?.map((item) => (
            <ul className={styles.Diplomatic_desc}>
              <li className={styles.Diplomatic_list}>
                <h3 className={styles.Diplomatic_title}>Название </h3>
                <p className={styles.Diplomatic_info}>Дипломат</p>
              </li>

              <li className={styles.Diplomatic_list}>
                <h3 className={styles.Diplomatic_title}>Звание</h3>
                <p className={styles.Diplomatic_info}>Посол Кр</p>
              </li>

              <li className={styles.Diplomatic_list}>
                <h3 className={styles.Diplomatic_title}>Дата:</h3>
                <p className={styles.Diplomatic_info}>12 августа 2019 г.</p>
              </li>

              <button
                onClick={() => deleteUserInfo(item.id)}
                className={styles.change_btn_delete}
              >
                <img src={deleteIcon} style={{ color: 'white' }} alt="" />
              </button>
            </ul>
          ))}

          <div className={styles.Diplomatic_change_block}>
            <ul className={styles.Diplomatic_desc}>
              <li className={styles.Diplomatic_list}>
                <h3 className={styles.Diplomatic_title}>Название</h3>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className={styles.Diplomatic_info_change_inp}
                />
              </li>

              <li className={styles.Diplomatic_list}>
                <h3 className={styles.Diplomatic_title}>Звание</h3>
                <input
                  onChange={(e) => setRank(e.target.value)}
                  type="text"
                  className={styles.Diplomatic_info_change_inp}
                />
              </li>

              <li className={styles.Diplomatic_list}>
                <h3 className={styles.Diplomatic_title}>Дата</h3>
                <input
                  onChange={(e) => setAssigned(e.target.value)}
                  type="date"
                  className={styles.Diplomatic_info_change_inp}
                />
              </li>

              <li className={styles.Diplomatic_list}>
                <h3 className={styles.Diplomatic_title}>Файл</h3>
                <input
                  onChange={(e) => setCertification(e.target.files[0])}
                  type="file"
                  className={styles.Diplomatic_info_change_inp}
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
        </div>
      ) : (
        <div className={styles.Diplomatic}>
          <div className={styles.DiplomaticHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>
                Дипломатический ранг или иные звания{' '}
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
          {diplomatic?.map((item) => (
            <ul className={styles.Diplomatic_desc}>
              <li className={styles.Diplomatic_list}>
                <h3 className={styles.Diplomatic_title}>Название </h3>
                <p className={styles.Diplomatic_info}>{item.title}</p>
              </li>

              <li className={styles.Diplomatic_list}>
                <h3 className={styles.Diplomatic_title}>Звание</h3>
                <p className={styles.Diplomatic_info}>{item.rank}</p>
              </li>

              <li className={styles.Diplomatic_list}>
                <h3 className={styles.Diplomatic_title}>Дата:</h3>
                <p className={styles.Diplomatic_info}>{item.assigned}</p>
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

export default DiplomaticRankInfo
