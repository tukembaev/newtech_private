import { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import styles from './TaskDirector.module.scss'

function TaskDirector({ dataDirector, setDirector }) {
  const animatedComponents = makeAnimated()
  const [isShown, setIsShown] = useState(false)
  const handleClick = (event) => {
    setIsShown((current) => !current)
  }

  const handleSelect = (dataDirector) => {
    setDirector({ member_id: dataDirector.id, member_type: 'Постановщик' })
  }

  return (
    <div className={styles.task_director}>
      <p onClick={handleClick}>Постановщик</p>
      {isShown && (
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={dataDirector[0]}
          onChange={handleSelect}
          isSearchable={true}
          autosize={true}
        />
      )}
    </div>
  )
}
export default TaskDirector
