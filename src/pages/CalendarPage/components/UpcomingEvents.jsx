import React from 'react'
import styles from './UpcomingEvents.module.scss'
import moment from 'moment'
import 'moment/locale/ru'
const UpcomingEvents = ({ up_next }) => {
  moment.locale('ru')
  const today = new Date()

  const filteredEvents = up_next
    .filter((event) => {
      const eventEndDate = new Date(event.end)
      return eventEndDate >= today
    })
    .sort((a, b) => {
      const startDateA = new Date(a.start)
      const startDateB = new Date(b.start)
      return startDateA - startDateB
    })

  return (
    <div className={styles.upcoming_wrapper}>
      <h2>Ближайщие события</h2>
      {filteredEvents.length === 0
        ? 'Ближайщих событий нет'
        : filteredEvents.map((item) => (
          <div className={styles.event}>
            <p>{item.title}</p>
            <div>
              <p style={{ display: 'flex', gap: '15px' }}>
                {' '}
                <span
                    style={{ background: `${item.color}` }}
                    className={styles.event_color}
                  >
                  {' '}
                </span>
                {moment(item.start).startOf('day').format('LL')}
              </p>
            </div>
          </div>
          ))}
    </div>
  )
}

export default UpcomingEvents
