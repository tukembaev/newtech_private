import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import styles from './TaskCoWorker.module.scss'

function TaskCoWorker({ dataCoWorker, setCoWorker }) {
  //UseState

  const [isLoading, setIsLoading] = useState(true)
  //Functions
  const animatedComponents = makeAnimated()

  const handleSelect = (dataCoWorker) => {
    setCoWorker(dataCoWorker)
  }
  useEffect(() => {
    if (dataCoWorker[0]?.length !== 0) {
      setIsLoading(false)
    }
  }, [dataCoWorker])
  const memberArray = useSelector((state) => state.project.members)
  return (
    <div className={styles.inline}>
      <div className={styles.task_responsible}>
        <p>Cоисполнитель</p>

        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          isMulti
          options={dataCoWorker[0]}
          onChange={handleSelect}
          isSearchable={true}
          placeholder="Выбрать соисполнителей"
          autosize={true}
          noOptionsMessage={() => 'Поиск не дал результатов'}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default React.memo(TaskCoWorker)
