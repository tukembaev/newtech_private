import React from 'react'
import styles from 'pages/ProjectPage/ProjectInfo/StageInfo/components/ResAndDoc.module.scss'
import { useNavigate } from 'react-router-dom'

const TaskResources = ({ data, count, isSubtask }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4>Выделенные ресурсы ({count})</h4>
      </div>
      <div className={styles.body} style={{ overflowX: 'auto' }}>
        <table className={styles.table__wrapper_left}>
          <thead className={styles.table__head_left}>
            <tr className={styles.table__row_left}>
              <th className={styles.table__item_left}>
                <span className={styles.table__title_left}>Наименование</span>
              </th>
              {isSubtask === undefined ? (
                <th className={styles.table__item_left}>
                  <span className={styles.table__title_left}>Используется</span>
                </th>
              ) : null}

              <th className={styles.table__item_left}>
                <span className={styles.table__title_left}>Выделено</span>
              </th>
            </tr>
          </thead>
          <tbody className={styles.table__body_left}>
            {data?.map((item) => (
              <tr className={styles.table__row_left}>
                <td className={styles.table__item_left}>
                  <span className={styles.table__title_left}>
                    {item.resource_title}
                  </span>
                </td>
                {isSubtask === undefined ? (
                  <td className={styles.table__item_left}>
                    <span className={styles.table__title_left}>
                      {item.remain}
                    </span>
                  </td>
                ) : null}

                <td className={styles.table__item_left}>
                  <span className={styles.table__title_left}>
                    {item.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TaskResources
