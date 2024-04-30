import React from 'react'
import styles from './OurFeaturesSection.module.scss'
import { Button } from 'components'
import welcomeImgEnter from 'assets/img/welcomeImgs/welcomeImgEnter.png'
import project from 'assets/icons/welcomeIcons/project.png'
import FeatureCard from './components/FeatureCard'
const OurFeaturesSection = () => {
  return (
    <div className={styles.section} id="features">
      <div className={styles.left_side}>
        <img src={welcomeImgEnter} alt="" />
      </div>
      <div className={styles.right_side}>
        <h2>С нами вы получите</h2>
        <FeatureCard
          image={project}
          title={'Регулярное выражение'}
          text={
            'Наши регулярные обновления гарантируют, что ваш опыт с нашей системой всегда будет современным и надежным'
          }
        />
        <FeatureCard
          image={project}
          title={'Индивидуальный подход'}
          text={
            'Мы создаем решения, которые идеально соответствуют вашим целям и стратегии'
          }
        />
        <FeatureCard
          image={project}
          title={'Поддержка 24/7'}
          text={
            'Ваш надежный партнер для оперативного решения вопросов и обеспечения бесперебойной поддержки в любой ситуации'
          }
        />
      </div>
    </div>
  )
}

export default OurFeaturesSection
