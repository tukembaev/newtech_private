import React from 'react'
import styles from './EnterToSystemSection.module.scss'
import { Button } from 'components'
import userInfo from 'utils/userInfo'
import { useNavigate } from 'react-router-dom'
import welcomeImgEnter from 'assets/img/welcomeImgs/welcomeImgEnter.png'

const EnterToSystemSection = () => {
  const user = userInfo()
  const navigate = useNavigate()
  return (
    <div className={styles.section} id="enter">
      <div className={styles.left_side}>
        <span>Автоматизация ваших рабочих процессов</span>
        <h1>Система для вас и вашего Бизнеса </h1>
        <p>
          Управление документами и проектами стало проще. Мы предлагаем
          современные решения для автоматизации, безопасности и надежной
          поддержки
        </p>
        <div style={{ widht: '250px' }}>
          {user?.userId ? (
            <Button
              className="purple__welcome_btn"
              onClick={() => navigate(`/alerts/${user?.userId}`)}
            >
              Перейти
            </Button>
          ) : (
            <Button
              onClick={() => navigate(`/unet`)}
              className="purple__welcome_btn"
            >
              Войти
            </Button>
          )}
        </div>
      </div>
      <div className={styles.right_side}>
        <img src={welcomeImgEnter} alt="" />
      </div>
    </div>
  )
}

export default EnterToSystemSection
