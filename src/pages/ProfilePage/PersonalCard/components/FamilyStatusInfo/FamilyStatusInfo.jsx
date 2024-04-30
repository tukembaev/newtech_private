import pencil from 'assets/icons/pencil.svg'
import deleteIcon from 'assets/icons/trash_del.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteReletives,
    getPersonalEmployee,
    patchPersonalEmployee,
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'
import styles from './FamilyStatusInfo.module.scss'

const FamilyStatusInfo = ({ data }) => {
  const [change, setChange] = useState(false)
  const [family, setFamily] = useState('')
  const [marital_status, setMarital_status] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [patronymic, setPantronymic] = useState('')
  const [relationship, setRelationship] = useState('')
  const [born, setBorn] = useState('')
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

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

  const user = userInfo()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let response = await patchPersonalEmployee(
        {
          family: {
            // id: 12 ,
            marital_status,
            relatives: [
              {
                name,
                surname,
                patronymic,
                relationship,
                born,
              },
            ],
          },
        },
        'ru',
      )

      setNotify({
        isOpen: true,
        message: ' Семейный статус установлен',
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
      let response = await deleteReletives(id)
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
          <div className={styles.Family_true}>
            <div className={styles.FamilyHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Семейное положение</h4>
              </div>
              <div className={styles.headerRight}></div>
            </div>
            <p
              style={{
                color: 'black',
                fontSize: '16px',
                width: '80%',
                textAlign: 'left',
                margin: 'auto',
                marginLeft: ' 8%',
                marginTop: '50px',
                marginBottom: '50px',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {info.family?.marital_status}
            </p>
            <h2
              style={{
                color: 'black',
                fontSize: '16px',
                width: '80%',
                textAlign: 'left',
                margin: 'auto',
                marginLeft: '20px',
              }}
            >
              Сведение о родественниках{' '}
            </h2>
            {info.family?.relatives.map((item) => (
              <ul className={styles.Family_desc}>
                <li className={styles.Family_list}>
                  <p className={styles.Family_title}>Имя</p>
                  <p className={styles.Family_info}>{item.name}</p>
                </li>

                <li className={styles.Family_list}>
                  <p className={styles.Family_title}>Фамилия</p>
                  <p className={styles.Family_info}>{item.surname}</p>
                </li>

                <li className={styles.Family_list}>
                  <p className={styles.Family_title}>Отчество</p>
                  <p className={styles.Family_info}>{item.patronymic}</p>
                </li>

                <li className={styles.Family_list}>
                  <p className={styles.Family_title}>Степень родства</p>
                  <p className={styles.Family_info}>{item.relationship}</p>
                </li>

                <li className={styles.Family_list}>
                  <p className={styles.Family_title}>Дата рождения</p>
                  <p className={styles.Family_info}>{item.born}</p>
                </li>

                <button
                  onClick={() => deleteUserInfo(item.id)}
                  className={styles.change_btn_delete}
                >
                  <img src={deleteIcon} style={{ color: 'white' }} alt="" />
                </button>
              </ul>
            ))}

            <div className={styles.Family_change_block}>
              <div className={styles.Family_change_header}>
                <input
                  onChange={(e) => setMarital_status(e.target.value)}
                  type="text"
                  placeholder="Семейное положение на момент заполнения"
                  className={styles.Family_info_Header_inp}
                />
                {/* <button className={styles.change_btn_add}><p  style={{color: 'white', fontSize:'20px'}}>Добавить еще</p></button> */}
              </div>

              <ul className={styles.Family_desc}>
                <li className={styles.Family_list}>
                  <h3 className={styles.Family_title}>Имя</h3>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className={styles.Family_info_change_inp}
                  />
                </li>

                <li className={styles.Family_list}>
                  <h3 className={styles.Family_title}>Фамилия</h3>
                  <input
                    onChange={(e) => setSurname(e.target.value)}
                    type="text"
                    className={styles.Family_info_change_inp}
                  />
                </li>

                <li className={styles.Family_list}>
                  <h3 className={styles.Family_title}>Отчество</h3>
                  <input
                    onChange={(e) => setPantronymic(e.target.value)}
                    type="text"
                    className={styles.Family_info_change_inp}
                  />
                </li>

                <li className={styles.Family_list}>
                  <h3 className={styles.Family_title}>Дата рождения</h3>
                  <input
                    onChange={(e) => setBorn(e.target.value)}
                    type="date"
                    className={styles.Family_info_change_inp}
                  />
                </li>

                <li className={styles.Family_list}>
                  <h3 className={styles.Family_title}>Степень родства</h3>
                  <input
                    onChange={(e) => setRelationship(e.target.value)}
                    type="text"
                    className={styles.Family_info_change_inp}
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
          <div className={styles.Family}>
            <div className={styles.FamilyHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Семейное положение</h4>
              </div>
              <div className={styles.headerRight}>
                <img
                  src={pencil}
                  onClick={() => setChange(true)}
                  className={styles.headerRight_info}
                />
              </div>
            </div>

            <p
              style={{
                color: 'black',
                fontSize: '16px',
                width: '80%',
                textAlign: 'left',
                margin: 'auto',
                marginTop: '50px',
                marginBottom: '50px',
                fontFamily: '"Inter", sans-serif',
                marginLeft: '50px',
              }}
            >
              {info.family?.marital_status}
            </p>
            <h2
              style={{
                color: 'black',
                fontSize: '16px',
                width: '80%',
                textAlign: 'left',
                margin: 'auto',
              }}
            >
              Сведение о родественниках{' '}
            </h2>
            {info.family?.relatives.map((item) => (
              <ul className={styles.Family_desc}>
                <li className={styles.Family_list}>
                  <p className={styles.Family_title}>Имя</p>
                  <p className={styles.Family_info}>{item.name}</p>
                </li>

                <li className={styles.Family_list}>
                  <p className={styles.Family_title}>Фамилия</p>
                  <p className={styles.Family_info}>{item.surname}</p>
                </li>

                <li className={styles.Family_list}>
                  <p className={styles.Family_title}>Отчество</p>
                  <p className={styles.Family_info}>{item.patronymic}</p>
                </li>

                <li className={styles.Family_list}>
                  <p className={styles.Family_title}>Степень родства</p>
                  <p className={styles.Family_info}>{item.relationship}</p>
                </li>

                <li className={styles.Family_list}>
                  <p className={styles.Family_title}>Дата рождения</p>
                  <p className={styles.Family_info}>{item.born}</p>
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

export default FamilyStatusInfo
