import pencil from 'assets/icons/pencil.svg'
import { useState } from 'react'
import styles from './RankInfo.module.scss'

const RankInfo = () => {
  const [change, setChange] = useState(false)

  return (
    <div>
      {change ? (
        <div className={styles.Rank}>
          <div className={styles.RankHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>Звание/Степень</h4>
            </div>
            <div className={styles.headerRight}></div>
          </div>

          <ul className={styles.Rank_desc}>
            <li className={styles.Rank_list}>
              <h3 className={styles.Rank_title}>Ученя степень</h3>
              <input type="text" className={styles.Rank_info_change_inp} />
            </li>

            <li className={styles.Rank_list}>
              <h3 className={styles.Rank_title}>Ученое звание</h3>
              <input type="text" className={styles.Rank_info_change_inp} />
            </li>
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
          </ul>
        </div>
      ) : (
        <div className={styles.Rank}>
          <div className={styles.RankHeader}>
            <div className={styles.header_left}>
              <h4 className={styles.header_left_info}>Звание/Степень</h4>
            </div>
            <div className={styles.headerRight}>
              <img
                src={pencil}
                onClick={() => setChange(true)}
                className={styles.headerRight_info}
              />
            </div>
          </div>

          <ul className={styles.Rank_desc}>
            <li className={styles.Rank_list}>
              <h3 className={styles.Rank_title}>Ученя степень</h3>
              <p className={styles.Rank_info}>Магистр</p>
            </li>

            <li className={styles.Rank_list}>
              <h3 className={styles.Rank_title}>Ученое звание</h3>
              <p className={styles.Rank_info}>Доктор всех наук</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default RankInfo
