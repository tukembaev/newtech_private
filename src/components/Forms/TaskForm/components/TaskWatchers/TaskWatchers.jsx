import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import styles2 from './TaskAddChat.module.scss'
import styles from './TaskWatchers.module.scss'

function TaskWatchers({ dataWatchers, setWatchers, isForChat }) {
  const animatedComponents = makeAnimated()
  const [isShown, setIsShown] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const handleClick = (event) => {
    setIsShown((current) => !current)
  }

  const handleSelect = (dataWatchers) => {
    setWatchers(dataWatchers)
  }
  useEffect(() => {
    if (dataWatchers[0]?.length !== 0) {
      setIsLoading(false)
    }
  }, [dataWatchers])
  const memberArray = useSelector((state) => state.project.members)
  return (
    <div className={isForChat ? styles2.inline : styles.inline}>
      {isForChat === true ? (
        <div
          className={isForChat ? styles2.task_watchers : styles.task_watchers}
        >
          <p onClick={handleClick}>Выбрать</p>

          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={memberArray.length === 0 ? dataWatchers[0] : memberArray}
            onChange={handleSelect}
            isSearchable={true}
            autosize={true}
            placeholder="Открыть список"
            noOptionsMessage={() => 'Поиск не дал результатов'}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className={styles.task_watchers}>
          <p onClick={handleClick}>Наблюдатель</p>

          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            isMulti
            options={dataWatchers[0]}
            onChange={handleSelect}
            isSearchable={true}
            autosize={true}
            placeholder="Выбрать наблюдателей"
            noOptionsMessage={() => 'Поиск не дал результатов'}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  )
}
export default React.memo(TaskWatchers)
