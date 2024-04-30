import React, { useState } from 'react'
import styles from './personalCard.module.scss'
import userInfo from 'utils/userInfo'
import { Layout } from 'components'
import ActivityInfo from './components/ActivityInfo/ActivityInfo'
import ArrivalInfo from './components/ArrivalInfo/ArrivalInfo'
import DiplomaticRankInfo from './components/DiplomaticRankInfo/DiplomaticRankInfo'
import FamilyStatusInfo from './components/FamilyStatusInfo/FamilyStatusInfo'
import MilitaryInfo from './components/MilitaryInfo/MilitaryInfo'
import AwardsInfo from './components/AwardsInfo/AwardsInfo'
import ProfilePage from 'pages/ProfilePage/ProfilePage'
import VacationInfo from './components/VacationInfo/VacationInfo'
import EducationInfo from './components/EducationInfo/EducationInfo'
import BodyCheckInfo from './components/BodyCheckInfo/BodyCheckInfo'
import LocationInfo from './components/LocationInfo/LocationInfo'
import ManningTableInfo from './components/ManningTableInfo/ManningTableInfo'
import SubdivisionsInfo from './components/SubdivisionsInfo/SubdivisionsInfo'
import { getPersonalEmployee } from 'service/PersonalCardService'
import { useEffect } from 'react'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import { useDispatch, useSelector } from 'react-redux'
import TrainQualificationInfo from './components/TrainQualificationInfo/TrainQualificationInfo'
import { useNavigate } from 'react-router-dom'
import LanguagesInfo from './components/LanguagesInfo/LanguagesInfo'
import Passport from './components/PassportInfo/Passport'

