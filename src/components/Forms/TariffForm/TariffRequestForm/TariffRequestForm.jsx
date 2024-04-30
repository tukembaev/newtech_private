import qmark from 'assets/icons/qmark.svg'
import axios from 'axios'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
import { useState } from 'react'
import Notification from 'utils/Notifications'
import styles from './TariffRequestForm.module.scss'
const TariffRequestForm = ({ tariffInfo, setOpenModal }) => {
  const { loading, withLoading } = useLoading(false)

  const [name_client, setName] = useState('')
  const [number_client, setNumber] = useState('')
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const handleSubmit = async () => {
    if (!name_client || !number_client) {
      setNotify({
        isOpen: true,
        message: 'Заполните все поля',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      try {
        await withLoading(async () => {
          const response = await axios.post(
            'https://tm.unet.kg/api/application-tariff/',
            {
              tariff: tariffInfo.tariffId,
              name: name_client,
              number: number_client,
            },
          )

          setNotify({
            isOpen: true,
            message: 'Отправлено!',
            type: 'success',
            sound: 'success',
          })
          await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for 2 seconds

          setOpenModal(false)
        })
      } catch (error) {
        console.log(error.response)
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.flex__wrap}>
        <div className={styles.requiredField}>
          <h3>Имя</h3>
        </div>
        <input
          id="name_client"
          name="name_client"
          className={styles.discription}
          value={name_client}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
        />
      </div>
      <div className={styles.flex__wrap}>
        <div className={styles.requiredField}>
          <h3>Номер телефона</h3>
        </div>
        <input
          id="number_client"
          name="number_client"
          className={styles.discription}
          value={number_client}
          type="number"
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Номер"
        />
      </div>
      <div className={styles.flex__wrap}>
        <div className={styles.requiredField}>
          <h3>Выбранный тариф</h3>
        </div>
        <div className={styles.discription} style={{ background: '#fff' }}>
          {tariffInfo.tariffTitle}
        </div>
        <div style={{ width: '250px' }}>
          <p style={{ padding: '10px 0 0 0 ', fontSize: '16px' }}>
            <img src={qmark} alt="" /> После отправки формы{' '}
          </p>

          <span>
            Наши специалисты свяжутся с вами и предоставят индивидуальную
            консультацию
          </span>
        </div>
        <ButtonLoader loading={loading} position={'center'}>
          <button className={styles.consult_btn} onClick={handleSubmit}>
            Получить консультацию
          </button>
        </ButtonLoader>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default TariffRequestForm
