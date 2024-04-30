import React from 'react'
import styles from './ProfileStatistic.module.scss'
import PieChartsLine from '../PieChartsLine/PieChartsLine'
import AllDataPercentage from '../AllDataPercentage/AllDataPercentage'
const ProfileStatistic = ({ data, data2 }) => {
  return (
    <div className={styles.document_status_cards_wrapper}>
      <div className={styles.user_info_left}>
        <div className={styles.item_square_flex}>
          <div className={styles.item}>
            <p className={styles.title}>Сотрудник</p>
            <p className={styles.descrip}>{data?.profile?.name}</p>
          </div>
          <div className={styles.item}>
            <p className={styles.title}>Почта</p>
            <p className={styles.descrip}>{data?.profile?.email}</p>
          </div>
          <div className={styles.item}>
            <p className={styles.title}>В системе с</p>
            <p className={styles.descrip}>{data?.profile?.date_registration}</p>
          </div>
          <div className={styles.item}>
            <p className={styles.title}>Номер телефона</p>
            <p className={styles.descrip}>{data?.profile?.phone_number}</p>
          </div>
          <div className={styles.item}>
            <p className={styles.title}>Позиция</p>
            <p className={styles.descrip}>{data?.profile?.position}</p>
          </div>
        </div>
      </div>
      <div className={styles.right_side_mobile}>
        <div className={styles.user_progress_middle}>
          <p className={styles.title} style={{ textAlign: 'center' }}>
            Прогресс
          </p>
          <PieChartsLine data={data?.threepie} />
        </div>

        <div className={styles.user_progress_bottom}>
          <AllDataPercentage data={data?.onepie} />
        </div>
      </div>
    </div>
  )
}

export default ProfileStatistic
