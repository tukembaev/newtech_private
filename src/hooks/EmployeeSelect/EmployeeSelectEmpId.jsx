import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { getMyMembers } from 'service/CollectiveService'
import { setMyMembers } from 'store/slices/CollectiveSlice'

const EmployeeSelectUserId = ({ selectedEmployee, isMulti }) => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)

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

  const data = [[myTeam?.confirmed].flat().filter((item) => item.flag)]
  const animatedComponents = makeAnimated()
  const handleSelect = (dataEmployees) => {
    isMulti
      ? selectedEmployee(dataEmployees)
      : selectedEmployee(dataEmployees.id)
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
        components={animatedComponents}
        options={data[0]}
        onChange={handleSelect}
        isSearchable={true}
        placeholder="Выбрать сотрудника"
        autosize={true}
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
        isMulti={isMulti ? true : false}
      />
    </div>
  )
}

export default EmployeeSelectUserId
