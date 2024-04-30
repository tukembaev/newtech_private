import React from 'react'
import styles from './OurServicesSection.module.scss'
import ServiceCard from './components/ServiceCard'
import project from 'assets/icons/welcomeIcons/project.png'
import calendar from 'assets/icons/welcomeIcons/calendar.png'
import task from 'assets/icons/welcomeIcons/task.png'
import statistic from 'assets/icons/welcomeIcons/statistic.png'
import messenger from 'assets/icons/welcomeIcons/messenger.png'
import document from 'assets/icons/welcomeIcons/document.png'

const OurServicesSection = () => {
  return (
    <section className={styles.section} id="services">
      <div className={styles.top}>
        <h2>Наши Услуги</h2>
        <p>
          В мире постоянных изменений мы предоставляем не просто услуги, а
          надежные решения для вашего бизнеса
        </p>
      </div>
      <div className={styles.bottom}>
        <ServiceCard
          image={project}
          title={'Проекты'}
          text={
            'Управляйте проектами с легкостью, создавайте потоки задач и обучайте команду в новом микросервисе системы UNET'
          }
        />
        <ServiceCard
          image={calendar}
          title={'Календарь'}
          text={
            'Планируйте события и задачи с удобством, используя наш надежный календарь, который обеспечивает точность и своевременность'
          }
        />
        <ServiceCard
          image={messenger}
          title={'Мессенджер'}
          text={
            'Общение становится эффективным внутри организации с нашим мессенджером, обеспечивающим удобство и безопасность'
          }
        />
        <ServiceCard
          image={document}
          title={'Документооборот'}
          text={
            'Удобное обращение и хранение документов в одном месте, обеспечивая быструю и организованную работу с документами'
          }
        />
        <ServiceCard
          image={task}
          title={'Возможности в Задачах'}
          text={
            'Назначайте задачи, устанавливайте сроки и отслеживайте прогресс — наш сервис задач помогает в организации работы команды'
          }
        />
        <ServiceCard
          image={statistic}
          title={'Статистика'}
          text={
            'Отслеживайте статистику для принятия обоснованных решений, улучшайте эффективность и анализируйте производительность'
          }
        />
      </div>
    </section>
  )
}

export default OurServicesSection
