import { useState } from 'react'

import Select from 'react-select'

import { useEffect } from 'react'
import { getSemesters } from 'service/FlowService'

const FlowSemesterSelect = ({ id, setSemester }) => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  const getData = async () => {
    try {
      let response = await getSemesters(id, data)
      setData(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    if (id !== '') {
      getData()
    }
  }, [id])

  const handleSelect = (dataEmployees) => {
    setSemester(dataEmployees.id)
  }

  useEffect(() => {
    if (data[0]?.length !== 0) {
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
        placeholder="Выбрать семестр"
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
    </div>
  )
}

export default FlowSemesterSelect
