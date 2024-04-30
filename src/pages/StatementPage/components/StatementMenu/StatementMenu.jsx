import userInfo from 'utils/userInfo'
import styles from './StatementMenu.module.scss'

function StatementMenu({ setFilterChoose, isProrector, setSelectedFilter }) {
  const user = userInfo()
  return (
    <div className={styles.wrapper}>
      <div className={styles.list__wrapper}>
        <span className={styles.title}>
          {' '}
          <select
            className={styles.select__dropdown}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="В режиме ожидания">В режиме ожидания</option>
            <option value="Выполняются">Выполняются</option>
            <option value="Завершенные">Завершенные</option>
            <option value="Мои обращения">Мои обращения</option>
            <option value="Входящие">Входящие</option>
            <option value="История">История</option>
          </select>
        </span>

        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(0)}>
            В режиме ожидания
          </p>
        </div>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(1)}>
            Выполняются
          </p>
        </div>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(2)}>
            Завершенные
          </p>
        </div>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(4)}>
            Мои обращения
          </p>
        </div>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(6)}>
            Входящие
          </p>
        </div>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(5)}>
            История
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatementMenu
