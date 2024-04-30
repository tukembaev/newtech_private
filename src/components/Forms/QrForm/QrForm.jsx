import { Button } from 'components'
import { useState } from 'react'
import styles from './QrForm.module.scss'

function QrForm() {
  const [kg, setKg] = useState('')
  const [rus, setRus] = useState('')
  const [eng, setEng] = useState('')
  const [responible, setResponsible] = useState('')
  const [numResp, setNumResp] = useState('')
  const [mailResp, setMailResp] = useState('')
  const [href, setHref] = useState('')
  const [discrip, setDiscrip] = useState('')
  const [kampus, setKampus] = useState('')
  const [korpus, setKorpus] = useState('')
  const [auditor, setAuditor] = useState('')
  return (
    <div className={styles.qr_wrapper}>
      <div className={styles.qr_body}>
        <div className={styles.qr_inputs}>
          {/* <input
        id="text"
        name="text"
        className={styles.discription_input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Выберите кампус:"
      />
      <input
        id="text"
        name="text"
        className={styles.discription_input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Выберите корпус:"
      />
      <input
        id="text"
        name="text"
        className={styles.discription_input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Выберите аудиторию:"
      /> */}
          <input
            id="text"
            name="text"
            className={styles.discription_input}
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            placeholder="Введите название на кыргызском:"
          />
          <input
            id="text"
            name="text"
            className={styles.discription_input}
            value={rus}
            onChange={(e) => setRus(e.target.value)}
            placeholder="Введите название на русском:"
          />
          <input
            id="text"
            name="text"
            className={styles.discription_input}
            value={eng}
            onChange={(e) => setEng(e.target.value)}
            placeholder="Введите Название на Английском:"
          />
          <input
            id="text"
            name="text"
            className={styles.discription_input}
            value={responible}
            onChange={(e) => setResponsible(e.target.value)}
            placeholder="Отвечающий за кабинет:"
          />
          <input
            id="text"
            name="text"
            className={styles.discription_input}
            value={numResp}
            onChange={(e) => setNumResp(e.target.value)}
            placeholder="Номер Отвечающего за кабинет:"
          />
          <input
            id="text"
            name="text"
            className={styles.discription_input}
            value={mailResp}
            onChange={(e) => setMailResp(e.target.value)}
            placeholder="Почта Отвечающего за кабинет:"
          />
          <input
            id="text"
            name="text"
            className={styles.discription_input}
            value={href}
            onChange={(e) => setHref(e.target.value)}
            placeholder="Ссылка на сайт:"
          />
        </div>
        <input
          id="text"
          name="text"
          className={styles.discription_input}
          value={discrip}
          onChange={(e) => setDiscrip(e.target.value)}
          placeholder="Описание кабинета:"
          maxLength={2000}
        />
        <div className={styles.qr_footer}>
          <Button className={styles.btn1}>Отправить</Button>
        </div>
      </div>
    </div>
  )
}

export default QrForm
