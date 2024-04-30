import React, { useEffect, useState } from 'react'
import styles from './ProjectExpansesPage.module.scss'
import { Layout } from 'components'
import { useSelector } from 'react-redux'
import right from 'assets/icons/chevron_right.png'
import { useNavigate } from 'react-router-dom'
import Notification from 'utils/Notifications'
import { getAllProjectExpenses } from 'service/ProjectService'

const ProjectExpansesPage = () => {
  const [data, setData] = useState()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  const navigate = useNavigate()
  const projectInfo = useSelector((state) => state.project.projectInfo)
  const getData = async () => {
    try {
      let response = await getAllProjectExpenses(projectInfo.id, data)
      setData(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  return (
    <Layout>
      <div className={styles.team__wrapper}>
        <div className={styles.team__header}>
          <div className={styles.title}>
            <span
              onClick={() => navigate(`/project/${projectInfo.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {projectInfo.title}
            </span>
            <img
              src={right}
              alt=""
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                verticalAlign: 'middle',
              }}
            />
            <span style={{ color: 'black' }}>История</span>
          </div>
        </div>
        <div className={styles.member_add_header}>
          <div>
            <h3>История расходов и прибыли</h3>
            <input
              className={styles.search}
              placeholder="Поиск по названию"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className={styles.team__body}>
          <table className={styles.table__wrapper}>
            <thead className={styles.table__head}>
              <tr className={styles.table__row}>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>
                    <select
                      className={styles.select__dropdown}
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value.toLowerCase())
                      }
                    >
                      <option value="">Все</option>
                      <option value="выделено">Выделено</option>
                      <option value="переведено">Перевод</option>
                      <option value="увеличен бюджет">
                        Увеличение бюджета
                      </option>
                      <option value="увеличен прибыли">
                        Увеличение прибыли
                      </option>
                    </select>
                  </span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Сумма </span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Дата расхода</span>
                </th>
              </tr>
            </thead>

            <tbody className={styles.table__body}>
              {data
                ?.filter((item) =>
                  item.action.toLowerCase().includes(searchTerm),
                )
                .map((item) => (
                  <tr>
                    <td className={styles.table__item}>
                      <span
                        className={styles.table__title}
                        style={{ fontWeight: '700' }}
                      >
                        {item.action}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.amount}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.created}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default ProjectExpansesPage
