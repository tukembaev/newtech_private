import React, { useState } from 'react'
import { login, getUserInfo } from 'service/AuthService'
import tokenDecode from 'utils/decode'
import { useParams } from 'react-router-dom'
import { setUser } from 'store/slices/UserSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from './MainPageAuth.module.scss'
function MainPageAuth() {
  const { username, password } = useParams()

  const [userPinCode, setUserPinCode] = useState()
  const [userId, setUserId] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    let response = await login(username, password)
    localStorage.setItem('token', response.data.access)
    const userId = tokenDecode(response.data.refresh)
    let userResponse = await getUserInfo(userId)
    const data = { ...userResponse.data, token: response.data.access }
    setUserId(data.user)
    setUserPinCode(data.pin)
    dispatch(setUser(data))
    setTimeout(() => {
      navigate(`/alerts/${userId}`)
    }, 2000)
  }
  handleSubmit()

  return (
    <div className={styles.bodysss}>
      <div className={styles.loading}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  )
}

export default MainPageAuth
