import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const EmployeeStatusSelect = ({ setSelectedStatus, isMulti }) => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)

  const data = [
    {
      id: 4,
      label: 'Все',

      value: 4,
    },
    {
      id: 1,
      label: 'Ждет выполнения',

      value: 1,
    },
    {
      id: 2,
      label: 'В процессе выполнения',
      value: 2,
    },
    {
      id: 3,
      label: 'Завершенные',

      value: 3,
    },
  ]
  const animatedComponents = makeAnimated()
  // const handleSelect = (dataEmployees) => {
  //   setSelectedStatus(dataEmployees.label);
  // };
  // const handleSelect = (dataEmployees) => {
  //   isMulti ? setSelectedStatus(dataEmployees.label) :    setSelectedStatus(dataEmployees.label);
  // };
  const handleSelect = (dataEmployees) => {
    setSelectedStatus(dataEmployees.label)
  }
  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false)
    }
  }, [data])

  return (
    <div style={{ width: '100%', zIndex: '9995' }}>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={data}
        onChange={handleSelect}
        isSearchable={true}
        placeholder="Выбрать статус"
        autosize={true}
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
    </div>
  )
}

export default EmployeeStatusSelect
