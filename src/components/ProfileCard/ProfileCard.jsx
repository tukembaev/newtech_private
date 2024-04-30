import React, { useEffect } from 'react'
import styles from './ProfileCard.module.scss'
import { useState } from 'react'
import { getUserInfo } from 'service/AuthService'
import { ScaleLoader } from 'react-spinners'

function ProfileCard({ userId }) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const getUserDynamicInfo = async () => {
    try {
      let response = await getUserInfo(userId)
      setData(response.data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserDynamicInfo()
  }, [])

  const [isExpanded, setIsExpanded] = useState(false)

  const handleClickImg = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={styles.profile_wrapper}>
      <div className={styles.both_side}>
        <div className={styles.left_side}>
          <div className={styles.info_heading}>
            {/* <div className={styles.profile_status}>
                <div className={styles.dot}></div>
                <p>В сети</p>
              </div> */}
            <div className={styles.avatar}>
              <div className={styles.avatar_img}>
                <img
                  src={data?.imeag}
                  alt="avatar"
                  onClick={handleClickImg}
                  style={{ cursor: 'pointer' }}
                />{' '}
              </div>
              {isExpanded && (
                <div className={styles.avatar_img2} onClick={handleClickImg}>
                  <img
                    src={data?.imeag}
                    alt="Expanded Avatar"
                    style={{
                      cursor: 'pointer',
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 9999,
                      maxWidth: '380px',
                      maxHeight: '380px',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.right_side}>
          <div className={styles.profile_right_info}>
            <div className={styles.info}>
              <div className={styles.avatar2}>
                <img src={data?.imeag} alt="" className={styles.image__cover} />
              </div>
            </div>
            <div className={styles.info}>
              <p
                style={{
                  fontSize: '16px',
                  width: '150px',
                  borderBottom: '1px solid grey',
                }}
              >
                {data?.first_name} {data?.surname}
              </p>
            </div>
            <div className={styles.info}>
              <span>Контактный Email</span>

              {data?.email === null ? (
                <p style={{ fontSize: '14px' }}>Не указано</p>
              ) : (
                <a href="mailto:{user.email}"> {data?.email} </a>
              )}
            </div>
            <div className={styles.info4}>
              <span>Номер</span>
              <p>
                {data?.number_phone === null || data?.number_phone === ''
                  ? 'Не указано'
                  : data?.number_phone}
              </p>
            </div>
            <div className={styles.info}>
              {data.user_type === 'S' ? (
                <span>Группа</span>
              ) : (
                <span>Должность</span>
              )}
              <p style={{ fontSize: '14px' }}>
                {data?.position === null || data?.position === ''
                  ? 'Не указано'
                  : data?.position}
              </p>
            </div>
            <div className={styles.info4}>
              {data.user_type === 'S' ? (
                <span>Направление</span>
              ) : (
                <span>Подразделение</span>
              )}

              <p>
                {data?.division === null || data?.division === ''
                  ? 'Не указано'
                  : data?.division}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
