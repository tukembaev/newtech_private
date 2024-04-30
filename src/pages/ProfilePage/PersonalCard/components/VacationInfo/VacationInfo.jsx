import pencil from 'assets/icons/pencil.svg'
import deleteIcon from 'assets/icons/trash_del.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteVacations,
    getPersonalEmployee,
    patchPersonalEmployee,
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'
import styles from './VacationInfo.module.scss'

const VacationInfo = () => {
  const [change, setChange] = useState(false)

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [kind, setKind] = useState('')
  const [period, setPeriod] = useState('')
  const [started, setStarted] = useState('')
  const [ended, setEnded] = useState('')
  const [leave_order, setLeave_order] = useState('')
  const [unused_days, setUnused_days] = useState(null)
  const [unpaid_days, setUnpaid_days] = useState(null)
  const [recall_order, setRecall_order] = useState(null)
  const [recall_order_date, setRecall_order_date] = useState(null)
  const [leave_order_date, setLeave_order_date] = useState(null)
  const [recalled, setRecalled] = useState(null)

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
        vacations: [
          {
            kind,
            period,
            started,
            ended,
            leave_order,
            unused_days,
            unpaid_days,
            recall_order,
            recall_order_date,
            leave_order_date,
            recalled,
          },
        ],
      })

      setNotify({
        isOpen: true,
        message: 'данные установлены',
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
      let response = await deleteVacations(id)
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
          <div className={styles.Vacation_true}>
            <div className={styles.VacationHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Отпуск</h4>
              </div>
              <div className={styles.headerRight}></div>
            </div>

            <div className={styles.Vacation_change_block}>
              {info?.vacations?.map((item) => (
                <div>
                  <p
                    style={{
                      color: 'black',
                      width: '80%',
                      textAlign: 'left',
                      margin: 'auto',
                      marginLeft: '8%',
                      marginTop: '15px',
                      fontSize: '20px',
                    }}
                  >
                    {item?.kind}{' '}
                  </p>
                  <ul className={styles.Vacation_desc}>
                    <li className={styles.Vacation_list}>
                      <p className={styles.Vacation_title}>Номер приказа</p>
                      <p className={styles.Vacation_info}>
                        {item?.leave_order}
                      </p>
                    </li>

                    <li className={styles.Vacation_list}>
                      <p className={styles.Vacation_title}>Начало</p>
                      <p className={styles.Vacation_info}>{item?.started}</p>
                    </li>

                    <li className={styles.Vacation_list}>
                      <p className={styles.Vacation_title}>Конец</p>
                      <p className={styles.Vacation_info}>{item?.ended}</p>
                    </li>

                    <li className={styles.Vacation_list}>
                      <p className={styles.Vacation_title}>Количество дней</p>
                      <p className={styles.Vacation_info}>{item?.period}</p>
                    </li>

                    <li className={styles.Vacation_list}>
                      <p className={styles.Vacation_title}>
                        Отозвать с отпуска
                      </p>
                      <p className={styles.Vacation_info}>
                        {item?.recall_order_date}
                      </p>
                    </li>

                    <li className={styles.Vacation_list}>
                      <p className={styles.Vacation_title}>Дата</p>
                      <p className={styles.Vacation_info}>
                        {item?.leave_order_date}
                      </p>
                    </li>

                    <button
                      onClick={() => deleteUserInfo(item.id)}
                      className={styles.change_btn_delete}
                    >
                      <img src={deleteIcon} style={{ color: 'white' }} alt="" />
                    </button>
                  </ul>
                </div>
              ))}

              <div className={styles.Vacation_change_header}>
                <input
                  onChange={(e) => setKind(e.target.value)}
                  type="text"
                  placeholder="Вид отпуска"
                  className={styles.Vacation_info_Header_inp}
                />
                {/* <button className={styles.change_btn_add}><p  style={{color: 'white', fontSize:'20px'}}>Добавить еще</p></button> */}
              </div>
              <ul className={styles.Vacation_desc}>
                <li className={styles.Vacation_list_true}>
                  <h3 className={styles.Vacation_title}>Количество дней</h3>
                  <input
                    onChange={(e) => setPeriod(e.target.value)}
                    type="text"
                    className={styles.Vacation_info_change_inp}
                  />
                </li>

                <li className={styles.Vacation_list_true}>
                  <h3 className={styles.Vacation_title}>Начало отпуска</h3>
                  <input
                    onChange={(e) => setStarted(e.target.value)}
                    type="date"
                    className={styles.Vacation_info_change_inp}
                  />
                </li>

                <li className={styles.Vacation_list_true}>
                  <h3 className={styles.Vacation_title}>Конец отпуска</h3>
                  <input
                    onChange={(e) => setEnded(e.target.value)}
                    type="date"
                    className={styles.Vacation_info_change_inp}
                  />
                </li>

                <li className={styles.Vacation_list_true}>
                  <h3 className={styles.Vacation_title}>Приказ на отпуск</h3>
                  <input
                    onChange={(e) => setLeave_order(e.target.value)}
                    type="text"
                    className={styles.Vacation_info_change_inp}
                  />
                </li>

                <li className={styles.Vacation_list_true}>
                  <h3 className={styles.Vacation_title}>Дата</h3>
                  <input
                    onChange={(e) => setLeave_order_date(e.target.value)}
                    type="date"
                    className={styles.Vacation_info_change_inp}
                  />
                </li>

                <li className={styles.Vacation_list_true}>
                  <h3 className={styles.Vacation_title}>
                    Не использованные дни
                  </h3>
                  <input
                    onChange={(e) => setUnused_days(e.target.value)}
                    type="text"
                    className={styles.Vacation_info_change_inp}
                  />
                </li>

                <li className={styles.Vacation_list_true}>
                  <h3 className={styles.Vacation_title}>Отозвать с отпуска</h3>
                  <input
                    onChange={(e) => setRecalled(e.target.value)}
                    type="date"
                    className={styles.Vacation_info_change_inp}
                  />
                </li>

                <li className={styles.Vacation_list_true}>
                  <h3 className={styles.Vacation_title}>Не оплаченные дни</h3>
                  <input
                    onChange={(e) => setUnpaid_days(e.target.value)}
                    type="text"
                    className={styles.Vacation_info_change_inp}
                  />
                </li>

                <li className={styles.Vacation_list_true}>
                  <h3 className={styles.Vacation_title}>Приказ</h3>
                  <input
                    onChange={(e) => setRecall_order(e.target.value)}
                    type="text"
                    className={styles.Vacation_info_change_inp}
                  />
                </li>

                <li className={styles.Vacation_list_true}>
                  <h3 className={styles.Vacation_title}>Дата</h3>
                  <input
                    onChange={(e) => setRecall_order_date(e.target.value)}
                    type="date"
                    className={styles.Vacation_info_change_inp}
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
          <div className={styles.Vacation}>
            <div className={styles.VacationHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Отпуск</h4>
              </div>
              <div className={styles.headerRight}>
                <img
                  src={pencil}
                  onClick={() => setChange(true)}
                  className={styles.headerRight_info}
                />
              </div>
            </div>
            {info?.vacations?.map((item) => (
              <div>
                <p
                  style={{
                    color: 'black',
                    width: '80%',
                    textAlign: 'left',
                    margin: 'auto',
                    marginLeft: '8%',
                    marginTop: '15px',
                    fontSize: '20px',
                  }}
                >
                  {item?.kind}{' '}
                </p>
                <ul className={styles.Vacation_desc}>
                  <li className={styles.Vacation_list}>
                    <p className={styles.Vacation_title}>Номер приказа</p>
                    <p className={styles.Vacation_info}>{item?.leave_order}</p>
                  </li>

                  <li className={styles.Vacation_list}>
                    <p className={styles.Vacation_title}>Начало</p>
                    <p className={styles.Vacation_info}>{item?.started}</p>
                  </li>

                  <li className={styles.Vacation_list}>
                    <p className={styles.Vacation_title}>Конец</p>
                    <p className={styles.Vacation_info}>{item?.ended}</p>
                  </li>

                  <li className={styles.Vacation_list}>
                    <p className={styles.Vacation_title}>Количество дней</p>
                    <p className={styles.Vacation_info}>{item?.period}</p>
                  </li>

                  <li className={styles.Vacation_list}>
                    <p className={styles.Vacation_title}>Отозвать с отпуска</p>
                    <p className={styles.Vacation_info}>
                      {item?.recall_order_date}
                    </p>
                  </li>

                  <li className={styles.Vacation_list}>
                    <p className={styles.Vacation_title}>Дата</p>
                    <p className={styles.Vacation_info}>
                      {item?.leave_order_date}
                    </p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default VacationInfo
