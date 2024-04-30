import check from 'assets/icons/check_circle.png'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import { useState } from 'react'
import { requestNewTariff } from 'service/TariffService'
import Notification from 'utils/Notifications'
import styles from './SlidingPaneTariffCards.module.scss'
const SlidingPaneTariffCards = ({
  id,
  title,
  popular,
  text,
  price,
  color,
  status,
  hdd_memory,
  ram_memory,
  icon,
  count_users,
  features,
}) => {
  const [loading, setLoading] = useState(false)
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
    flow: 'Потоки',
    registration_personal: 'Регистрация пользователей',
  }
  const [statusBtn, setStatusBtn] = useState(status)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      let response = await requestNewTariff({ tariff: id })
      setNotify({
        isOpen: true,
        message: 'Заявка отправлена',
        type: 'success',
        sound: 'success',
      })
      setStatusBtn('Заявка отправлена')
    } catch (error) {
      console.log(error.response)

      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error',
        sound: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container} style={{ backgroundColor: `${color}` }}>
      <div className={styles.header}>
        <div className={styles.icon_title}>
          {/* <img className={styles.size} src={check11} alt="O" /> */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
                {/* <img src={icon} style={{width:'45px'}} alt="" /> */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h4>Тариф</h4>
                  <h3 className={styles.title}> {title}</h3>
                </div>
              </div>
              {popular ? (
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.20)',
                    padding: '5px 15px',
                    borderRadius: '10px',
                  }}
                >
                  Популярный
                </span>
              ) : null}
            </div>

            <p>{text}</p>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.info}>
          <div className={styles.userCount}>
            <h2>{price} сом/мес.</h2>
            {/* <h2 style={{borderBottom:'1px solid black'}}>{price} сом/мес.</h2> */}
          </div>
          <div className={styles.storage}>
            <p>{hdd_memory}</p>
            <p>{ram_memory} ОЗУ</p>
            <p>{count_users} Пользователей</p>
          </div>
        </div>

        <div className={styles.features}>
          <h3>В тарифе</h3>
          <div className={styles.feature}>
            {features?.[0] &&
              Object.keys(features[0]).map((feature) => {
                if (features[0][feature]) {
                  return (
                    <div key={feature}>
                      <div
                        style={{
                          paddingBottom: '5px',
                          display: 'flex',
                          gap: '10px',
                        }}
                      >
                        {' '}
                        <img
                          src={check}
                          style={{ width: '23px' }}
                          alt=""
                        />{' '}
                        {featureText[feature]}{' '}
                      </div>
                    </div>
                  )
                }
                return null // Если значение не true, то не отображаем
              })}
          </div>
          <div style={{ textAlign: 'center' }}>
            {' '}
            <ButtonLoader color={'black'} loading={loading} position={'center'}>
              <button
                style={{
                  marginTop: '25px',
                  background:
                    statusBtn === null ? '#4a3aff' : 'rgba(62, 62, 62, 1)',
                  cursor: statusBtn === null ? 'pointer' : 'unset',
                }}
                onClick={handleSubmit}
              >
                {' '}
                {statusBtn === null ? 'Оставить заявку' : statusBtn}{' '}
              </button>
            </ButtonLoader>
          </div>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default SlidingPaneTariffCards
