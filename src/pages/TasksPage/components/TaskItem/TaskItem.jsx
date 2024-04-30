import React from 'react'
import { useNavigate } from 'react-router-dom'
import tree from 'assets/icons/tree.png'
import styles from './TaskItem.module.scss'
function TaskItem({ task, isSubtasks }) {
  const navigate = useNavigate()
  return (
    <div
      className={styles.wrapper}
      style={
        task.is_critical
          ? { background: 'rgb(155 4 4 / 98%)', borderRadius: '11px' }
          : {}
      }
    >
      <div className={styles.task_wrapper_flex}>
        <div className={styles.task__wrapper}>
          <div className={styles.task__line}></div>

          <div className={styles.task_header}>
            <div className={styles.task_column}>
              <p
                className={styles.task__link}
                onClick={() => {
                  isSubtasks
                    ? navigate(`/subtask/${task.id}`)
                    : navigate(`/task/${task.id}`)
                }}
              >
                {isSubtasks ? task.subtask_name : task.task_name}
              </p>
              <span
                onClick={() => {
                  isSubtasks
                    ? navigate(`/subtask/${task.id}`)
                    : navigate(`/task/${task.id}`)
                }}
                style={{ color: 'white' }}
              >
                {task &&
                  task.members_subtask &&
                  task.members_subtask[0]?.member &&
                  `${task.members_subtask[0].member.first_name} ${task.members_subtask[0].member.surname} `}
                {task &&
                  task.members &&
                  task.members[0]?.member &&
                  `${task.members[0].member.first_name} ${task.members[0].member.surname}`}
              </span>
            </div>
            <img
              title="Дерево задачи"
              className={styles.size}
              src={tree}
              onClick={() => {
                navigate(`/task-tree/${task.id}`, {
                  state: { isSubtasks: isSubtasks },
                })
              }}
              alt=""
            />
          </div>

          <div>
            <p
              className={styles.task__term3}
              onClick={() => {
                isSubtasks
                  ? navigate(`/subtask/${task.id}`)
                  : navigate(`/task/${task.id}`)
              }}
            >
              {task.status}{' '}
              {task.status === 'Завершена' ? (
                <span> {task.edit_status_date}</span>
              ) : (
                ''
              )}{' '}
            </p>
          </div>

          <div className={styles.dates}>
            <div>
              {task.deadline_date === null ? (
                <p
                  className={styles.task__term2}
                  onClick={() => {
                    isSubtasks
                      ? navigate(`/subtask/${task.id}`)
                      : navigate(`/task/${task.id}`)
                  }}
                >
                  Дэдлайн: Бессрочная{' '}
                </p>
              ) : (
                <p
                  className={styles.task__term2}
                  onClick={() => {
                    isSubtasks
                      ? navigate(`/subtask/${task.id}`)
                      : navigate(`/task/${task.id}`)
                  }}
                >
                  {' '}
                  {`Дэдлайн ${task.deadline_date}`}{' '}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
