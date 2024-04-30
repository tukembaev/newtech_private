import pencil from 'assets/icons/pencil.svg'
import Dropdown from 'components/Dropdown/Dropdown'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getPersonalEmployee,
    patchPersonalEmployee,
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'
import styles from './LanguagesInfo.module.scss'
const LanguagesInfo = () => {
  const [add, setAdd] = useState(false)
  const [change, setChange] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [is_mother_tongue, setIs_mother_tongue] = useState('')
  const [language, setLanguage] = useState('')
  const [level, setLevel] = useState('')

  const request_type2 = [
    { id: 0, label: 'Да' },
    { id: 1, label: 'Нет' },
  ]
  const request_type = [
    { id: 0, label: 'a1' },
    { id: 1, label: 'a2' },
    { id: 2, label: 'b1' },
    { id: 3, label: 'b2' },
    { id: 4, label: 'c1' },
    { id: 5, label: 'c1' },
  ]
  const [id, setId] = useState('')
  const [type_doc, setType_doc] = useState('')

  const checkMotherTongue = () => {
    if (type_doc === 'Да') {
      setIs_mother_tongue('True')
    } else if (type_doc == 'Нет') {
      setIs_mother_tongue('False')
    }
  }

  useEffect(() => {
    checkMotherTongue()
  }, [type_doc === 'Да' || type_doc === 'Нет'])

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
    checkMotherTongue()
  }, [render])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let response = await patchPersonalEmployee({
        languages: [
          {
            is_mother_tongue,
            language,
            level,
          },
          //  {
          // is_mother_tongue,
          // language,
          // level
          // }
        ],
      })

      setNotify({
        isOpen: true,
        message: 'данные о языках изменены',
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

  return (
    <div>
      {change ? (
        <div className={styles.LanguagesInfo}>
          <div className={styles.LanguagesInfoHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>Знание Языков </h4>
            </div>
          </div>
          <ul className={styles.LanguagesInfo_desc}>
            <li className={styles.LanguagesInfo_list}>
              <h3 className={styles.LanguagesInfo_title}>Знание Гос.языка </h3>
              {info?.languages[0]?.is_mother_tongue ? (
                <p className={styles.LanguagesInfo_info}>даff</p>
              ) : (
                <p className={styles.LanguagesInfo_info}>Нет</p>
              )}
            </li>

            <li className={styles.LanguagesInfo_list}>
              <h3 className={styles.LanguagesInfo_title}>Знание языков</h3>
              <p className={styles.LanguagesInfo_info}>
                {info?.languages[0]?.language}
              </p>
            </li>

            <li className={styles.LanguagesInfo_list}>
              <h3 className={styles.LanguagesInfo_title}>Уровень знания:</h3>
              <p className={styles.LanguagesInfo_info}>
                {info?.languages[0]?.level}
              </p>
            </li>

            {/* <button onClick={() => setAdd(true)} className={styles.change_btn_add}><p style={{color: 'white', }}>Добавить еще</p></button> */}
          </ul>

          <div className={styles.LanguagesInfo_change_block}>
            <ul className={styles.LanguagesInfo_desc}>
              <li className={styles.LanguagesInfo_list_true}>
                <h3 className={styles.LanguagesInfo_title}>Знание Гос.языка</h3>
                <Dropdown
                  setId={setId}
                  setType={setType_doc}
                  title={'Знание Гос.языка'}
                  data={request_type2 ?? []}
                />

                {/* <input onChange={(e) => setIs_mother_tongue(e.target.value)} type="text" className={styles.LanguagesInfo_info_change_inp} /> */}
              </li>

              <li className={styles.LanguagesInfo_list_true}>
                <h3 className={styles.LanguagesInfo_title}>Знание языков</h3>
                <input
                  onChange={(e) => setLanguage(e.target.value)}
                  type="text"
                  className={styles.LanguagesInfo_info_change_inp}
                />
              </li>

              <li className={styles.LanguagesInfo_list_true}>
                <h3 className={styles.LanguagesInfo_title}>Уровень знания</h3>
                <Dropdown
                  setId={setId}
                  setType={setLevel}
                  title={'Уровень знания'}
                  data={request_type ?? []}
                />
                {/* <input onChange={(e) => setLevel(e.target.value)} type="text" className={styles.LanguagesInfo_info_change_inp} /> */}
              </li>

              {/* <li className= {styles.LanguagesInfo_list}>
             <h3 className={styles.LanguagesInfo_title}>Файл</h3>
             <input onChange={(e) => setCertification(e.target.files[0])} type="file" className={styles.LanguagesInfo_info_change_inp} />
            
            </li>
              */}
            </ul>

            {add ? (
              <ul
                style={{ display: 'flex', justifyContent: 'space-around' }}
                className={styles.LanguagesInfo_desc_foot}
              >
                <li className={styles.LanguagesInfo_list_true}>
                  <h3 className={styles.LanguagesInfo_title}>Знание языков</h3>
                  <input
                    type="text"
                    className={styles.LanguagesInfo_info_change_inp}
                  />
                </li>

                <li className={styles.LanguagesInfo_list_true}>
                  <h3 className={styles.LanguagesInfo_title}>Уровень знания</h3>
                  <input
                    type="text"
                    className={styles.LanguagesInfo_info_change_inp}
                  />
                </li>
                <button
                  className={styles.LanguagesInfo_btn}
                  onClick={() => setAdd(false)}
                >
                  x
                </button>
              </ul>
            ) : null}
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
        <div className={styles.LanguagesInfo}>
          <div className={styles.LanguagesInfoHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>Знание Языков </h4>
            </div>
            <div className={styles.headerRight}>
              <img
                src={pencil}
                onClick={() => setChange(true)}
                className={styles.headerRight_info}
              />
            </div>
          </div>
          {info?.languages.map((item) => (
            <ul className={styles.LanguagesInfo_desc}>
              <li className={styles.LanguagesInfo_list}>
                <h3 className={styles.LanguagesInfo_title}>
                  Знание Гос языка{' '}
                </h3>
                {item?.is_mother_tongue ? (
                  <p className={styles.LanguagesInfo_info}>да</p>
                ) : (
                  <p className={styles.LanguagesInfo_info}>Нет</p>
                )}
              </li>

              <li className={styles.LanguagesInfo_list}>
                <h3 className={styles.LanguagesInfo_title}>
                  Знание иностранных языков
                </h3>
                <p className={styles.LanguagesInfo_info}> {item?.language} </p>
              </li>

              <li className={styles.LanguagesInfo_list}>
                <h3 className={styles.LanguagesInfo_title}>
                  Уровень знания языка:
                </h3>
                <p className={styles.LanguagesInfo_info}> {item?.level} </p>
              </li>
            </ul>
          ))}
        </div>
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default LanguagesInfo
