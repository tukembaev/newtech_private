import { useState } from 'react'

import Select from 'react-select'

import { useEffect } from 'react'

import { getGroups } from 'service/DisciplineService'

const StudentGroupSelect = ({ id, setGroup }) => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)

  const getData = async () => {
    try {
      let response = await getGroups(id, data)
      setData(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [id])

  const handleSelect = (dataEmployees) => {
    setGroup(dataEmployees.value)
  }

  useEffect(() => {
    if (data?.length !== 0) {
      setLoading(false)
    }
  }, [data])
  return (
    <div style={{ maxWidth: '400px' }}>
      <Select
        closeMenuOnSelect={true}
        options={data}
        onChange={handleSelect}
        isSearchable={true}
        autosize={true}
        placeholder="Выбрать группу"
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
    </div>
  )
}

export default StudentGroupSelect
