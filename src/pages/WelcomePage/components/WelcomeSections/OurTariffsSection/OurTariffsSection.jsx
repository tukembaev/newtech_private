import React, { useEffect, useState } from 'react'
import styles from './OurTariffsSection.module.scss'
import HomeTariffPlanCard from 'components/TariffPlan/HomeTariffCards/HomeTariffCards'
import axios from 'axios'

const OurTariffsSection = () => {
  const [data, setData] = useState()
  const storedData = localStorage.getItem('subscription_title') // Получить строку из localStorage
  const logInSubTitle = JSON.parse(storedData)

  const getData = async () => {
    try {
      const response = await axios.get('https://tm.unet.kg/api/tariff/')
      setData(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.section} id="tariff">
      <div className={styles.header}>
        <h2>Тарифные планы</h2>
        <p>
          Выберите идеальный тариф. Простые и гибкие планы, соответствующие
          вашим потребностям
        </p>
      </div>
      <div className={styles.user_tariffs}>
        <div className={styles.bottom}>
          {data?.length === 0
            ? []
            : data?.tariff?.map((item) => (
                // eslint-disable-next-line react/jsx-indent
                <HomeTariffPlanCard
                  logInSubTitle={logInSubTitle}
                  id={item?.id}
                  title={item?.title}
                  text={item?.text}
                  price={item?.price}
                  price_dollar={item?.price_dollar}
                  color={item?.color}
                  hdd_memory={item?.hdd_memory}
                  ram_memory={item?.ram_memory}
                  icon={item?.icon}
                  count_users={item?.count_users}
                  storage={item?.icon}
                  features={item?.features}
                />
              ))}
        </div>
      </div>
      <div className={styles.corporate_tariffs}>
        <div className={styles.header}>
          <h2>Корпоративные тарифные планы</h2>
          <p>
            Выберите идеальный тариф. Простые и гибкие планы, соответствующие
            вашим потребностям
          </p>
        </div>

        <div className={styles.bottom}>
          {data?.length === 0
            ? []
            : data?.corporate?.map((item) => (
                // eslint-disable-next-line react/jsx-indent
                <HomeTariffPlanCard
                  logInSubTitle={logInSubTitle}
                  id={item?.id}
                  title={item?.title}
                  text={item?.text}
                  price={item?.price}
                  price_dollar={item?.price_dollar}
                  color={item?.color}
                  hdd_memory={item?.hdd_memory}
                  ram_memory={item?.ram_memory}
                  icon={item?.icon}
                  count_users={item?.count_users}
                  storage={item?.icon}
                  features={item?.features}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

export default OurTariffsSection
