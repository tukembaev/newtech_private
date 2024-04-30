import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from 'service/AuthService'
import { setUserInfo } from 'store/slices/UserSlice'
import userInfo from './userInfo'
const DynamicUserInfo = ({ idEmployee, getDynamic }) => {
  const user = userInfo()
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  const getUserDynamicInfo = async () => {
    let response = await getUserInfo(
      idEmployee === undefined ? user?.userId : idEmployee,
    )

    dispatch(
      setUserInfo({
        userInfo: response.data,
      }),
    )
  }
  useEffect(() => {
    getUserDynamicInfo()
  }, [idEmployee])

  const dynamicUserInfo = useSelector((state) => state.user)
  useEffect(() => {
    getDynamic(dynamicUserInfo.userInfo)
  })

  return <></>
}

export default DynamicUserInfo
