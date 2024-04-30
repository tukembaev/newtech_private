import pencil from 'assets/icons/pencil.svg'
import { useState } from 'react'
import styles from './ManningTableInfo.module.scss'

const ManningTableInfo = () => {
  const [change, setChange] = useState(false)
  return (
    <div className={styles.wrapper}>
      <div style={{ width: '100%', height: '100%' }}>
        {change ? (
          <div className={styles.Staffing_true}>
            <div className={styles.StaffingHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Штатное расписание</h4>
              </div>
              <div className={styles.headerRight}></div>
            </div>

            <div className={styles.Staffing_change_block}>
              <div className={styles.Staffing_change_header}>
                <div className={styles.headerLeft}>
                  <p className={styles.header_text}>Подразделение</p>
                  <input
                    type="text"
                    className={styles.Staffing_info_Header_inp}
                  />
                </div>
              </div>

              <ul className={styles.Staffing_desc}>
                <li className={styles.Staffing_list_true}>
                  <h3 className={styles.Staffing_title}>Должность</h3>
                  <input
                    type="text"
                    className={styles.Staffing_info_change_inp}
                  />
                </li>

                <li className={styles.Staffing_list_true}>
                  <h3 className={styles.Staffing_title}>Категория</h3>
                  <input
                    type="text"
                    className={styles.Staffing_info_change_inp}
                  />
                </li>

                <li className={styles.Staffing_list_true}>
                  <h3 className={styles.Staffing_title}>Форма оплаты</h3>
                  <input
                    type="text"
                    className={styles.Staffing_info_change_inp}
                  />
                </li>

                <li className={styles.Staffing_list_true}>
                  <h3 className={styles.Staffing_title}>Количество единиц</h3>
                  <input
                    type="text"
                    className={styles.Staffing_info_change_inp}
                  />
                </li>
                <div className={styles.change_btn}>
                  <button className={styles.change_btn_add}>
                    <p style={{ color: 'white' }}>Добавить еще</p>
                  </button>
                </div>
              </ul>
              <ul className={styles.Staffing_desc_footer}>
                <li className={styles.Staffing_list_footer}>
                  <p className={styles.Staffing_info_footer}>Ввести штат</p>
                  <input
                    type="text"
                    placeholder="Номер приказа"
                    className={styles.Staffing_info_change_inp}
                  />
                  <input
                    type="date"
                    className={styles.Staffing_info_change_inp}
                  />
                </li>

                <li className={styles.Staffing_list_footer}>
                  <p className={styles.Staffing_info_footer}>Вывести штат</p>
                  <input
                    type="text"
                    placeholder="Номер приказа"
                    className={styles.Staffing_info_change_inp}
                  />
                  <input
                    type="date"
                    className={styles.Staffing_info_change_inp}
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
                <button className={styles.change_btn_save}>
                  <p style={{ color: 'white' }}>Сохранить Изменения</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.Staffing}>
            <div className={styles.StaffingHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Штатное расписание</h4>
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
                color: 'white',
                width: '80%',
                textAlign: 'left',
                margin: 'auto',
                marginLeft: '8%',
                marginTop: '15px',
              }}
            >
              Подразделение{' '}
            </p>
            <p
              style={{
                color: 'white',
                width: '80%',
                textAlign: 'left',
                margin: 'auto',
                marginLeft: '8%',
                marginTop: '15px',
              }}
            >
              ОРПО{' '}
            </p>
            <ul className={styles.Staffing_desc}>
              <li className={styles.Staffing_list}>
                <p className={styles.Staffing_title}>Должность</p>
                <p className={styles.Staffing_info}>Инженер-программист</p>
              </li>

              <li className={styles.Staffing_list}>
                <p className={styles.Staffing_title}>Категория</p>
                <p className={styles.Staffing_info}>-</p>
              </li>

              <li className={styles.Staffing_list}>
                <p className={styles.Staffing_title}>Форма оплаты</p>
                <p className={styles.Staffing_info}>Контракт</p>
              </li>

              <li className={styles.Staffing_list}>
                <p className={styles.Staffing_title}>Количество единиц</p>
                <p className={styles.Staffing_info}>-</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManningTableInfo
