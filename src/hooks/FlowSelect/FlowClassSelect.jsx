import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Select from 'react-select'

import { useEffect } from 'react'
import { getCorpusesClasses } from 'service/FlowService'

const FlowClassSelect = ({ id, setClass }) => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      let response = await getCorpusesClasses(id, data)
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
    setClass(dataEmployees)
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
        placeholder="Выбрать аудиторию"
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
    </div>
  )
}

export default FlowClassSelect
