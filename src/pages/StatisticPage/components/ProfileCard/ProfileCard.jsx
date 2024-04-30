import React, { useEffect, useState } from 'react'
import styles from './ProfileCard.module.scss'
import userInfo from 'utils/userInfo'
import DynamicUserInfo from 'utils/DynamicUserInfo'
import SearchByDivision from './components/SearchByDivision'
import EmployeeSelectUserId from 'hooks/EmployeeSelect/EmployeeSelectUserId'

const ProfileCard = ({ isAdmin, division, setSelectedEmp }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [currentDynamicUser, getDynamic] = useState()

  useEffect(() => {
    setSelectedEmp(selectedEmployee)
  }, [selectedEmployee])
  const user = userInfo()

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '370px' }}
    >
      {isAdmin ? (
        <div style={{ marginTop: '15px' }}>
          <h3 style={{ color: 'white' }}>
            Посмотреть статистику всех сотрудников
          </h3>
          <EmployeeSelectUserId
            selectedEmployee={setSelectedEmployee}
            service={'project'}
            isMulti={false}
          />
        </div>
      ) : (
        <div style={{ marginTop: '15px' }}>
          <h3 style={{ color: 'white' }}>{division} </h3>
          <SearchByDivision selectedEmployee={setSelectedEmployee} />
        </div>
      )}

      <div className={styles.profile_card_wrapper}>
        <img src={currentDynamicUser?.imeag} alt="" />
        <h3>
          {currentDynamicUser?.surname} {currentDynamicUser?.first_name}
        </h3>
        <span>{currentDynamicUser?.position}</span>
        <p>
          Номер телефона:{' '}
          {currentDynamicUser?.numberPhone === ''
            ? 'Не указан'
            : currentDynamicUser?.numberPhone}
        </p>
        <p className={styles.email}>
          E-mail адрес:
          {currentDynamicUser?.email === null
            ? 'Не указан'
            : currentDynamicUser?.email}
        </p>
        <DynamicUserInfo
          idEmployee={
            selectedEmployee === null ? user.userId : selectedEmployee
          }
          getDynamic={getDynamic}
        />
      </div>
    </div>
  )
}

export default ProfileCard
