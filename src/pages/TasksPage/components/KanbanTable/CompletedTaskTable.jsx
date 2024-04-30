import React, { useEffect, useState } from 'react'
import styles from './../KanbanTable/ReportTask.module.scss'
import { useNavigate } from 'react-router-dom'
const CompletedTaskTable = ({
  completedTasks,
  searchTerm,
  SearchByTitle,
  isSubtasks,
}) => {
  const navigate = useNavigate()
  let searchFilter
  if (SearchByTitle === false) {
    searchFilter = completedTasks?.filter((item) =>
      isSubtasks
        ? item?.members_subtask?.[0]?.member?.first_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item?.members_subtask?.[0]?.member?.surname
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        : item?.members?.[0]?.member?.first_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item?.members?.[0]?.member?.surname
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
    )
  } else {
    searchFilter = completedTasks?.filter((item) =>
      isSubtasks
        ? item?.subtask_name?.toLowerCase().includes(searchTerm.toLowerCase())
        : item?.task_name?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

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
            <span className={styles.table__title}>Дата завершения</span>
          </th>
          <th className={styles.table__item}>
            <span className={styles.table__title}>Важность</span>
          </th>
        </tr>
      </thead>
      <tbody className={styles.table__body}>
        {searchFilter.map((item) => {
          return (
            <tr
              key={item.id}
              className={styles.table__row}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                isSubtasks
                  ? navigate(`/subtask/${item.id}`)
                  : navigate(`/task/${item.id}`)
              }}
            >
              <td className={styles.table__item}>
                <span className={styles.table__title}>
                  {item.task_name} {item.subtask_name}
                </span>
              </td>
              <td className={styles.table__item}>
                {isSubtasks ? (
                  <span className={styles.table__title}>
                    {' '}
                    {item.members_subtask[0].member.first_name}{' '}
                    {item.members_subtask[0].member.surname}{' '}
                  </span>
                ) : (
                  <span className={styles.table__title}>
                    {' '}
                    {item.members[0].member.first_name}{' '}
                    {item.members[0].member.surname}{' '}
                  </span>
                )}
              </td>
              <td className={styles.table__item}>
                <span className={styles.table__title}>{item.create_date}</span>
              </td>
              <td className={styles.table__item}>
                <span className={styles.table__title}>
                  {item.edit_status_date}
                </span>
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

export default CompletedTaskTable
