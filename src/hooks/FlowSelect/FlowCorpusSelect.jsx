import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Select from 'react-select'

import { useEffect } from 'react'
import { getCorpuses } from 'service/FlowService'

const FlowCorpusSelect = ({ setCoprus }) => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      let response = await getCorpuses(data)
      setData(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSelect = (dataEmployees) => {
    setCoprus(dataEmployees)
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
        placeholder="Выбрать корпус"
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
    </div>
  )
}

export default FlowCorpusSelect
