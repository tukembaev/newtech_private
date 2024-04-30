import React from 'react'
import styles from './LastActionCard.module.scss'
import Action from './Action'

const LastActionCard = ({ data }) => {
  return (
    <div className={styles.last_action_card_wrapper}>
      <h4>Последние действия</h4>
      {data?.map((item) => {
        return <Action item={item} />
      })}
    </div>
  )
}

export default LastActionCard
