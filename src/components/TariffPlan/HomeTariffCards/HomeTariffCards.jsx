import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import styles from './HomeTariffCards.module.scss'

import check from 'assets/icons/check_circle.png'
import cross from 'assets/icons/cross_circle.png'
import TariffRequestForm from 'components/Forms/TariffForm/TariffRequestForm/TariffRequestForm'
import { useState } from 'react'
import userInfo from 'utils/userInfo'
import { Button } from 'components'

const HomeTariffPlanCard = ({
  logInSubTitle,
  id,
  title,
  text,
  price,
  price_dollar,
  color,
  hdd_memory,
  ram_memory,
  count_users,
  features,
}) => {
  const [openModal, setOpenModal] = useState(false)
  const [tariffInfo, setTariffInfo] = useState({
    tariffTitle: '',
    tariffId: '',
  })
  const user = userInfo()

  const featureText = {
    task: 'Задача',
    project: 'Проект',
    teams: 'Команды',
    support: 'Поддержка',
    statistic: 'Статистика',
    struction: 'Структуры',
    document: 'Документы',
    chat: 'Чат',
    calendar: 'Календарь',
    registration_personal: 'Регистрация пользователей',
  }

  const availableFeatures = Object.keys(featureText).filter(
    (feature) => features[0][feature],
  )
  const unavailableFeatures = Object.keys(featureText).filter(
    (feature) => !features[0][feature],
  )
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <p style={{ fontSize: '12px', fontWeight: '300' }}>
          <span style={{ fontSize: '32px', fontFamily: 'Nunito' }}>
            ${price_dollar}
          </span>{' '}
          / в мес
        </p>
        <span
          style={{
            fontSize: '12px',
            opacity: '0.7',
            paddingBottom: '15px',
          }}
        >
          {text}
        </span>
      </div>
      <div className={styles.features}>
        <div className={styles.feature}>
          {availableFeatures.map((feature) => (
            <div key={feature} className={styles.feature_item}>
              <img src={check} alt="" className={styles.feature__img} />
              {featureText[feature]}
            </div>
          ))}
        </div>
        {unavailableFeatures.length !== 0 ? (
          <div className={styles.feature}>
            {unavailableFeatures.map((feature) => (
              <div key={feature} className={styles.feature_item}>
                <img src={cross} alt="" className={styles.feature__img} />
                {featureText[feature]}
              </div>
            ))}
          </div>
        ) : null}

        <div className={styles.tarrif_btn}>
          {user?.userId && logInSubTitle === title ? (
            <Button className="purple__welcome_btn">Активный тариф </Button>
          ) : !user?.userId && title === 'Базовый' ? (
            <Button className="default__tariff">По умолчанию</Button>
          ) : (
            <Button
              onClick={() => {
                setOpenModal(true)
                setTariffInfo({
                  tariffId: id,
                  tariffTitle: title,
                })
              }}
              className="get__tariff"
            >
              Получить сейчас
            </Button>
          )}{' '}
        </div>
      </div>

      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={'Ждем ваших заявок'}
      >
        <TariffRequestForm
          tariffInfo={tariffInfo}
          setOpenModal={setOpenModal}
        />
      </ModalWindow>
    </div>
  )
}

export default HomeTariffPlanCard
