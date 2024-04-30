import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Select from 'react-select'

import { useEffect } from 'react'
import { getDirections } from 'service/FlowService.js'

const FlowDirectionSelect = ({ setDirection }) => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      let response = await getDirections(data)

      setData(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSelect = (dataEmployees) => {
    setDirection(dataEmployees.id)
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
        placeholder="Выбрать направление"
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
    </div>
  )
}

export default FlowDirectionSelect
