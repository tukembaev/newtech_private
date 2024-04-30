import React from 'react'
import styles from './DocumentStatusCards.module.scss'
import Card from './components/Card'
import LastActionCard from '../LastActionCard/LastActionCard'

const DocumentStatusCards = ({ data, dataLastActions, is_all_statistic }) => {
  return (
    <div className={styles.document_status_cards_wrapper}>
      <Card title={'Рапорта'} data={data?.raport} />
      <Card title={'Заявления'} data={data?.statement} />

      {is_all_statistic ? '' : <LastActionCard data={dataLastActions} />}
    </div>
  )
}

export default DocumentStatusCards
