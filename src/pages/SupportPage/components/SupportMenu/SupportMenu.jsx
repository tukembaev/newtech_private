import React from 'react'
import styles from 'pages/StatementPage/components/StatementMenu/StatementMenu.module.scss'

const SupportMenu = ({ first, second, setFilterChoose }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list__wrapper}>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(0)}>
            {first}
          </p>
        </div>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(1)}>
            {second}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SupportMenu
