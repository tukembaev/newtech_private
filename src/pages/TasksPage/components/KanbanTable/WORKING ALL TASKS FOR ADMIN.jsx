import React, { useEffect, useState } from 'react'
import KanbanTableItem from '../KanbanTableItem/KanbanTableItem'
import { term } from 'constants/kanban'
import styles from './KanbanTable.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from 'service/TaskService'
import { setTasks } from 'store/slices/TaskSlice'
function KanbanTable() {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const getData = async () => {
    try {
      let response = await getTasks(data)

      dispatch(
        setTasks({
          tasks: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  const allTasks = useSelector((state) => state.task)
  const overdue = allTasks.tasks.OVERDUE
  const today = allTasks.tasks.TODAY
  const week = allTasks.tasks.WEEK
  const indefinite = allTasks.tasks.INDEFINITE

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.item__wrapper}>
        <KanbanTableItem
          termTitle="Просроченны"
          termTasks1={overdue ?? []}
          term={term.overdue}
        />
      </div>
      <div className={styles.item__wrapper}>
        <KanbanTableItem
          termTitle="На сегодня"
          termTasks1={today ?? []}
          term={term.today}
        />
      </div>
      <div className={styles.item__wrapper}>
        <KanbanTableItem
          termTitle="На этой неделе"
          termTasks1={week ?? []}
          term={term.week}
        />
      </div>
      <div className={styles.item__wrapper}>
        <KanbanTableItem
          termTitle="Без срока"
          termTasks1={indefinite ?? []}
          term={term.noDeadline}
        />
      </div>
    </div>
  )
}

export default KanbanTable
