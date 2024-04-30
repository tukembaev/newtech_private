import React from 'react'
import styles from './AboutUsSection.module.scss'
import ServiceCard from '../OurServicesSection/components/ServiceCard'
import innovation from 'assets/icons/welcomeIcons/innovations.png'
import partnership from 'assets/icons/welcomeIcons/partnership.png'
import security from 'assets/icons/welcomeIcons/security.png'

const AboutUsSection = () => {
  return (
    <div className={styles.section} id="aboutus">
      <div className={styles.top}>
        <h2>О нас</h2>
        <p>
          Мы — команда опытных разработчиков, специализирующихся на
          микросервисах и системах для документооборота. С нашим разносторонним
          опытом и преданностью качеству, мы создаем интегрированные решения для
          управления задачами, согласованием документов и эффективной
          коммуникацией
        </p>
      </div>
      <div className={styles.bottom}>
        <h3 style={{ textAlign: 'center', paddingBottom: '25px' }}>
          Наши преимущества
        </h3>
        <div className={styles.adventages}>
          <ServiceCard
            image={innovation}
            title={'Инновационные Решения'}
            text={
              'Постоянно внедряем инновации для обеспечения современности и эффективности в каждом аспекте вашего бизнеса'
            }
          />
          <ServiceCard
            image={partnership}
            title={'Долгосрочное Партнерство'}
            text={
              'Гарантируем высокое качество разработки и следуем передовым стандартам безопасности, обеспечивая стабильность и надежность вашей системы'
            }
          />
          <ServiceCard
            image={security}
            title={'Безопасность '}
            text={
              'Гарантируем высокое качество разработки и следуем передовым стандартам безопасности, обеспечивая стабильность и надежность вашей системы.'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default AboutUsSection
