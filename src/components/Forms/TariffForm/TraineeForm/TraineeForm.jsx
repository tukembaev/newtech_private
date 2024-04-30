import qmark from 'assets/icons/qmark.svg'
import axios from 'axios'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
import { useState } from 'react'
import Notification from 'utils/Notifications'
import styles from './TraineeForm.module.scss'
const TraineeForm = ({ setOpenModal }) => {
  const { loading, withLoading } = useLoading(false)
  const [name_client, setName] = useState('')
  const [number_client, setNumber] = useState('')
  const [email_client, setEmail] = useState('')
  const [profession, setProfession] = useState('')
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  const handleClear = () => {
    setEmail('')
    setName('')
    setProfession('')
    setNumber('')
  }
  const handleSubmit = async () => {
    if (name_client === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не ввели имя',
        type: 'warning',
        sound: 'warning',
      })
    } else if (number_client === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали номер',
        type: 'warning',
        sound: 'warning',
      })
    } else if (profession === '') {
      setNotify({
        isOpen: true,
        message: 'Введите должность',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      try {
        await withLoading(async () => {
          const response = await axios.post(
            'https://tm.unet.kg/api/dev-request/',
            {
              name: name_client,
              phone: number_client,
              email: email_client,
              profession: profession,
            },
          )
          setNotify({
            isOpen: true,
            message: 'Заявка успешно отправлена',
            type: 'success',
            sound: 'success',
          })

          await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for 2 seconds

          setOpenModal(false)
        })
      } catch (error) {
        console.log(error.response)
      } finally {
        handleClear()
        // setOpenModal(false);
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.all_inputs}>
        <div className={styles.flex__wrap}>
          <div className={styles.requiredField}>
            <h3>
              Имя <span className={styles.required_img}>*</span>
            </h3>
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
            <h3>
              Номер телефона <span className={styles.required_img}>*</span>
            </h3>
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
            <h3>Электронная почта</h3>
          </div>
          <input
            type="email"
            name="email_client"
            className={styles.discription}
            value={email_client}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Электронная почта"
          />
        </div>
        <div className={styles.flex__wrap}>
          <div className={styles.requiredField}>
            <h3>
              Ваша проффесия <span className={styles.required_img}>*</span>
            </h3>
          </div>
          <input
            type="email"
            name="email_client"
            className={styles.discription}
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Проффесия"
          />
        </div>
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
      <ButtonLoader color={'black'} loading={loading} position={'center'}>
        {' '}
        <button className={styles.consult_btn} onClick={handleSubmit}>
          Отправить
        </button>{' '}
      </ButtonLoader>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default TraineeForm