const PersonalCard = () => {
  const [main, setMain] = useState(true)
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
      let response = await getPersonalEmployee(data, 'ru')

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

  return (
    <Layout>
      <div className={styles.personal_wrapper}>
        <div className={styles.header}>
          <h2 className={styles.Personal_Card}>Личная Карточка</h2>
          <div className={styles.header_body}>
            <div className={styles.personal_info}>
              <ProfilePage userId={user.userId} />
            </div>
            <div className={styles.Personal_info_right}>
              <button
                className={styles.btn1}
                onClick={() => navigate('/europass')}
              >
                Формировать резюме(Europass)
              </button>
            </div>
          </div>
        </div>
        {open.title !== '' ? (
          <div className={styles.bod1}>
            {open.title !== '' ? (
              <div>
                <button
                  className={styles.btn2}
                  style={{ float: 'left' }}
                  onClick={() => setOpen({ title: '' })}
                >
                  Меню
                </button>
              </div>
            ) : null}

            {open.title === 'diplom' ? (
              <DiplomaticRankInfo data={info} setRender={setRender} />
            ) : open.title === 'med' ? (
              <BodyCheckInfo data={info} setRender={setRender} />
            ) : open.title === 'place' ? (
              <LocationInfo data={info} setRender={setRender} />
            ) : open.title === 'prize' ? (
              <AwardsInfo data={info} setRender={setRender} />
            ) : open.title === 'education' ? (
              <EducationInfo data={info} setRender={setRender} />
            ) : open.title === 'weekend' ? (
              <VacationInfo data={info} setRender={setRender} />
            ) : open.title === 'abroad' ? (
              <ArrivalInfo data={info.abroad_stays} setRender={setRender} />
            ) : open.title === 'family' ? (
              <FamilyStatusInfo data={info} setRender={setRender} />
            ) : open.title === 'trud' ? (
              <ActivityInfo data={info} setRender={setRender} />
            ) : open.title === 'stepen' ? (
              <SubdivisionsInfo data={info} setRender={setRender} />
            ) : open.title === 'stat' ? (
              <ManningTableInfo data={info} setRender={setRender} />
            ) : open.title === 'military' ? (
              <MilitaryInfo data={info} setRender={setRender} />
            ) : open.title === 'trainqualification' ? (
              <TrainQualificationInfo data={info} setRender={setRender} />
            ) : open.title === 'passport' ? (
              <Passport data={info} setRender={setRender} />
            ) : open.title === 'languages' ? (
              <LanguagesInfo data={info} setRender={setRender} />
            ) : null}

            {open.title === '' ? (
              <>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'military' })}
                >
                  Воинский учет
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'diplom' })}
                >
                  Дипломатический ранг
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'med' })}
                >
                  Медосмотр
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'place' })}
                >
                  Место жительства
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'prize' })}
                >
                  Награды
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'education' })}
                >
                  Образование
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'weekend' })}
                >
                  Отпуск
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'abroad' })}
                >
                  Прибывание за границей
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'family' })}
                >
                  Семейное положение
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'trud' })}
                >
                  Трудовая деятельность
                </button>
                {/* <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: "stepen" })}
                >
                  Ученная степень/Звание
                </button> */}
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'stat' })}
                >
                  Штатное расписание
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'trainqualification' })}
                >
                  Повышение квалификации
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'languages' })}
                >
                  Знание языков
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'passport' })}
                >
                  Персональные данные
                </button>
              </>
            ) : null}
          </div>
        ) : (
          <div className={styles.body}>
            {open.title !== '' ? (
              <div>
                <button
                  className={styles.btn1}
                  style={{ float: 'left' }}
                  onClick={() => setOpen({ title: '' })}
                >
                  Меню
                </button>
              </div>
            ) : null}

            {open.title === 'diplom' ? (
              <DiplomaticRankInfo data={info} setRender={setRender} />
            ) : open.title === 'med' ? (
              <BodyCheckInfo data={info} setRender={setRender} />
            ) : open.title === 'place' ? (
              <LocationInfo data={info} setRender={setRender} />
            ) : open.title === 'prize' ? (
              <AwardsInfo data={info} setRender={setRender} />
            ) : open.title === 'education' ? (
              <EducationInfo data={info} setRender={setRender} />
            ) : open.title === 'weekend' ? (
              <VacationInfo data={info} setRender={setRender} />
            ) : open.title === 'abroad' ? (
              <ArrivalInfo data={info.abroad_stays} setRender={setRender} />
            ) : open.title === 'family' ? (
              <FamilyStatusInfo data={info} setRender={setRender} />
            ) : open.title === 'trud' ? (
              <ActivityInfo data={info} setRender={setRender} />
            ) : open.title === 'stepen' ? (
              <SubdivisionsInfo data={info} setRender={setRender} />
            ) : open.title === 'stat' ? (
              <ManningTableInfo data={info} setRender={setRender} />
            ) : open.title === 'military' ? (
              <MilitaryInfo data={info} setRender={setRender} />
            ) : open.title === 'trainqualification' ? (
              <TrainQualificationInfo data={info} setRender={setRender} />
            ) : open.title === 'passport' ? (
              <Passport data={info} setRender={setRender} />
            ) : open.title === 'languages' ? (
              <LanguagesInfo data={info} setRender={setRender} />
            ) : null}

            {open.title === '' ? (
              <>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'military' })}
                >
                  Воинский учет
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'diplom' })}
                >
                  Дипломатический ранг
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'med' })}
                >
                  Медосмотр
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'place' })}
                >
                  Место жительства
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'prize' })}
                >
                  Награды
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'education' })}
                >
                  Образование
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'weekend' })}
                >
                  Отпуск
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'abroad' })}
                >
                  Прибывание за границей
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'family' })}
                >
                  Семейное положение
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'trud' })}
                >
                  Трудовая деятельность
                </button>
                {/* <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: "stepen" })}
                >
                  Ученная степень/Звание
                </button> */}
                {/* <button
                className={styles.btn1}
                onClick={() => setOpen({ title: "stat" })}
              >
                Штатное расписание
              </button> */}
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'trainqualification' })}
                >
                  Повышение квалификации
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'languages' })}
                >
                  Знание языков
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpen({ title: 'passport' })}
                >
                  Персональные данные
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default PersonalCard
