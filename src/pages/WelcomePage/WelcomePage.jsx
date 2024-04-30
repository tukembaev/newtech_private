import React from 'react'
import styles from './WelcomePage.module.scss'
import WelcomeHeader from './components/WelcomeHeader/WelcomeHeader'
import AboutUsSection from './components/WelcomeSections/AboutUsSection/AboutUsSection'
import OurServicesSection from './components/WelcomeSections/OurServicesSection/OurServicesSection'
import ContactsSection from './components/WelcomeSections/ContactsSection/ContactsSection'
import OurTariffsSection from './components/WelcomeSections/OurTariffsSection/OurTariffsSection'
import EnterToSystemSection from './components/WelcomeSections/EnterToSystemSection/EnterToSystemSection'
import OurFeaturesSection from './components/WelcomeSections/OurFeaturesSection/OurFeaturesSection'
import OurReviewsSection from './components/WelcomeSections/OurReviewsSection/OurReviewsSection'
import WelcomeFooter from './components/WelcomeFooter/WelcomeFooter'

const WelcomePage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_header}>
        <WelcomeHeader />
      </div>
      <div className={styles.wrapper_body}>
        <EnterToSystemSection />
        <OurServicesSection />
        <OurFeaturesSection />
        <OurTariffsSection />
        <AboutUsSection />
        <OurReviewsSection />
        <ContactsSection />
        <WelcomeFooter />
        <h5
          style={{ color: '#8B8B91', margin: '0 auto', paddingBottom: '25px' }}
        >
          Copyright 2023, All Rights Resetved by UNET
        </h5>
      </div>
    </div>
  )
}

export default WelcomePage
