import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import Select from 'react-select'
import { getMyMembers } from 'service/CollectiveService'
import { setMyMembers } from 'store/slices/CollectiveSlice'

const EmployeeSelect = ({ selectedEmployee }) => {
  const [isLoading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      let response = await getMyMembers(data)

      dispatch(
        setMyMembers({
          members: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const myTeam = useSelector((state) => state.collective.members)

  const data = [myTeam?.confirmed]
  const handleSelect = (dataEmployees) => {
    selectedEmployee(dataEmployees.value)
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
        options={data[0]}
        onChange={handleSelect}
        isSearchable={true}
        autosize={true}
        placeholder="Выбрать сотрудника"
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
    </div>
  )
}

export default EmployeeSelect
