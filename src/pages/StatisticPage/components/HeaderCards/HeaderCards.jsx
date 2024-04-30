import React from 'react'
import styles from './HeaderCards.module.scss'

import { useNavigate } from 'react-router-dom'
const HeaderCards = ({ data, isUser }) => {
  const navigate = useNavigate()
  const dataType = [
    {
      title: 'Рапорта',
      value: data?.percent?.raport,
      color: 'rgba(201, 29, 29, 0.6)',
    },
    // { title: 'Приказы', value: data?.percent?.order, color: 'rgba(24, 175, 85, 0.41)' },
    {
      title: 'Заявления',
      value: data?.percent?.statement,
      color: 'rgba(240, 57, 145, 0.44)',
    },
    // { title: 'Документы', value: data?.percent?.document, color: 'rgba(22, 137, 202, 0.37)' },
    {
      title: 'Задачи',
      value: data?.percent?.task,
      color: 'rgba(6, 6, 6, 0.33)',
    },
    {
      title: 'Подзадачи',
      value: data?.percent?.subtask,
      color: 'rgba(240, 145, 57, 0.44)',
    },
  ]

  return (
    <>
      <div
        className={styles.card}
        style={{
          background:
            'linear-gradient(265deg, rgb(255 255 255) 0%, rgb(149 91 210) 0.01%, rgb(114 70 168) 100%)',
        }}
      >
        <div className={styles.flex_col}>
          <div>
            <h4>Этапы</h4>
            <h3>{data?.stage}</h3>
          </div>
          <p>Реализовано</p>
        </div>
      </div>
      <div
        className={styles.card}
        style={{
          background:
            'linear-gradient(265deg, #FFF 0%, #75ca39.01%, #3db547 100%)',
        }}
      >
        <div className={styles.flex_col}>
          <div>
            <h4>Задачи и подзадачи</h4>
            <h3>{data?.task_subtask}</h3>
          </div>
          <p>Завершено</p>
        </div>
      </div>
      <div
        className={styles.card}
        style={{
          background:
            'linear-gradient(265deg, #FFF 0%, #e6a934  01%, #c0830e 100%)',
        }}
      >
        <div className={styles.flex_col}>
          <div>
            <h4>Обращения</h4>
            <h3>{data?.conversions}</h3>
          </div>
          <p>Завершено</p>
        </div>
      </div>
      <div className={styles.double_cards}>
        <div
          className={styles.mini_card}
          style={{
            background:
              'linear-gradient(265deg, #FFF 0%, #638cf8 01%, #4570e0 100%)  ',
          }}
        >
          <div className={styles.flex_col}>
            <h4>Эффективность</h4>
            <h3>{data?.kpi}%</h3>{' '}
          </div>
        </div>
        <div
          className={styles.mini_card}
          style={{
            background:
              'linear-gradient(265deg, #FFF 0%, #638cf8 01%, #4570e0 100%)  ',
          }}
        >
          <div className={styles.flex_col}>
            {' '}
            <h4>Удовлетворенность</h4>
            {data?.quiz === 0 && isUser ? (
              <h4
                style={{ cursor: 'pointer', color: 'white' }}
                onClick={() => navigate('/answer-quiz')}
              >
                Пройти опрос
              </h4>
            ) : (
              <h4 style={{ color: 'white' }}>
                {data?.quiz ? `${data?.quiz}%` : `Опрос не пройден`}{' '}
              </h4>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderCards
