import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Notification from 'utils/Notifications'

import { Layout } from 'components'

import styles from './QuizForm.module.scss'

import { questions } from 'constants/quizQuestions'
import { SendQuizAnswers } from 'service/AuthService'

const QuizForm = () => {
  const [dataPosition, setDataPosition] = useState([])
  const [gender, setGender] = useState(null)

  const navigate = useNavigate()

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const dispatch = useDispatch()

  const [answers, setAnswers] = useState([])

  const handleAnswerChange = (question, answer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers]
      const existingAnswer = updatedAnswers.find((a) => a.question === question)

      if (existingAnswer) {
        existingAnswer.answer = answer
      } else {
        updatedAnswers.push({ question, answer })
      }

      return updatedAnswers
    })
  }

  //Const & Let
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (answers.length === 16) {
      try {
        let response = await SendQuizAnswers(answers)

        setNotify({
          isOpen: true,
          message: 'Ответы успешно отправлены',
          type: 'success',
          sound: 'success',
        })

        navigate(-1)
      } catch (error) {
        console.log(error.response)

        setNotify({
          isOpen: true,
          message: 'Ошибка!',
          type: 'error',
          sound: 'error',
        })
      }
    } else {
      setNotify({
        isOpen: true,
        message: 'Вы не ответили на все вопросы опроса',
        type: 'warning',
        sound: 'warning',
      })
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div class={styles.title}>Опрос</div>
        <form className={styles.form}>
          {questions.map((question) => (
            <div className={styles.gender_details} key={question.id}>
              <p className={styles.gender_title}>{question.question_text}</p>
              <div className={styles.category}>
                <label>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value="true"
                    onChange={() => handleAnswerChange(question.id, true)}
                  />
                  Да
                </label>
                <label>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value="false"
                    onChange={() => handleAnswerChange(question.id, false)}
                  />
                  Нет
                </label>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'right', paddingTop: '15px' }}>
            <input
              className={styles.btn_pin}
              type="submit"
              onClick={handleSubmit}
              value="Отправить"
            />
          </div>
        </form>

        {/* <div className="gender_details">
                <span className="gender_title"> Выберите пол</span>
                <div className="category">
                    <label for="dot-1">
                        <span className="dot one"></span>
                        <span className="gender">Мужчина</span>
                    </label>
                    <label for="dot-2">
                        <span className="dot two"></span>
                        <span className="gender">Женщина</span>
                    </label>
              
                </div>
            </div> */}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default QuizForm
