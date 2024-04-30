import cx from 'classnames'
import React, { useState } from 'react'
import { getCurrentDate } from 'utils/todayDateForInput'
import styles from './TaskDeadline.module.scss'
function TaskDeadline({
  setIsAllowChange,
  setisSkipDayOff,
  setIsCheckFinish,
  setIsDeterm,
  setDeadlineDate,
  showChecks,
}) {
  //UseState
  const [isShown, setIsShown] = useState(false)
  const [date, setDate] = useState(null)
  const [Checked1, setChecked1] = useState(false)
  const [Checked2, setChecked2] = useState(false)
  const [Checked3, setChecked3] = useState(false)
  const [Checked4, setChecked4] = useState(false)
  //Functions
  const handleClick = (event) => {
    setIsShown((current) => !current)
  }
  setDeadlineDate(date)
  setIsAllowChange(Checked1)
  setisSkipDayOff(Checked2)
  setIsCheckFinish(Checked3)
  setIsDeterm(Checked4)
  return (
    <div className={styles.task_deadline}>
      <div className={styles.deadline_heading}>
        <p>Крайний срок</p>
        <input
          type="date"
          className={cx(styles.task_whitespace, styles.deadline)}
          onChange={(e) => setDate(e.target.value)}
          min={getCurrentDate()}
        />
        {showChecks === false ? (
          ''
        ) : (
          <span
            className={styles.task_link}
            style={{ borderBottom: '1px dotted grey' }}
            onClick={handleClick}
          >
            Дополнительные параметры
          </span>
        )}
      </div>

      {isShown && (
        <div className={styles.deadline_checkboxes}>
          <div className={styles.checkbox}>
            <input
              id="important"
              type="checkbox"
              value={Checked1}
              onChange={() => setChecked1(!Checked1)}
            />
            <span>Разрешить ответственному менять сроки задачи</span>
          </div>

          <div className={styles.checkbox}>
            <input
              id="important"
              name="title"
              type="checkbox"
              className={styles.title_input_check}
              value={Checked4}
              onChange={() => setChecked4(!Checked4)}
            />
            <span>Сроки определяются сроками подзадач</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(TaskDeadline)
