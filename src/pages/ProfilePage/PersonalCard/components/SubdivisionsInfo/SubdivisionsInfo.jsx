import { useState } from 'react'
import styles from './SubdivisionsInfo.module.scss'
const SubdivisionInfo = () => {
  const [change, setChange] = useState(false)

  return (
    <div>
      <div className={styles.Subdivision}>
        <div className={styles.SubdivisionHeader}>
          <div className={styles.header_left}>
            <h4 className={styles.header_left_info}>Подразделения</h4>
          </div>
          <div className={styles.headerRight}>
            <input type="text" className={styles.Subdivision_info_change_inp} />
          </div>
        </div>

        <ul className={styles.Subdivision_desc}>
          <li className={styles.Subdivision_list}>
            <h3 className={styles.Subdivision_title}>ОРПО</h3>
            <p className={styles.Subdivision_info}>ОКС</p>
          </li>

          <li className={styles.Subdivision_list}>
            <h3 className={styles.Subdivision_title}>Отдел кадров студентов</h3>
            <p className={styles.Subdivision_info}>ОКС</p>
          </li>
          <li className={styles.Subdivision_list}>
            <h3 className={styles.Subdivision_title}>Склад</h3>
            <p className={styles.Subdivision_info}>Склад</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SubdivisionInfo
