import React, { useState } from 'react'
import styles from './KanbanTableItem.module.scss'
import cx from 'classnames'
import TaskItem from '../TaskItem/TaskItem'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function KanbanTableItem({
  termTitle,
  term,
  loading,
  skeleton_number,
  taskCount,
  termTasks1,
  isSubtasks,
}) {
  const [loadMore, setLoadMore] = useState({
    currentTaskState: 5,
  })

  let renderContent
  if (loading) {
    renderContent = (
      <div className={styles.skeletonWrapper}>
        {Array.from({ length: skeleton_number }).map((_, index) => (
          <div
            style={{
              height: '120px',
              background: '#ffffff12',
              margin: '10px 8px',
              borderRadius: '6px',
              padding: '10px 12px 0 12px',
              width: '96%',
            }}
            key={index}
          >
            {[1, 2, 3, 4].map((cell) => (
              <Skeleton duration={0.8} key={cell} />
            ))}
          </div>
        ))}
      </div>
    )
  } else {
    const renderTask = termTasks1?.slice(0, loadMore.currentTaskState)
    renderContent = (
      <div className={styles.termBlock}>
        {[...renderTask].map((task) => (
          <TaskItem key={task.id} task={task} isSubtasks={isSubtasks} />
        ))}
        {renderTask.length >= 3 && taskCount !== renderTask.length ? (
          <div className={styles.showMore}>
            <span
              onClick={() =>
                setLoadMore({ currentTaskState: loadMore.currentTaskState + 3 })
              }
            >
              {' '}
              Загрузить еще ({taskCount - renderTask.length}){' '}
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={cx(
          styles.termTitle,
          term == 'overdue'
            ? styles.overdue
            : term == 'today'
              ? styles.today
              : term == 'week'
                ? styles.week
                : term == 'mounth'
                  ? styles.mounth
                  : term == 'longrange'
                    ? styles.longrange
                    : term == 'noDeadline'
                      ? styles.no__deadline
                      : '',
        )}
      >
        {termTitle}
      </div>
      <div
        className={cx(
          styles.termBlock,
          term == 'overdue'
            ? styles.overdue__item
            : term == 'today'
              ? styles.today__item
              : term == 'week'
                ? styles.week__item
                : term == 'mounth'
                  ? styles.mounth__item
                  : term == 'longrange'
                    ? styles.longrange__item
                    : term == 'noDeadline'
                      ? styles.no__deadline__item
                      : '',
        )}
      >
        {loading ? (
          <SkeletonTheme
            baseColor="#ffffff12"
            highlightColor="#ffffff10"
            borderRadius="6px"
            height="8px"
            direction="unset"
            duration={0}
          >
            {renderContent}
          </SkeletonTheme>
        ) : (
          renderContent
        )}
      </div>
    </div>
  )
}

export default React.memo(KanbanTableItem)
