import React from 'react'
import styles from './CircleStatistic.module.scss'
import { useNavigate } from 'react-router-dom'

const CircleStatistic = ({ title, data, selectedEmp }) => {
  const navigate = useNavigate()
  const validator = selectedEmp?.length === 0 ? true : false
  return (
    <div className={styles.circle_wrapper}>
      {title.includes('Удовлетворенность сотрудника') ? (
        <div
          style={{
            border:
              data?.quiz <= 30
                ? '15px solid red'
                : data?.quiz > 30 && data?.quiz <= 60
                  ? '15px solid orange'
                  : '15px solid green',
          }}
          className={styles.circle}
        >
          <h2>{data?.quiz === 0 ? '-' : `${data?.quiz}%`}</h2>
          <h4>{title}</h4>
          {data?.quiz === 0 && validator ? (
            <h5
              style={{ cursor: 'pointer', color: 'red' }}
              onClick={() => navigate('/answer-quiz')}
            >
              Пройти опрос
            </h5>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div
          style={{
            border:
              data?.kpi <= 30
                ? '15px solid red'
                : data?.kpi > 30 && data?.kpi <= 60
                  ? '15px solid orange'
                  : '15px solid green',
          }}
          className={styles.circle}
        >
          <h2>{data?.kpi}%</h2>
          <h4>{title}</h4>
        </div>
      )}
    </div>
  )
}

export default CircleStatistic
