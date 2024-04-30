import React, { useEffect, useState, useRef } from 'react'
import styles from './ReportTask.module.scss'
import { useNavigate } from 'react-router-dom'

import { useReactToPrint } from 'react-to-print'
const ReportTaskTable = ({ tasks, subtasks }) => {
  const navigate = useNavigate()

  const combinedList = [...tasks, ...subtasks]

  return (
    <table className={styles.table__wrapper}>
      <thead>
        <tr className={styles.table__row}>
          <th className={styles.table__item}>
            <span className={styles.table__title}>Название </span>
          </th>
          <th className={styles.table__item}>
            <span className={styles.table__title}>Ответственный</span>
          </th>
          <th className={styles.table__item}>
            <span className={styles.table__title}>Дата создания</span>
          </th>

          <th className={styles.table__item}>
            <span className={styles.table__title}>Важность</span>
          </th>
        </tr>
      </thead>
      <tbody className={styles.table__body}>
        {combinedList?.map((item) => {
          return (
            <tr key={item.id} className={styles.table__row}>
              <td className={styles.table__item}>
                <span
                  className={styles.table__title}
                  style={{ wordBreak: 'break-word' }}
                >
                  {item.task_name} {item.subtask_name}
                </span>
              </td>
              <td className={styles.table__item}>
                <span className={styles.table__title}>
                  {' '}
                  {item.responsible.map((name, idx) => (
                    <span className={styles.table__title} key={idx}>
                      {name}
                      <br />
                    </span>
                  ))}{' '}
                </span>
              </td>
              <td className={styles.table__item}>
                <span className={styles.table__title}>{item.create_date}</span>
              </td>

              <td className={styles.table__item}>
                {item.is_critical === true ? (
                  <span className={styles.table__title}>Важная</span>
                ) : (
                  <span className={styles.table__title}>Стандартная</span>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ReportTaskTable
