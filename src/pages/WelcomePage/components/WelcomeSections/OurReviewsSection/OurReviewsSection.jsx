import React from 'react'
import styles from './OurReviewsSection.module.scss'
import ReviewCard from './components/ReviewCard'
import user1 from 'assets/img/welcomeImgs/user1.png'
import user2 from 'assets/img/welcomeImgs/user2.png'
import user3 from 'assets/img/welcomeImgs/user3.png'

const OurReviewsSection = () => {
  const reviews = [
    {
      text: 'UNET — наш выбор для максимальной эффективности. Проекты, задачи, коммуникация — все интегрировано. Сэкономили время и ресурсы',
      user: {
        avatar: user1,
        name: 'Антон Михайлов',
        company: 'Руководитель проектов, DigitalSolutions',
      },
    },
    {
      text: 'UNET — эффективное решение для управления проектами. Простота, надежность и интеграция в одном — наше открытие',
      user: {
        avatar: user3,
        name: 'Дженни Джеймс',
        company: 'Генеральный директор, InnovateTech',
      },
    },
    {
      text: 'Выбрали UNET — не пожалели. Управление документами, задачами и коммуникация — все в одном месте. Процессы стали проще и быстрее',
      user: {
        avatar: user2,
        name: 'Михаил Ирвинг',
        company: 'Директор по IT, TechSolutions',
      },
    },
  ]
  return (
    <div className={styles.section} id="reviews">
      <div className={styles.top}>
        <h2>Что говорят наши довольные клиенты о UNET</h2>
        <p>
          Узнайте, как система UNET стала ключевым элементом успеха для
          компаний, обеспечивая им эффективность, надежность и инновационные
          решения
        </p>
      </div>

      <div className={styles.reviewer}>
        <ReviewCard reviews={reviews} />
      </div>
    </div>
  )
}

export default OurReviewsSection
