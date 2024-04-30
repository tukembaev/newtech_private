import styles from 'pages/StatementPage/components/StatementTable/StatementTable.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getAllSupport,
  getEmployeeSupport,
} from 'service/SupportService'
import {
  setSupportByAll
} from 'store/slices/SupportSlice'
import userInfo from 'utils/userInfo'

const SupportTable = ({ render, filterChoose }) => {
  const [data, setData] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const user = userInfo()
  let filteredData
  const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const getData = async () => {
    if (user.is_support_of) {
      setIsAdmin(true)
      try {
        let response = await getAllSupport(data)
        dispatch(
          setSupportByAll({
            supportAll: response.data,
          }),
        )
        setData(response.data)
      } catch (error) {
        console.log(error.response)
      }
    } else {
      try {
        let response = await getEmployeeSupport(data)
        dispatch(
          setSupportByAll({
            supportAll: response.data,
          }),
        )
        setData(response.data)
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  const allSupports = useSelector((state) => state.support.supportAll.appeals)

  useEffect(() => {
    getData()
  }, [render])

  if (filterChoose === 0) {
    filteredData = allSupports?.filter(
      (item) => item.status === 'На рассмотрении',
    )
  } else {
    filteredData = allSupports?.filter(
      (item) => item.status !== 'На рассмотрении',
    )
  }

  return (
    <table className={styles.table__wrapper}>
      <thead className={styles.table__head}>
        <tr className={styles.table__row}>
          <th className={styles.table__item}>
            <span className={styles.table__title}>Номер</span>
          </th>
          <th className={styles.table__item}>
            <span className={styles.table__title}>Заявитель</span>
          </th>
          <th className={styles.table__item}>
            <span className={styles.table__title}>Тип</span>
          </th>
          <th className={styles.table__item}>
            <span className={styles.table__title}>Статус</span>
          </th>
          <th className={styles.table__item}>
            <span className={styles.table__title}>Дата отправки</span>
          </th>
        </tr>
      </thead>
      <tbody className={styles.table__body}>
        {filteredData
          ?.filter(unique)
          .reverse()
          .map((item, index) => {
            return (
              <tr
                key={index}
                className={styles.table__row}
                onClick={() => navigate(`/support/${item.id}`)}
              >
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {item.request_num}
                  </span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {item?.employee?.first_name} {item?.employee?.surname}
                  </span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {item.request_type}
                  </span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item.status}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {item.create_date}
                  </span>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default SupportTable
