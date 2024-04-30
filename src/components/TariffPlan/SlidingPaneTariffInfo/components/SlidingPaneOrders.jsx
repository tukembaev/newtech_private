import check from 'assets/icons/check_circle.png'
import styles from './SlidingPaneOrders.module.scss'

const SlidingPaneOrders = ({ myConstructor, myMicroservices, setRender }) => {
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
  return (
    <>
      {myConstructor.length === 0 ? null : (
        <div className={styles.tariff_order_container}>
          <div className={styles.tariff_order_header}>
            <div className={styles.tariff_order_header_left}>
              <div className={styles.tariff_order_icon_title}>
                <div>
                  <h4 style={{ color: 'grey' }}>Тариф</h4>
                  <h3>Индивидуальный</h3>
                </div>
              </div>
            </div>
            <div className={styles.tariff_order_header_right}>
              <button className={styles.btn_pin}>В ожидании</button>
            </div>
          </div>
          <h3 style={{ paddingBottom: '10px' }}>Описание</h3>
          <div className={styles.tariff_order_body}>
            <div className={styles.feature}>
              {myConstructor?.[0] &&
                Object.keys(myConstructor[0].features[0]).map((feature) => {
                  if (myConstructor[0].features[0][feature]) {
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
          </div>
          <p style={{ textAlign: 'right' }}>
            <span style={{ fontWeight: '800' }}>Заказ оформлен: </span>{' '}
            {myConstructor?.[0]?.date_order}{' '}
          </p>
        </div>
      )}

      {myMicroservices.length === 0
        ? null
        : myMicroservices?.map((item) => (
          <div className={styles.tariff_order_container}>
            <div className={styles.tariff_order_header}>
              <div className={styles.tariff_order_header_left}>
                <div className={styles.tariff_order_icon_title}>
                  <div>
                    <h4 style={{ color: 'grey' }}>Микросервис</h4>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </div>
              <div className={styles.tariff_order_header_right}>
                <button className={styles.btn_pin}>В ожидании</button>
              </div>
            </div>
            <h4 style={{ paddingBottom: '10px' }}>{item.text}</h4>
            <p style={{ textAlign: 'right' }}>
              <span style={{ fontWeight: '800' }}>Заказ оформлен: </span>{' '}
              {item.date_order}{' '}
            </p>
          </div>
          ))}
    </>
  )
}

export default SlidingPaneOrders
