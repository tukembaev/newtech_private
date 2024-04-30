import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Select from 'react-select'

import { useEffect } from 'react'
import { getSubjects } from 'service/FlowService'

const FlowSubjectSelect = ({ id, setSubject }) => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      let response = await getSubjects(id, data)

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
    setSubject(dataEmployees.id)
  }

  return (
    <div style={{ maxWidth: '400px' }}>
      <Select
        closeMenuOnSelect={true}
        options={data}
        onChange={handleSelect}
        isSearchable={true}
        autosize={true}
        placeholder="Выбрать предмет"
        noOptionsMessage={() => 'Поиск не дал результатов'}
      />
    </div>
  )
}

export default FlowSubjectSelect
