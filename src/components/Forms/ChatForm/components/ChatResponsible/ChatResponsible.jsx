import { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import styles from './ChatResponsible.module.scss'

function ChatResponsible({ isMilti, dataResponsible, setResponsible }) {
  //UseState
  const [isShown, setIsShown] = useState(false)
  const [isLoading, setLoading] = useState(true)
  //Functions
  const animatedComponents = makeAnimated()

  const handleClick = (event) => {
    setIsShown((current) => !current)
  }

  const handleSelect = (dataResponsible) => {
    setResponsible(dataResponsible)
  }
  useEffect(() => {
    if (dataResponsible[0].length !== 0) {
      setLoading(false)
    }
  }, [dataResponsible])
  return (
    <div className={styles.inline}>
      {isMilti === true ? (
        <div className={styles.task_responsible}>
          <p onClick={handleClick}>
            Ответственный <br />
            (обязательное поле)
          </p>
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={dataResponsible[0]}
            isMulti
            onChange={handleSelect}
            autosize={true}
            isSearchable={true}
            placeholder="Выбрать ответственного"
            required={true}
            noOptionsMessage={() => 'Поиск не дал результатов'}
            isLoading={isLoading}
          />{' '}
        </div>
      ) : (
        <div className={styles.task_responsible}>
          <p onClick={handleClick}>
            Ответственный <br />
            (обязательное поле)
          </p>
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={dataResponsible[0]}
            onChange={handleSelect}
            autosize={true}
            isSearchable={true}
            placeholder="Выбрать ответственного"
            required={true}
            noOptionsMessage={() => 'Поиск не дал результатов'}
            isLoading={isLoading}
          />{' '}
        </div>
      )}
    </div>
  )
}
export default ChatResponsible
