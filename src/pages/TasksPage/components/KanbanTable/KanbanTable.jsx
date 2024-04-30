import React from 'react'
import { term } from 'constants/kanban'
import KanbanTableItem from '../KanbanTableItem/KanbanTableItem'
import styles from './KanbanTable.module.scss'
function KanbanTable({
  allTasks,
  isSubtasks,
  loading,
  searchTerm,
  SearchByTitle,
}) {
  let testObj = [
    {
      taskTitle: 'Построить дом',
      taskTerm: new Date().getDate(),
      producer: 'Бакытов Данияр',
      responsible: 'Сманов Мадияр',
    },
  ]

  let testObj2 = [
    {
      taskTitle: 'Построить дом',
      taskTerm: new Date().getDate(),
      producer: 'Ариф тукембаве',
      responsible: 'Сманов Мадияр',
    },
  ]

  let overdue, today, week, indefinite, mounth, longrange

  const filterTasks = (tasks, searchTerm) =>
    tasks
      ? tasks.filter((item) =>
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
      : []

  const filterTasksByTitle = (tasks, searchTerm) =>
    tasks
      ? tasks.filter((item) =>
          isSubtasks
            ? item?.subtask_name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
            : item?.task_name?.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : []

  if (SearchByTitle === true) {
    overdue = filterTasksByTitle(allTasks?.OVERDUE, searchTerm)
    today = filterTasksByTitle(allTasks?.TODAY, searchTerm)
    week = filterTasksByTitle(allTasks?.WEEK, searchTerm)
    indefinite = filterTasksByTitle(allTasks?.INDEFINITE, searchTerm)
    mounth = filterTasksByTitle(allTasks?.MONTH, searchTerm)
    longrange = filterTasksByTitle(allTasks?.LONGRANGE, searchTerm)
  } else {
    overdue = filterTasks(allTasks?.OVERDUE, searchTerm)
    today = filterTasks(allTasks?.TODAY, searchTerm)
    week = filterTasks(allTasks?.WEEK, searchTerm)
    indefinite = filterTasks(allTasks?.INDEFINITE, searchTerm)
    mounth = filterTasks(allTasks?.MONTH, searchTerm)
    longrange = filterTasks(allTasks?.LONGRANGE, searchTerm)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.item__wrapper}>
        <KanbanTableItem
          termTitle="Просроченные"
          termTasks1={overdue ?? []}
          taskCount={overdue?.length}
          term={term.overdue}
          isSubtasks={isSubtasks}
          loading={loading}
          skeleton_number={4}
        />
      </div>
      <div className={styles.item__wrapper}>
        <KanbanTableItem
          termTitle="На сегодня"
          termTasks1={today ?? []}
          taskCount={today?.length}
          term={term.today}
          isSubtasks={isSubtasks}
          loading={loading}
          skeleton_number={2}
        />
      </div>
      <div className={styles.item__wrapper}>
        <KanbanTableItem
          termTitle="На этой неделе"
          termTasks1={week ?? []}
          taskCount={week?.length}
          term={term.week}
          isSubtasks={isSubtasks}
          loading={loading}
          skeleton_number={3}
        />
      </div>
      <div className={styles.item__wrapper}>
        <KanbanTableItem
          termTitle="На этот месяц"
          termTasks1={mounth ?? []}
          taskCount={mounth?.length}
          term={term.mounth}
          isSubtasks={isSubtasks}
          loading={loading}
          skeleton_number={4}
        />
      </div>
      <div className={styles.item__wrapper}>
        <KanbanTableItem
          termTitle="Позже этого месяца"
          termTasks1={longrange ?? []}
          taskCount={longrange?.length}
          term={term.longrange}
          isSubtasks={isSubtasks}
          loading={loading}
          skeleton_number={3}
        />
      </div>
      <div className={styles.item__wrapper}>
        <KanbanTableItem
          termTitle="Без срока"
          termTasks1={indefinite ?? []}
          taskCount={indefinite?.length}
          term={term.noDeadline}
          isSubtasks={isSubtasks}
          loading={loading}
          skeleton_number={5}
        />
      </div>
    </div>
  )
}

export default React.memo(KanbanTable)
