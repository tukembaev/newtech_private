import styles from './AcaademForm.module.scss'

export default function AcaademForm({ setClose, setTop, setLeft }) {
  const handleClose = () => {
    setClose(false)
    setTop(0)
    setLeft(0)
  }
  return (
    <div className={styles.form__head}>
      <h3>Добавление событий</h3>
      <div className={styles.form__body}>
        <input
          type="text"
          placeholder="Названия события"
          className={styles.form__title}
        />
        <input
          type="datetime-local"
          name="start"
          required
          className={styles.form__start}
        />
        <input
          type="datetime-local"
          name="end"
          required
          className={styles.form__end}
        />
      </div>
      <div className={styles.form__btns}>
        <button className={styles.form__btn}>Добавить</button>
        <button className={styles.form__btn} onClick={handleClose}>
          Закрыть
        </button>
      </div>
    </div>
  )
}
