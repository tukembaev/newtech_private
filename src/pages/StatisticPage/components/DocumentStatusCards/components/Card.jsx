import React from 'react'
import styles from './../DocumentStatusCards.module.scss'
import overview from 'assets/icons/overview.png'
import edit from 'assets/icons/edit_document_statistic.png'
import completed from 'assets/icons/task_statistic.png'
import inventory from 'assets/icons/inventory_statistic.png'
const Card = ({ title, data }) => {
  return (
    <div className={styles.card_wrapper}>
      <h3>{title}</h3>
      <div className={styles.card_flex}>
        <div className={styles.flex_column}>
          <span>В режиме ожидания</span>
          <div className={styles.flex}>
            <img src={overview} alt="" />
            <h2>{data?.standby}</h2>
          </div>
        </div>
        <div className={styles.flex_column}>
          <span>Выполняются</span>
          <div className={styles.flex}>
            <img src={edit} alt="" />
            <h2>{data?.progress}</h2>
          </div>
        </div>
        <div className={styles.flex_column}>
          <span>Завершенные</span>
          <div className={styles.flex}>
            <img src={completed} alt="" />
            <h2>{data?.complete}</h2>
          </div>
        </div>
        <div className={styles.flex_column}>
          <span>Всего</span>
          <div className={styles.flex}>
            <img src={inventory} alt="" />
            <h2>{data?.total}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
