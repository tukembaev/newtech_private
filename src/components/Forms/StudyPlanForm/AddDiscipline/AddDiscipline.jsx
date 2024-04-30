import { useState } from 'react'

import styles from './AddDiscipline.module.scss'

import { useDispatch } from 'react-redux'

import { TextareaAutosize } from '@mui/material'

import { Button } from 'components'
import Dropdown from 'components/Dropdown/Dropdown'
import 'react-datepicker/dist/react-datepicker.css'
import { createSubject } from 'service/StudyPlanService'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'

function AddDiscipline({ semester, setRender, setState }) {
  //UseState
  const user = userInfo()
  const request_type = [
    { id: 0, label: 'Да' },
    { id: 1, label: 'Нет' },
  ]
  const request_type2 = [
    { id: 0, label: 'Основной курс' },
    { id: 1, label: 'Курс по выбору' },
  ]

  const [formValues, setFormValues] = useState([])

  const [id, setId] = useState('')

  const [id2, setId2] = useState('')

  const [title, setTitle] = useState('')

  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  //Dispatch
  const dispatch = useDispatch()
  //Const & Let
  const [credit, setCredit] = useState('')
  const [amount_hours, setAmount_hours] = useState('')
  const [practice_hours, setPractice_hours] = useState('')
  const [lection_hours, setLection_hours] = useState('')
  const [lab_hours, setLab_hours] = useState('')
  const [prerequisite, setPrerequisite] = useState('')
  const [course_type, setCourse_type] = useState('')

  const handleAddSubmit = () => {
    if (credit === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали название направления',
        type: 'warning',
        sound: 'warning',
      })
    } else if (amount_hours === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали форму обучения',
        type: 'warning',
        sound: 'warning',
      })
    } else if (practice_hours === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали уровень образования',
        type: 'warning',
        sound: 'warning',
      })
    } else if (lection_hours === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали период',
        type: 'warning',
        sound: 'warning',
      })
    } else if (lab_hours === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали период',
        type: 'warning',
        sound: 'warning',
      })
    } else if (prerequisite === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали период',
        type: 'warning',
        sound: 'warning',
      })
    } else if (course_type === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали период',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      const newFormValue = {
        id: formValues.length + 1,
        semester,
        name_subject: title,
        credit,
        amount_hours,
        practice_hours,
        lecture_hours: lection_hours,
        lab_hours,
        prerequisite,
        course_type,
      }

      setFormValues((prevFormValues) => [...prevFormValues, newFormValue])

      setTitle('')
      setCredit('')
      setAmount_hours('')
      setPractice_hours('')
      setLection_hours('')
      setLab_hours('')
      setPrerequisite('')
      setCourse_type('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      var newData = formValues.map(function (obj) {
        return Object.fromEntries(
          Object.entries(obj).filter(function ([key, value]) {
            return key !== 'id'
          }),
        )
      })
      let response = await createSubject(newData)
      // let response = await createSemester(studyDataInfo.id , {semesters:[...studyDataInfo.semesters , {syllabus:studyDataInfo.id}] } )

      setNotify({
        isOpen: true,
        message: 'Дисциплина добавлена',
        type: 'success',
        sound: 'success',
      })

      setState({ isPaneOpen: false })
      setRender(true)
      window.location.reload()
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

  const handleDelete = (id) => {
    setFormValues((prevFormValues) =>
      prevFormValues.filter((item) => item.id !== id),
    )
  }
  return (
    <div>
      <div className={styles.flex}>
        <TextareaAutosize
          id="title"
          name="title"
          className={styles.type_input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название дисциплины:"
        />
        <TextareaAutosize
          id="credit"
          name="credit"
          className={styles.type_input}
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
          placeholder="Кредит:"
        />
        <TextareaAutosize
          id="amount_hours"
          name="amount_hours"
          className={styles.type_input}
          value={amount_hours}
          onChange={(e) => setAmount_hours(e.target.value)}
          type="number"
          placeholder="Общее количество часов:"
        />
        <TextareaAutosize
          id="practice_hours"
          name="practice_hours"
          className={styles.type_input}
          value={practice_hours}
          onChange={(e) => setPractice_hours(e.target.value)}
          placeholder="Часы на практику:"
        />
        <TextareaAutosize
          id="lection_hours"
          name="lection_hours"
          className={styles.type_input}
          value={lection_hours}
          onChange={(e) => setLection_hours(e.target.value)}
          placeholder="Часы на лекции:"
        />
        <TextareaAutosize
          id="lab_hours"
          name="lab_hours"
          className={styles.type_input}
          value={lab_hours}
          onChange={(e) => setLab_hours(e.target.value)}
          placeholder="Часы на лаб.работы:"
        />
      </div>
      <div className={styles.signer} style={{ maxWidth: '400px' }}>
        <TextareaAutosize
          id="prereq"
          name="prereq"
          className={styles.type_input}
          value={prerequisite}
          onChange={(e) => setPrerequisite(e.target.value)}
          placeholder="Пререквизит:"
        />
      </div>
      <div className={styles.signer} style={{ maxWidth: '400px' }}>
        <Dropdown
          setId={setId2}
          setType={setCourse_type}
          title={'Тип'}
          data={request_type2 ?? []}
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
              <p>{item.name_subject}</p>
              <p>{item.credit}</p>
              <p>{item.amount_hours}</p>
              <p>{item.practice_hours}</p>
              <p>{item.lecture_hours}</p>
              <p>{item.lab_hours}</p>
            </div>
            <div style={{ display: 'flex', gap: '25px' }}>
              <p>{item.prerequisite}</p>
              <p>{item.course_type}</p>
            </div>
            <button onClick={() => handleDelete(item.id)}>X</button>
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

export default AddDiscipline
