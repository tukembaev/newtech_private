import React from 'react'
import styles from './WelcomeFooter.module.scss'
import unet from 'assets/img/UNET2.png'
const WelcomeFooter = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list_of_links}>
        <img src={unet} alt="" />
        <a href="#aboutus">О нас</a>
        <a href="#">Вакансии</a>
        <a href="#reviews">Отзывы</a>
      </div>
      <div className={styles.list_of_links}>
        <h4>Помощь</h4>
        <a href="#help">Служба поддержки</a>
        <a href="#">Условия использования</a>
        <a href="#">Политика конфиденциальности</a>
      </div>
      <div className={styles.list_of_links}>
        <h4>Ссылки</h4>
        <a href="#contacts">Контакты</a>
        <a href="#features">Услуги</a>
        <a href="#tariff">Тарифы</a>
      </div>
      <div className={styles.list_of_links}>
        <h4>Ресурсы</h4>
        <a href="#">Пробный период</a>
        <a href="#">Руководство регистрации</a>
        <a href="#">Возврат и обмен</a>
      </div>
    </div>
  )
}

export default WelcomeFooter
