import React from 'react'
import styles from './ContactsSection.module.scss'
import ContactCard from './components/ContactCard'
import telephone from 'assets/icons/welcomeIcons/telephone.png'
import media from 'assets/icons/welcomeIcons/media.png'
import help from 'assets/icons/welcomeIcons/help.png'

const ContactsSection = () => {
  return (
    <div className={styles.section} id="contacts">
      <div className={styles.top}>
        <h2>Связаться с нами</h2>
        <p>Ваши вопросы, наши ответы. Ждем ваши сообщения</p>
      </div>
      <div className={styles.bottom}>
        <ContactCard
          image={telephone}
          title={'Заказать звонок'}
          text={'Оставьте свой номер, и мы перезвоним вам в удобное время'}
        />
        <ContactCard
          image={help}
          title={'Помощь и Поддержка'}
          text={'Наша команда готова помочь вам 24 по техническим вопросам'}
        />
        <ContactCard
          image={media}
          title={'Медиа'}
          text={'Изучите наши медийные материалы — новости, статьи и видео'}
        />
      </div>
    </div>
  )
}

export default ContactsSection
