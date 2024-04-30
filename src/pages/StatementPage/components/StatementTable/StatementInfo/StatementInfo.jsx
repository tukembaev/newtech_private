import { Layout } from 'components/index'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getRaportData } from 'service/StatementsService'
import { setStatementById } from 'store/slices/StatementsSlice'
import SimpleRaports from './components/SimpleRaports/SimpleRaports'

import userInfo from 'utils/userInfo'

const StatementInfo = () => {
  const [data, setData] = useState([])
  const [render, setRender] = useState(false)
  const dispatch = useDispatch()
  const user = userInfo()
  const { id } = useParams()
  const location = useLocation()
  const getData = async () => {
    try {
      let response = await getRaportData(id, data)
      dispatch(
        setStatementById({
          statementId: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    getData()
    setRender(false)
  }, [render, location.pathname])

  const items = useSelector((state) => state.statement)
  const simpleinfo = items.statementId

  return (
    <Layout>
      <SimpleRaports info={simpleinfo} setRender={setRender} />
    </Layout>
  )
}

export default StatementInfo
