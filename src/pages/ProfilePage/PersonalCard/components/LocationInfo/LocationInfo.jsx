import pencil from 'assets/icons/pencil.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getPersonalEmployee,
    patchPersonalEmployee,
} from 'service/PersonalCardService'
import { setPersonalInfo } from 'store/slices/PersonalCard'
import Notification from 'utils/Notifications'
import styles from './LocationInfo.module.scss'

const LocationInfo = () => {
  const [change, setChange] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [village, setVillage] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [street, setStreet] = useState('')
  const [city_district, setCity_district] = useState('')
  const [region_district, setRegion_district] = useState('')

  let data
  const dispatch = useDispatch()
  const [render, setRender] = useState(false)

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let response = await patchPersonalEmployee(
        {
          residence_place: {
            country,
            region,
            village,
            city,
            city_district,
            region_district,
            street,
          },
        },
        'ru',
      )

      setNotify({
        isOpen: true,
        message: 'Место жительства установлено',
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

  const info = useSelector((state) => state.personalcard.personal_info)
  const locations = info.residence_place

  return (
    <div className={styles.wrapper}>
      <div style={{ width: '100%', height: '100%' }}>
        {change ? (
          <div className={styles.Location_true}>
            <div className={styles.LocationHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Место жительства</h4>
              </div>
              <div className={styles.headerRight}></div>
            </div>

            <ul className={styles.Location_desc}>
              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Страна:</p>
                <p className={styles.Location_info}>{locations?.country}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Область:</p>
                <p className={styles.Location_info}>{locations?.region}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Районы областей:</p>
                <p className={styles.Location_info}>
                  {locations?.region_district}
                </p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Город:</p>
                <p className={styles.Location_info}>{locations?.city}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Село:</p>
                <p className={styles.Location_info}>{locations?.village}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Районы города:</p>
                <p className={styles.Location_info}>
                  {locations?.city_district}
                </p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Улица:</p>
                <p className={styles.Location_info}>{locations?.street}</p>
              </li>
            </ul>

            <div className={styles.Location_change_block}>
              <ul className={styles.Location_desc_true}>
                <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Страна</h3>
                  <input
                    type="text"
                    className={styles.Location_info_change_inp}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </li>

                <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Область</h3>
                  <input
                    type="text"
                    className={styles.Location_info_change_inp}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </li>

                <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Районы областей</h3>
                  <input
                    type="text"
                    className={styles.Location_info_change_inp}
                    onChange={(e) => setRegion_district(e.target.value)}
                  />
                </li>

                <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Город</h3>

                  <input
                    type="text"
                    className={styles.Location_info_change_inp}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </li>

                <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Село</h3>
                  <input
                    type="text"
                    className={styles.Location_info_change_inp}
                    onChange={(e) => setVillage(e.target.value)}
                  />
                </li>

                <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Районы города</h3>
                  <input
                    type="text"
                    className={styles.Location_info_change_inp}
                    onChange={(e) => setCity_district(e.target.value)}
                  />
                </li>

                <li className={styles.Location_list_true}>
                  <h3 className={styles.Location_title}>Улица</h3>
                  <input
                    type="text"
                    className={styles.Location_info_change_inp}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </li>
              </ul>
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
          <div className={styles.Location}>
            <div className={styles.LocationHeader}>
              <div className={styles.header_left}>
                <h4 className={styles.header_left_info}>Место жительства</h4>
              </div>
              <div className={styles.headerRight}>
                <img
                  src={pencil}
                  onClick={() => setChange(true)}
                  className={styles.headerRight_info}
                />
              </div>
            </div>

            <ul className={styles.Location_desc}>
              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Страна:</p>
                <p className={styles.Location_info}>{locations?.country}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Область:</p>
                <p className={styles.Location_info}>{locations?.region}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Районы областей:</p>
                <p className={styles.Location_info}>
                  {locations?.region_district}
                </p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Город:</p>
                <p className={styles.Location_info}>{locations?.city}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Село:</p>
                <p className={styles.Location_info}>{locations?.village}</p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Районы города:</p>
                <p className={styles.Location_info}>
                  {locations?.city_district}
                </p>
              </li>

              <li className={styles.Location_list}>
                <p className={styles.Location_title}>Улица:</p>
                <p className={styles.Location_info}>{locations?.street}</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default LocationInfo
