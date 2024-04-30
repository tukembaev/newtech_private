import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { getMyMembers } from 'service/CollectiveService'
import { setMyMembers } from 'store/slices/CollectiveSlice'
const EmployeeSelectUserId = ({
  selectedEmployee,
  setSelectedEmployeeLabel,
  service,
  isMulti,
}) => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)

  const getData = async () => {
    try {
      let response = await getMyMembers(service ,data)

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
  const confirmedEmployees = myTeam ? [myTeam.confirmed] : []
  const data = [confirmedEmployees.flat().filter((item) => item.flag)]

  const animatedComponents = makeAnimated()
  const handleSelect = (dataEmployees) => {
    isMulti
      ? selectedEmployee(dataEmployees.map((employee) => employee.value))
      : selectedEmployee(dataEmployees.value)
    isMulti
      ? setSelectedEmployeeLabel(
          dataEmployees.map((employee) => employee.label),
        )
      : setSelectedEmployeeLabel(dataEmployees.label)
  }
  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false)
    }
  }, [data])

  return (
    <div style={{ width: '100%', zIndex: 9999 }}>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={data[0]}
        onChange={handleSelect}
        isSearchable={true}
        placeholder="Выбрать сотрудника"
        autosize={true}
        isMulti={isMulti ? true : false}
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
    </div>
  )
}

export default EmployeeSelectUserId
