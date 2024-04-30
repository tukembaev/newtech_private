import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { useEffect } from 'react'
import { getStatistic } from 'service/StatisticService'
import { setStatisticUserId } from 'store/slices/StatisticSlice'

const SearchByDivision = ({ selectedEmployee }) => {
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      let response = await getStatistic(data)

      dispatch(
        setStatisticUserId({
          empUserId: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  const employee = useSelector((state) => state.statistic.empUserId)

  const data = [employee]
  const handleSelect = (dataEmployees) => {
    selectedEmployee(dataEmployees.id)
  }

  return (
    <div style={{ maxWidth: '400px' }}>
      <Select
        closeMenuOnSelect={true}
        options={data[0]}
        onChange={handleSelect}
        isSearchable={true}
        autosize={true}
        placeholder="Выбрать сотрудника"
      />
    </div>
  )
}

export default SearchByDivision
