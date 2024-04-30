import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { getEmployee } from 'service/TaskService'
import { setEmployee } from 'store/slices/TaskSlice'

const EmployeeSelectAllUserId = ({ selectedEmployee, placehold, isMulti }) => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)

  const getData = async () => {
    try {
      let response = await getEmployee(data)

      dispatch(
        setEmployee({
          employee: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  const employee = useSelector((state) => state.task)

  //Consts & Let
  const data = [employee.employee]
  const animatedComponents = makeAnimated()
  const handleSelect = (dataEmployees) => {
    isMulti
      ? selectedEmployee(dataEmployees)
      : selectedEmployee(dataEmployees.user_id)
  }
  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false)
    }
  }, [data])

  return (
    <div>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={data[0]}
        onChange={handleSelect}
        isSearchable={true}
        placeholder={
          placehold !== undefined ? placehold : 'Выберите сотрудника'
        }
        autosize={true}
        noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
        isMulti={isMulti ? true : false}
      />
    </div>
  )
}

export default EmployeeSelectAllUserId
