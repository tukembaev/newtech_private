import React, { useEffect, useState } from 'react'
import styles from './StatisticPage.module.scss'
import { Button, Layout } from 'components'
import AllDataPercentage from './components/AllDataPercentage/AllDataPercentage'

import PieChartsLine from './components/PieChartsLine/PieChartsLine'
import DocumentStatusCards from './components/DocumentStatusCards/DocumentStatusCards'

import { useDispatch, useSelector } from 'react-redux'
import { getAllStatisticCompany } from 'service/StatisticService'
import { setAllStatistic } from 'store/slices/StatisticSlice'
import { useNavigate } from 'react-router-dom'
import userInfo from 'utils/userInfo'

const AllStatisticPage = () => {
  const [data, setData] = useState()
  const dispatch = useDispatch()
  const user = userInfo()
  const [selectedEmp, setSelectedEmp] = useState(user.userId)

  const getData = async () => {
    try {
      let response = await getAllStatisticCompany(selectedEmp, data)

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
  const navigate = useNavigate('/all-statistic')

  return (
    <Layout>
      <div className={styles.statistic_wrapper}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: 'white', paddingBottom: '15px' }}>
            Статистика компании
          </h1>
          <Button className={styles.btn_pin} onClick={() => navigate(-1)}>
            Назад
          </Button>
        </div>
        <div className={styles.statistic_blured_block}>
          <div className={styles.block_top_section}>
            <AllDataPercentage data={statisticDatas.AllDataPercentage} />
            <PieChartsLine data={statisticDatas.PieChartsLine} />
          </div>
          <div className={styles.block_bottom_section}>
            <DocumentStatusCards
              is_all_statistic={true}
              dataLastActions={statisticDatas.LastActionCard}
              data={statisticDatas.DocumentStatusCards}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AllStatisticPage
