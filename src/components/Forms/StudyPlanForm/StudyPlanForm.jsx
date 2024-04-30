import { useState } from 'react'

import styles from './StudyPlanForm.module.scss'

import { useDispatch } from 'react-redux'

import { TextareaAutosize } from '@mui/material'

import { Button } from 'components'
import Dropdown from 'components/Dropdown/Dropdown'
import 'react-datepicker/dist/react-datepicker.css'
import { createStudyPlan } from 'service/StudyPlanService'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'

function StudyPlanForm({ setRender, setState }) {
  //UseState
  const user = userInfo()
  const request_type = [
    { id: 0, label: 'Очная' },
    { id: 1, label: 'Заочная' },
  ]
  const request_type2 = [
    { id: 0, label: 'Бакалавр' },
    { id: 1, label: 'Магистратура' },
  ]

  const [formValues, setFormValues] = useState([])

  const [id, setId] = useState('')
  const [type_doc, setType_doc] = useState('')
  const [id2, setId2] = useState('')
  const [education, setEducation] = useState('')

  const [title, setTitle] = useState('')

  let [selectedYear, setSelectedYear] = useState(null)

  const handleStartYearChange = (e) => {
    let input = e.target.value
    let filteredInput = input.replace(/\D/g, '')
    input = input.slice(0, 4)
    setSelectedYear(filteredInput)
  }
  let [selectedYear2, setSelectedYear2] = useState(null)

  const handleEndYearChange = (e) => {
    let input = e.target.value
    let filteredInput = input.replace(/\D/g, '')
    input = input.slice(0, 4)
    setSelectedYear2(filteredInput)
  }

  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  //Dispatch
  const dispatch = useDispatch()
  //Const & Let

  const handleAddSubmit = () => {
    if (title === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали название направления',
        type: 'warning',
        sound: 'warning',
      })
    } else if (type_doc === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали форму обучения',
        type: 'warning',
        sound: 'warning',
      })
    } else if (education === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали уровень образования',
        type: 'warning',
        sound: 'warning',
      })
    } else if (selectedYear === null) {
      setNotify({
        isOpen: true,
        message: 'Вы не указали период',
        type: 'warning',
        sound: 'warning',
      })
    } else if (selectedYear2 === null) {
      setNotify({
        isOpen: true,
        message: 'Вы не указали период',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      const newFormValue = {
        id: formValues.length + 1,
        name_direction: title,
        form_education: type_doc,
        level_education: education,
        start_year: selectedYear,
        end_year: selectedYear2,
      }

      setFormValues((prevFormValues) => [...prevFormValues, newFormValue])

      setTitle('')
      setType_doc('')
      setEducation('')
      setSelectedYear(null)
      setSelectedYear2(null)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formValues.length === 0) {
      setNotify({
        isOpen: true,
        message: 'Заполните поля и нажмите кнопку "Добавить" ',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      try {
        var newData = formValues.map(function (obj) {
          return Object.fromEntries(
            Object.entries(obj).filter(function ([key, value]) {
              return key !== 'id'
            }),
          )
        })
        let response = await createStudyPlan(newData)

        setNotify({
          isOpen: true,
          message: 'Учебный план добавлен',
          type: 'success',
          sound: 'success',
        })
        setState({ isPaneOpen: false })
        window.location.reload()
      } catch (error) {
        console.log(error.response)
        window.location.reload()
        setNotify({
          isOpen: true,
          message: 'Ошибка',
          type: 'error',
          sound: 'error',
        })
      }
    }
  }

  return (
    <div>
      <TextareaAutosize
        id="title"
        name="title"
        className={styles.type_input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название направления:"
      />
      <div className={styles.signer} style={{ width: '280px' }}>
        <Dropdown
          setId={setId}
          setType={setType_doc}
          title={'Форма обучения'}
          data={request_type ?? []}
        />
      </div>
      <div className={styles.signer} style={{ width: '280px' }}>
        <Dropdown
          setId={setId2}
          setType={setEducation}
          title={'Уровень образования'}
          data={request_type2 ?? []}
        />
      </div>

      <p style={{ paddingBottom: '10px' }}>Год обучения: </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <TextareaAutosize
          id="start"
          name="start"
          className={styles.type_input}
          value={selectedYear}
          onChange={handleStartYearChange}
          placeholder="Старт:"
          style={{ maxWidth: '135px' }}
        />
        <TextareaAutosize
          id="end"
          name="end"
          className={styles.type_input}
          value={selectedYear2}
          onChange={handleEndYearChange}
          placeholder="Конец:"
          style={{ maxWidth: '135px' }}
        />
      </div>
      <div className={styles.statement_footer}>
        <Button className={styles.btn1} onClick={handleAddSubmit}>
          Добавить
        </Button>
      </div>
      <div className={styles.body}>
        {formValues?.map((item, index) => (
          <div className={styles.position_card} key={item.id}>
            <div style={{ display: 'flex', gap: '25px' }}>
              <p>{index + 1}</p>

              <p>{item.name_direction}</p>
              <p>{item.form_education}</p>
              <p>{item.level_education}</p>
            </div>
            <div style={{ display: 'flex', gap: '25px' }}>
              <p>{new Date(item.start_year).getFullYear()}</p>
              <p>{new Date(item.end_year).getFullYear()}</p>
            </div>
          </div>
        ))}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <Button className={styles.btn3} onClick={handleSubmit}>
        Отправить
      </Button>
    </div>
  )
}

export default StudyPlanForm
