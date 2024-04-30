import { useEffect, useState } from 'react'
import {
    getPersonalEmployee,
    patchPersonalEmployee,
} from 'service/PersonalCardService'
import Notification from 'utils/Notifications'
import styles from './EducationInfo.module.scss'

import pencil from 'assets/icons/pencil.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import userInfo from 'utils/userInfo'

const EducationInfo = () => {
  const [change, setChange] = useState(false)
  const [add, setAdd] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [diploma_number, setDiploma_number] = useState('')
  const [level, setLevel] = useState('')
  const [form, setForm] = useState('')
  const [institution, setInstitution] = useState('')
  const [department, setDepartment] = useState('')
  const [entered, setEntered] = useState('')
  const [graduated, setGraduated] = useState(null)
  const [disposed, setDisposed] = useState(null)
  const [qualification, setQualification] = useState(null)
  const [academic_degree, setAcademic_degree] = useState(null)
  const [academic_rank, setAcademic_rank] = useState(null)

  const [english, setEnglish] = useState(false)
  const [diploma_numberEn, setDiploma_numberEn] = useState('')
  const [levelEn, setLevelEn] = useState('')
  const [formEn, setFormEn] = useState('')
  const [institutionEn, setInstitutionEn] = useState('')
  const [departmentEn, setDepartmentEn] = useState('')
  const [enteredEn, setEnteredEn] = useState('')
  const [graduatedEn, setGraduatedEn] = useState(null)
  const [disposedEn, setDisposedEn] = useState(null)
  const [qualificationEn, setQualificationEn] = useState(null)
  const [academic_degreeEn, setAcademic_degreeEn] = useState(null)
  const [academic_rankEn, setAcademic_rankEn] = useState(null)

  const [kyrgyz, setKyrgyz] = useState(false)
  const [diploma_numberKy, setDiploma_numberKy] = useState('')
  const [levelKy, setLevelKy] = useState('')
  const [formKy, setFormKy] = useState('')
  const [institutionKy, setInstitutionKy] = useState('')
  const [departmentKy, setDepartmentKy] = useState('')
  const [enteredKy, setEnteredKy] = useState('')
  const [graduatedKy, setGraduatedKy] = useState(null)
  const [disposedKy, setDisposedKy] = useState(null)
  const [qualificationKy, setQualificationKy] = useState(null)
  const [academic_degreeKy, setAcademic_degreeKy] = useState(null)
  const [academic_rankKy, setAcademic_rankKy] = useState(null)

  const [render, setRender] = useState(false)
  const navigate = useNavigate()
  const [open, setOpen] = useState({
    title: '',
  })
  let data
  const dispatch = useDispatch()
  const user = userInfo()
  const getData = async () => {
    try {
      let response = await getPersonalEmployee(data, 'en')

      dispatch(
        setPersonalInfo({
          personal_info: response.data,
        }),
      )
    } catch (error) {}
  }

  useEffect(() => {
    getData()
    setRender(false)
  }, [render])

  const info = useSelector((state) => state.personalcard.personal_info)

  const education = info.education

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let response = await patchPersonalEmployee(
        {
          education: {
            diploma_number,
            level,
            form,
            institution,
            department,
            entered,
            graduated,
            disposed,
            qualification,
            academic_degree,
            academic_rank,
          },
        },
        'ru',
      )
      if (english) {
        let responseEn = await patchPersonalEmployee(
          {
            education: {
              diploma_number: diploma_numberEn,
              level: levelEn,
              form: formEn,
              institution: institutionEn,
              department: departmentEn,
              entered: enteredEn,
              graduated: graduatedEn,
              disposed: disposedEn,
              qualification: qualificationEn,
              academic_degree: academic_degreeEn,
              academic_rank: academic_rankEn,
            },
          },
          'en',
        )
      }

      if (kyrgyz) {
        let responseKy = await patchPersonalEmployee(
          {
            education: {
              diploma_number: diploma_numberKy,
              level: levelKy,
              form: formKy,
              institution: institutionKy,
              department: departmentKy,
              entered: enteredKy,
              graduated: graduatedKy,
              disposed: disposedKy,
              qualification: qualificationKy,
              academic_degree: academic_degreeKy,
              academic_rank: academic_rankKy,
            },
          },
          'ky',
        )
      }

      setNotify({
        isOpen: true,
        message: 'Оброзвание установлена',
        type: 'success',
        sound: 'success',
      })

      setRender(true)
      setChange(false)
    } catch (error) {
      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error',
        sound: 'error',
      })
    }
  }
  return (
    <div className={styles.wrapper}>
      <div style={{ width: '100%', height: '100%' }}>
        {change ? (
          <div className={styles.Education_true}>
            <div className={styles.EducationHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Образование</h4>
              </div>
              <div className={styles.headerRight}></div>
            </div>

            <div className={styles.Education_change_block}>
              <ul className={styles.Education_desc}>
                {/* <li className= {styles.Education_list_true}>
             <h3 className={styles.Education_title}>Образование</h3>
             <input type="text" className={styles.Education_info_change_inp} />
            </li> */}

                <li className={styles.Education_list_true}>
                  <h3 className={styles.Education_title}>Учебное заведение</h3>
                  <input
                    onChange={(e) => setInstitution(e.target.value)}
                    type="text"
                    className={styles.Education_info_change_inp}
                  />
                </li>

                <li className={styles.Education_list_true}>
                  <h3 className={styles.Education_title}>
                    Факультет/отделение
                  </h3>
                  <input
                    onChange={(e) => setDepartment(e.target.value)}
                    type="text"
                    className={styles.Education_info_change_inp}
                  />
                </li>

                <li className={styles.Education_list_true}>
                  <h3 className={styles.Education_title}>Вид обучения</h3>
                  <input
                    onChange={(e) => setForm(e.target.value)}
                    type="text"
                    className={styles.Education_info_change_inp}
                  />
                </li>

                <li className={styles.Education_list_true}>
                  <h3 className={styles.Education_title}>Год вступления</h3>
                  <input
                    onChange={(e) => setEntered(e.target.value)}
                    type="date"
                    className={styles.Education_info_change_inp}
                  />
                </li>

                <li className={styles.Education_list_true}>
                  <h3 className={styles.Education_title}>
                    Год окончания/ухода
                  </h3>
                  <input
                    onChange={(e) => setGraduated(e.target.value)}
                    type="date"
                    className={styles.Education_info_change_inp}
                  />
                </li>

                <li className={styles.Education_list_true}>
                  <h3
                    className={styles.Education_title}
                    placeholder="Курс ухода"
                  >
                    Если не окончил{' '}
                  </h3>
                  <input
                    onChange={(e) => setDisposed(e.target.value)}
                    type="text"
                    className={styles.Education_info_change_inp}
                  />
                </li>

                <li className={styles.Education_list_true}>
                  <h3 className={styles.Education_title}>
                    Специальность по окончанию
                  </h3>
                  <input
                    onChange={(e) => setQualification(e.target.value)}
                    type="text"
                    className={styles.Education_info_change_inp}
                  />
                </li>

                <li className={styles.Education_list_true}>
                  <h3 className={styles.Education_title}>Номер диплома</h3>
                  <input
                    onChange={(e) => setDiploma_number(e.target.value)}
                    type="text"
                    className={styles.Education_info_change_inp}
                  />
                </li>

                <li className={styles.Education_list_true}>
                  <h3 className={styles.Education_title}>Ученая степень</h3>
                  <input
                    onChange={(e) => setAcademic_degree(e.target.value)}
                    type="text"
                    className={styles.Education_info_change_inp}
                  />
                </li>

                <li className={styles.Education_list_true}>
                  <h3 className={styles.Education_title}>Ученое звание</h3>
                  <input
                    onChange={(e) => setAcademic_rank(e.target.value)}
                    type="text"
                    className={styles.Education_info_change_inp}
                  />
                </li>

                <button
                  onClick={() => setEnglish(true)}
                  className={styles.change_btn_Cancel}
                >
                  <p>Добавить данные на других языках</p>
                </button>
              </ul>
              {english ? (
                <ul className={styles.Education_desc}>
                  <li className={styles.Education_list_true}>
                    <h3 className={styles.Education_title}>
                      билим берүү мекемеси
                    </h3>
                    <input
                      onChange={(e) => setInstitutionKy(e.target.value)}
                      type="text"
                      className={styles.Education_info_change_inp}
                    />
                  </li>

                  <li className={styles.Education_list_true}>
                    <h3 className={styles.Education_title}>Факультет/бөлүм</h3>
                    <input
                      onChange={(e) => setDepartmentKy(e.target.value)}
                      type="text"
                      className={styles.Education_info_change_inp}
                    />
                  </li>

                  <li className={styles.Education_list_true}>
                    <h3 className={styles.Education_title}>Тренингдин түрү</h3>
                    <input
                      onChange={(e) => setFormKy(e.target.value)}
                      type="text"
                      className={styles.Education_info_change_inp}
                    />
                  </li>

                  <li className={styles.Education_list_true}>
                    <h3 className={styles.Education_title}>Кирген жылы</h3>
                    <input
                      onChange={(e) => setEnteredKy(e.target.value)}
                      type="date"
                      className={styles.Education_info_change_inp}
                    />
                  </li>

                  <li className={styles.Education_list_true}>
                    <h3 className={styles.Education_title}>
                      Бүтүрүү / бүтүрүү жылы
                    </h3>
                    <input
                      onChange={(e) => setGraduatedKy(e.target.value)}
                      type="date"
                      className={styles.Education_info_change_inp}
                    />
                  </li>

                  <li className={styles.Education_list_true}>
                    <h3
                      className={styles.Education_title}
                      placeholder="Курс ухода"
                    >
                      Окууну бүтпөсө{' '}
                    </h3>
                    <input
                      onChange={(e) => setDisposedKy(e.target.value)}
                      type="text"
                      className={styles.Education_info_change_inp}
                    />
                  </li>

                  <li className={styles.Education_list_true}>
                    <h3 className={styles.Education_title}>Бүтүрүү адистиги</h3>
                    <input
                      onChange={(e) => setQualificationKy(e.target.value)}
                      type="text"
                      className={styles.Education_info_change_inp}
                    />
                  </li>

                  <li className={styles.Education_list_true}>
                    <h3 className={styles.Education_title}>Диплом номери</h3>
                    <input
                      onChange={(e) => setDiploma_numberKy(e.target.value)}
                      type="text"
                      className={styles.Education_info_change_inp}
                    />
                  </li>

                  <li className={styles.Education_list_true}>
                    <h3 className={styles.Education_title}>
                      Академиялык даража
                    </h3>
                    <input
                      onChange={(e) => setAcademic_degreeKy(e.target.value)}
                      type="text"
                      className={styles.Education_info_change_inp}
                    />
                  </li>

                  <li className={styles.Education_list_true}>
                    <h3 className={styles.Education_title}>Академиялык наам</h3>
                    <input
                      onChange={(e) => setAcademic_rankKy(e.target.value)}
                      type="text"
                      className={styles.Education_info_change_inp}
                    />
                  </li>
                </ul>
              ) : null}

              <div className={styles.change_btn}>
                <button
                  onClick={() => setChange(false)}
                  className={styles.change_btn_Cancel}
                >
                  <p>Отмена</p>
                </button>
                <button
                  onClick={handleSubmit}
                  className={styles.change_btn_save}
                >
                  <p style={{ color: 'white' }}>Сохранить Изменения</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.Education}>
            <div className={styles.EducationHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Образование</h4>
              </div>
              <div className={styles.headerRight}>
                <img
                  src={pencil}
                  onClick={() => setChange(true)}
                  className={styles.headerRight_info}
                />
              </div>
            </div>

            <p
              style={{
                color: 'white',
                fontSize: '24px',
                width: '80%',
                textAlign: 'left',
                margin: 'auto',
                marginLeft: '8%',
                marginTop: '15px',
              }}
            >
              Высшее
            </p>
            <ul className={styles.Education_desc}>
              <li className={styles.Education_list}>
                <p className={styles.Education_title}>Учебное заведение</p>
                <p className={styles.Education_info}>
                  {education?.institution}
                </p>
              </li>

              <li className={styles.Education_list}>
                <p className={styles.Education_title}>Факультет</p>
                <p className={styles.Education_info}>{education?.department}</p>
              </li>

              <li className={styles.Education_list}>
                <p className={styles.Education_title}>Специальность</p>
                <p className={styles.Education_info}>
                  {education?.academic_degree}
                </p>
              </li>

              <li className={styles.Education_list}>
                <p className={styles.Education_title}>Начало обучения</p>
                <p className={styles.Education_info}>{education?.entered}</p>
              </li>

              <li className={styles.Education_list}>
                <p className={styles.Education_title}>Конец обучения</p>
                <p className={styles.Education_info}>{education?.graduated}</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default EducationInfo
