import check from 'assets/icons/check_circle.png'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
import { useState } from 'react'
import { consultationTariff } from 'service/TariffService'
import Notification from 'utils/Notifications'
import styles from './UserTariffPlan.module.scss'
const UserTariffPlan = ({ setRender, myTariff }) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
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

  const [statusBtn, setStatusBtn] = useState(myTariff?.tariff?.status)
  const { loading, withLoading } = useLoading(false)
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await withLoading(async () => {
        if (myTariff.tariff.title === 'Индивидуальный') {
          let response = await consultationTariff({
            individ_tariff: myTariff.tariff.id,
          })
        } else {
          let response = await consultationTariff({
            tariff: myTariff.tariff.id,
          })
        }

        setNotify({
          isOpen: true,
          message: 'Заявка отправлена',
          type: 'success',
          sound: 'success',
        })
        setStatusBtn('Заявка отправлена')
        setRender(true)
      })
    } catch (error) {
      console.log(error.response)

      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error',
        sound: 'error',
      })
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <div className={styles.icon_title}>
            {/* <img className={styles.size} src={check11} alt="O" /> */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
            >
              <h4 style={{ color: 'grey' }}>Тариф</h4>
              <h2>{myTariff?.tariff?.title}</h2>
            </div>
          </div>
        </div>

        <div className={styles.header_right}>
          <ButtonLoader color={'black'} loading={loading} position={'center'}>
            <button
              style={{
                marginTop: '25px',
                background:
                  statusBtn === null ? '#4a3aff' : 'rgba(62, 62, 62, 1)',
                cursor: statusBtn === null ? 'pointer' : 'unset',
              }}
              onClick={handleSubmit}
              className={styles.btn_pin}
            >
              {' '}
              {statusBtn === null ? 'Оставить заявку' : statusBtn}{' '}
            </button>
          </ButtonLoader>
        </div>
      </div>
      <h3>{myTariff?.tariff?.text}</h3>
      <div className={styles.body}>
        <h1 style={{ padding: '10px 0' }}>
          {myTariff?.tariff?.price}
          <span style={{ fontSize: '20px', padding: '10px 0 ' }}>/мес.</span>
        </h1>
        <h4>В тарифе</h4>
        <div className={styles.user_feature}>
          {myTariff?.tariff?.features?.[0] &&
            Object.keys(myTariff?.tariff?.features[0]).map((feature) => {
              if (myTariff?.tariff?.features[0][feature]) {
                return (
                  <div style={{ paddingTop: '10px' }} key={feature}>
                    <div
                      style={{
                        paddingBottom: '5px',
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      {' '}
                      <img src={check} style={{ width: '23px' }} alt="" />{' '}
                      {featureText[feature]}{' '}
                    </div>
                  </div>
                )
              }
              return null // Если значение не true, то не отображаем
            })}
        </div>
      </div>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default UserTariffPlan
