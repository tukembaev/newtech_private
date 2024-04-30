import { useState } from 'react'
import styles from './TaskResult.module.scss'

function TaskResult({ setIsReportFinish }) {
  //UseState
  const [Checked1, setChecked1] = useState(false)
  //Functions
  setIsReportFinish(Checked1)

  return (
    <div className={styles.task_result}>
      <p>Результат задачи</p>
      <div>
        <input
          id="important"
          name="title"
          type="checkbox"
          checked={Checked1}
          onChange={() => setChecked1(!Checked1)}
        />
        <span>Обязательный отчет при завершении задачи</span>
      </div>
    </div>
  )
}
export default TaskResult
