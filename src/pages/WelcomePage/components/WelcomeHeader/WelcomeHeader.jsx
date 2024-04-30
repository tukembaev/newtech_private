import React from 'react'
import styles from './WelcomeHeader.module.scss'
import { Button } from 'components'
import userInfo from 'utils/userInfo'
import { useNavigate } from 'react-router-dom'
import unet from 'assets/img/UNET2.png'
const WelcomeHeader = () => {
  const user = userInfo()
  const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      <img src={unet} className={styles.logo} alt="" />
      <div className={styles.navbar}>
        <a href="#aboutUs">О нас</a>
        <a href="#services">Наши сервисы</a>
        <a href="#contacts">Контакты</a>
        <a href="#tariffs">Тарифы</a>
      </div>
      <div className={styles.enter_buttons}>
        {user?.userId ? (
          <Button
            className="purple__welcome_btn"
            onClick={() => navigate(`/alerts/${user?.userId}`)}
          >
            Перейти
          </Button>
        ) : (
          <Button
            className="purple__welcome_btn"
            onClick={() => navigate(`/unet`)}
          >
            Войти
          </Button>
        )}
      </div>
    </div>
  )
}

export default WelcomeHeader
