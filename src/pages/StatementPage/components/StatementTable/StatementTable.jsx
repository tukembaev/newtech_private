import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
    getRaport,
    getSendedForMeRaports,
} from 'service/StatementsService'
import {
    setSignedStatements,
    setStatements,
} from 'store/slices/StatementsSlice'
import styles from './StatementTable.module.scss'

function StatementTable({
  render,
  filterChoose,
  searchTerm,
  SearchByTitle,
  setFilterChoose,
}) {
  const [data, setData] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('')
  const [selectedFilterStatus, setSelectedFilterStatus] = useState(4)
  const [loading, setLoading] = useState(true)
  let filteredData
  const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const getData = async () => {
    try {
      if (filterChoose === 5 || filterChoose === 6) {
        let response = await getSendedForMeRaports(id, data)

        dispatch(
          setSignedStatements({
            signed_statements: response.data,
          }),
        )

        setData(response.data)
        setLoading(false)
      } else {
        let response = await getRaport(id, data)

        dispatch(
          setStatements({
            statements: response.data,
          }),
        )
        setData(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  const allStatements = useSelector((state) => state.statement)

  useEffect(() => {
    setLoading(true)
    getData()
  }, [render, filterChoose])

  if (filterChoose === 4 && selectedFilterStatus === 0) {
    filteredData = allStatements.statements.filter(
      (item) => item.status === 'В режиме ожидания',
    )
  } else if (filterChoose === 4 && selectedFilterStatus === 1) {
    let acts
    acts = allStatements.statements.filter(
      (item) =>
        item.status !== 'В режиме ожидания' &&
        item.status !== 'Завершена' &&
        item.status !== 'Отказано' &&
        item.status !== 'Ознакомлен' &&
        item.status !== 'В концелярии',
    )

    filteredData = [
      ...acts,
      ...allStatements.statements.filter(
        (item) => item.status === 'В процессе выполнения',
      ),
      ...allStatements.statements.filter(
        (item) => item.status === 'В процессе составления акта',
      ),
      ...allStatements.statements.filter(
        (item) => item.status === 'В процессе подтверждения',
      ),
    ]
  } else if (filterChoose === 4 && selectedFilterStatus === 2) {
    filteredData = allStatements.statements.filter((item) => {
      if (
        item.status === 'Завершена' ||
        item.status === 'Отказано' ||
        item.status === 'Ознакомлен'
      )
        return item
    })
  }
  if (filterChoose === 4 && selectedFilterStatus === 4) {
    filteredData = [...allStatements.statements]
  } else if (filterChoose === 5) {
    filteredData = [...allStatements.signed_statements]
  } else if (filterChoose === 6) {
    filteredData = allStatements.signed_statements.filter(
      (item) => item.status === 'В режиме ожидания',
    )
  }

  if (selectedFilter !== '' && selectedFilter !== 'Тип документа') {
    filteredData = filteredData.filter(
      (item) => item.type_doc === selectedFilter,
    )
  }

  return (
    <div className={styles.wrapper_table_body}>
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
              <span className={styles.table__title}>
                {' '}
                <select
                  className={styles.select__dropdown}
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="Тип документа">Тип документа</option>
                  <option value="Рапорт">Рапорт</option>
                  <option value="Заявление">Заявления</option>

                  {/* Add more options as needed */}
                </select>
              </span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Тема</span>
            </th>
            <th className={styles.table__item}>
              {filterChoose === 5 ? (
                <span className={styles.table__title}>Статус</span>
              ) : filterChoose === 6 ? (
                <span className={styles.table__title}>Статус</span>
              ) : (
                <span className={styles.table__title}>
                  {' '}
                  <select
                    className={styles.select__dropdown}
                    value={selectedFilterStatus}
                    onChange={(e) =>
                      setSelectedFilterStatus(parseInt(e.target.value))
                    }
                  >
                    <option value={4}>Статус</option>
                    <option value={0}>В режиме ожидания</option>
                    <option value={1}>Выполняются</option>
                    <option value={2}>Завершенные</option>

                    {/* Add more options as needed */}
                  </select>
                </span>
              )}
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Дата подачи</span>
            </th>
          </tr>
        </thead>
        <SkeletonTheme
          color="#f6f8f9"
          highlightColor="#f6f8f2"
          borderRadius="6px"
          height="8px"
          duration={1}
        >
          <tbody className={styles.table__body}>
            {loading
              ? // Отображение скелетона, когда loading равен true
                Array.from({ length: 12 }).map((_, index) => (
                  <tr key={index} className={styles.table__row}>
                    {[1, 2, 3, 4, 5, 6].map((cell, cellIndex) => (
                      <td
                        style={{ minWidth: cellIndex === 0 ? '165px' : '' }}
                        key={cell}
                        className={styles.table__item}
                      >
                        <Skeleton />
                      </td>
                    ))}
                  </tr>
                ))
              : // Отображение данных, когда loading равен false
                filteredData
                  ?.filter(unique)
                  .reverse()
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={styles.table__row}
                      onClick={() => navigate(`/statement/${item.id}`)}
                    >
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.number}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item?.employee?.surname} {item?.employee?.first_name}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.type_doc}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>{item.type}</span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.status}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.date_zayavki}
                        </span>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </SkeletonTheme>
      </table>
    </div>
  )
}

export default StatementTable
