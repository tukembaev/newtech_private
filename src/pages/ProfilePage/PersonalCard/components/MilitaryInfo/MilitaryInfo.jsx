import pencil from 'assets/icons/pencil.svg'
import Dropdown from 'components/Dropdown/Dropdown'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    getPersonalEmployee,
    patchPersonalEmployee,
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'
import userInfo from 'utils/userInfo'
import styles from './MilitaryInfo.module.scss'

const MilitaryInfo = () => {
  const [change, setChange] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [rank, setRank] = useState('')
  const [troop_kind, setTroop_kind] = useState('')
  const [is_fit, setIs_fit] = useState(true)
  const [draft_board, setDraft_board] = useState('')
  const [composition, setComposition] = useState('')
  const [specialty, setSpecialty] = useState('')

  const [english, setEnglish] = useState('')
  const [rankEn, setRankEn] = useState('')
  const [troop_kindEn, setTroop_kindEn] = useState('')
  const [is_fitEn, setIs_fitEn] = useState(true)
  const [draft_boardEn, setDraft_boardEn] = useState('')
  const [compositionEn, setCompositionEn] = useState('')
  const [specialtyEn, setSpecialtyEn] = useState('')

  const [kyrgyz, setKyrgyz] = useState(false)
  const [rankKy, setRankKy] = useState('')
  const [troop_kindKy, setTroop_kindKy] = useState('')
  const [is_fitKy, setIs_fitKy] = useState(true)
  const [draft_boardKy, setDraft_boardKy] = useState('')
  const [compositionKy, setCompositionKy] = useState('')
  const [specialtyKy, setSpecialtyKy] = useState('')

  const [render, setRender] = useState(false)
  const [id2, setId2] = useState('')
  const [type, setType] = useState('')
  const [typeEn, setTypeEn] = useState('')
  const [typeKy, setTypeKy] = useState('')
  const request_type = [
    { id: 0, label: 'Годен' },
    { id: 1, label: 'Не годен' },
  ]

  const request_typeEn = [
    { id: 0, label: 'Fit' },
    { id: 1, label: 'Not fit' },
  ]

  const request_typeKy = [
    { id: 0, label: 'жарактуу' },
    { id: 1, label: 'жарактуу эмес' },
  ]

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

  const military = info.military_registration

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      {
        type === 'Годен' ? setIs_fit(true) : setIs_fit(false)
      }
      let response = await patchPersonalEmployee(
        {
          military_registration: {
            rank,
            troop_kind,
            is_fit,
            draft_board,
            composition,
            specialty,
          },
        },
        'ru',
      )

      if (english) {
        {
          typeEn === 'Fit' ? setIs_fitEn(true) : setIs_fitEn(false)
        }
        let responseEN = await patchPersonalEmployee(
          {
            military_registration: {
              rank: rankEn,
              troop_kind: troop_kindEn,
              is_fit: is_fitEn,
              draft_board: draft_boardEn,
              composition: compositionEn,
              specialty: specialtyEn,
            },
          },
          'en',
        )
      }

      if (kyrgyz) {
        {
          typeKy === 'жарактуу' ? setIs_fitKy(true) : setIs_fitKy(false)
        }
        let responseKy = await patchPersonalEmployee(
          {
            military_registration: {
              rank: rankKy,
              troop_kind: troop_kindKy,
              is_fit: is_fitKy,
              draft_board: draft_boardKy,
              composition: compositionKy,
              specialty: specialtyKy,
            },
          },
          'ky',
        )
      }

      setNotify({
        isOpen: true,
        message: 'Военные данные установлены',
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
          <div className={styles.Military_true}>
            <div className={styles.MilitaryHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Воинский учет</h4>
              </div>
              <div className={styles.headerRight}></div>
            </div>
            <ul className={styles.Military_desc}>
              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>
                  Годность к военной службе
                </h3>
                {military?.is_fit ? (
                  <p className={styles.Military_info}>Годен</p>
                ) : (
                  <p className={styles.Military_info}>Не Годен</p>
                )}
              </li>

              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>
                  Военкомат по месту жительства
                </h3>
                <p className={styles.Military_info}>{military?.draft_board}</p>
              </li>

              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>Состав</h3>
                <p className={styles.Military_info}>{military?.composition}</p>
              </li>

              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>ВУС</h3>
                <p className={styles.Military_info}>{military?.rank}</p>
              </li>

              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>Воинское звание</h3>
                <p className={styles.Military_info}>{military?.specialty}</p>
              </li>

              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>Род войск</h3>
                <p className={styles.Military_info}>{military?.troop_kind}</p>
              </li>
            </ul>

            <div className={styles.Military_change_block}>
              <ul className={styles.Military_desc}>
                <div
                  className={styles.Military_list}
                  style={{ width: '280px', marginTop: '70px' }}
                >
                  <Dropdown
                    setId={setId2}
                    setType={setType}
                    title={'Годность к военной службе'}
                    data={request_type ?? []}
                  />
                </div>
                <li className={styles.Military_list}>
                  <h3 className={styles.Military_title}>
                    Военкомат по месту жительства
                  </h3>
                  <input
                    type="text"
                    className={styles.Military_info_change_inp}
                    value={draft_board}
                    onChange={(e) => setDraft_board(e.target.value)}
                  />
                </li>

                <li className={styles.Military_list}>
                  <h3 className={styles.Military_title}>Состав</h3>
                  <input
                    type="text"
                    className={styles.Military_info_change_inp}
                    value={composition}
                    onChange={(e) => setComposition(e.target.value)}
                  />
                </li>

                <li className={styles.Military_list}>
                  <h3 className={styles.Military_title}>ВУС</h3>
                  <input
                    type="text"
                    className={styles.Military_info_change_inp}
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                  />
                </li>

                <li className={styles.Military_list}>
                  <h3 className={styles.Military_title}>Воинское звание</h3>
                  <input
                    type="text"
                    className={styles.Military_info_change_inp}
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  />
                </li>

                <li className={styles.Military_list}>
                  <h3 className={styles.Military_title}>Род войск</h3>
                  <input
                    type="text"
                    className={styles.Military_info_change_inp}
                    value={troop_kind}
                    onChange={(e) => setTroop_kind(e.target.value)}
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
                <ul className={styles.Military_desc}>
                  <div
                    className={styles.Military_list}
                    style={{ width: '280px', marginTop: '70px' }}
                  >
                    <Dropdown
                      setId={setId2}
                      setType={setTypeEn}
                      title={'Eligibility for military service'}
                      data={request_typeEn ?? []}
                    />
                  </div>
                  <li className={styles.Military_list}>
                    <h3 className={styles.Military_title}>
                      Military enlistment office at the place of residence
                    </h3>
                    <input
                      type="text"
                      className={styles.Military_info_change_inp}
                      onChange={(e) => setDraft_boardEn(e.target.value)}
                    />
                  </li>

                  <li className={styles.Military_list}>
                    <h3 className={styles.Military_title}>composition</h3>
                    <input
                      type="text"
                      className={styles.Military_info_change_inp}
                      onChange={(e) => setCompositionEn(e.target.value)}
                    />
                  </li>

                  <li className={styles.Military_list}>
                    <h3 className={styles.Military_title}>VUS</h3>
                    <input
                      type="text"
                      className={styles.Military_info_change_inp}
                      onChange={(e) => setRankEn(e.target.value)}
                    />
                  </li>

                  <li className={styles.Military_list}>
                    <h3 className={styles.Military_title}>Military rank</h3>
                    <input
                      type="text"
                      className={styles.Military_info_change_inp}
                      onChange={(e) => setSpecialtyEn(e.target.value)}
                    />
                  </li>

                  <li className={styles.Military_list}>
                    <h3 className={styles.Military_title}>Type of army</h3>
                    <input
                      type="text"
                      className={styles.Military_info_change_inp}
                      onChange={(e) => setTroop_kindEn(e.target.value)}
                    />
                  </li>
                  <button
                    onClick={() => setKyrgyz(true)}
                    className={styles.change_btn_Cancel}
                  >
                    <p>Добавить данные на кыргызском языке</p>
                  </button>
                </ul>
              ) : null}

              {kyrgyz ? (
                <ul className={styles.Military_desc}>
                  <div
                    className={styles.Military_list}
                    style={{ width: '280px', marginTop: '70px' }}
                  >
                    <Dropdown
                      setId={setId2}
                      setType={setTypeKy}
                      title={'Аскердик кызматка жарамдуу'}
                      data={request_typeKy ?? []}
                    />
                  </div>
                  <li className={styles.Military_list}>
                    <h3 className={styles.Military_title}>
                      Жашаган жери боюнча аскер комиссариаты
                    </h3>
                    <input
                      type="text"
                      className={styles.Military_info_change_inp}
                      onChange={(e) => setDraft_boardKy(e.target.value)}
                    />
                  </li>

                  <li className={styles.Military_list}>
                    <h3 className={styles.Military_title}>курамы</h3>
                    <input
                      type="text"
                      className={styles.Military_info_change_inp}
                      onChange={(e) => setCompositionKy(e.target.value)}
                    />
                  </li>

                  <li className={styles.Military_list}>
                    <h3 className={styles.Military_title}>Вус</h3>
                    <input
                      type="text"
                      className={styles.Military_info_change_inp}
                      onChange={(e) => setRankKy(e.target.value)}
                    />
                  </li>

                  <li className={styles.Military_list}>
                    <h3 className={styles.Military_title}>Аскердик наам</h3>
                    <input
                      type="text"
                      className={styles.Military_info_change_inp}
                      onChange={(e) => setSpecialtyKy(e.target.value)}
                    />
                  </li>

                  <li className={styles.Military_list}>
                    <h3 className={styles.Military_title}>Армиянын түрү</h3>
                    <input
                      type="text"
                      className={styles.Military_info_change_inp}
                      onChange={(e) => setTroop_kindKy(e.target.value)}
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
          <div className={styles.Military}>
            <div className={styles.MilitaryHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Воинский учет</h4>
              </div>
              <div className={styles.headerRight}>
                <img
                  src={pencil}
                  onClick={() => setChange(true)}
                  className={styles.headerRight_info}
                />
              </div>
            </div>
            <ul className={styles.Military_desc}>
              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>
                  Годность к военной службе
                </h3>
                {military?.is_fit ? (
                  <p className={styles.Military_info}>Годен</p>
                ) : (
                  <p className={styles.Military_info}>Не Годен</p>
                )}
              </li>

              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>
                  Военкомат по месту жительства
                </h3>
                <p className={styles.Military_info}>{military?.draft_board}</p>
              </li>

              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>Состав</h3>
                <p className={styles.Military_info}>{military?.composition}</p>
              </li>

              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>ВУС</h3>
                <p className={styles.Military_info}>{military?.rank}</p>
              </li>

              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>Воинское звание</h3>
                <p className={styles.Military_info}>{military?.specialty}</p>
              </li>

              <li className={styles.Military_list}>
                <h3 className={styles.Military_title}>Род войск</h3>
                <p className={styles.Military_info}>{military?.troop_kind}</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default MilitaryInfo
