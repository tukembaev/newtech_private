import React, { useEffect, useState } from 'react'
import styles from './StatisticPage.module.scss'
import { Layout } from 'components'

import { useDispatch, useSelector } from 'react-redux'
import { getAllStatistic } from 'service/StatisticService'
import { setAllStatistic } from 'store/slices/StatisticSlice'
import { useNavigate } from 'react-router-dom'
import userInfo from 'utils/userInfo'
import HeaderCards from './components/HeaderCards/HeaderCards'
import ProfileStatistic from './components/ProfileStatistic/ProfileStatistic'
import HistoryCard from './components/HistoryCard/HistoryCard'
import EmployeeSelectUserId from 'hooks/EmployeeSelect/EmployeeSelectUserId'
import SearchByDivision from './components/ProfileCard/components/SearchByDivision'

const StatisticPage = () => {
  const [data, setData] = useState()
  const dispatch = useDispatch()
  const user = userInfo()
  const [selectedEmp, setSelectedEmp] = useState(user.userId)
  const [selectedEmployeeLabel, setSelectedEmployeeLabel] = useState([])
  const getData = async () => {
    try {
      let response = await getAllStatistic(selectedEmp, data)

      dispatch(
        setAllStatistic({
          allStatistic: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    getData()
  }, [selectedEmp])
  const statisticDatas = useSelector((state) => state.statistic.allStatistic)
  const navigate = useNavigate()

  return (
    <Layout>
      <div className={styles.statistic_wrapper}>
        {user.is_admin_of ? (
          <div style={{ marginBottom: '15px', float: 'right' }}>
            <h3 style={{ color: 'black' }}>
              Посмотреть статистику всех сотрудников
            </h3>
            <EmployeeSelectUserId
              selectedEmployee={setSelectedEmp}
              setSelectedEmployeeLabel = {setSelectedEmployeeLabel}
              service={'task'}
              isMulti={false}
            />
          </div>
        ) : (
          <div style={{ marginBottom: '15px', float: 'right' }}>
            <h3>{user.division}</h3>
            <SearchByDivision selectedEmployee={setSelectedEmp} />
          </div>
        )}
        <div className={styles.statistic_blured_block}>
          <div className={styles.block_top_section}>
            <HeaderCards
              data={statisticDatas.ProfileCards}
              isUser={selectedEmp === user.userId ? true : false}
            />
          </div>
          <div className={styles.block_bottom_section}>
            <ProfileStatistic data={statisticDatas?.ProfileStatistic} />
          </div>
          <div className={styles.block_bottom_section}>
            <HistoryCard data={statisticDatas.LastActionCard} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StatisticPage
