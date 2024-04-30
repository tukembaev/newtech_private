import React, { useEffect, useState } from 'react'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { Button, Layout } from 'components'
import StatementForm from 'components/Forms/StatementForm/StatementForm'
import styles from './StatementPage.module.scss'
import StatementTable from './components/StatementTable/StatementTable'

import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import EmployeeRoleSelect from 'hooks/EmployeeSelect/EmployeeRoleSelect'
import EmployeeSelectUserId from 'hooks/EmployeeSelect/EmployeeSelectUserId'
import EmployeeStatusSelect from 'hooks/EmployeeSelect/EmployeeStatusSelect'
import EmployeeTypeSelect from 'hooks/EmployeeSelect/EmployeeTypeSelect'
import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import { RequestReportStatement } from 'service/StatementsService'
import SlidingPaneUtil from 'utils/SlidingPaneUtil'
import userInfo from 'utils/userInfo'
import StatementReportTable from './components/StatementTable/StatementReportTable'
function StatementPage() {
  const [width, setWidth] = useState(window.innerWidth)
  const [filterChoose, setFilterChoose] = useState(5)
  const [selectedFilter, setSelectedFilter] = useState('')
  const [render, setRender] = useState(false)
  const [SearchByTitle, setSearchByTitle] = useState()
  const [searchTerm, setSearchTerm] = useState()

  const [openModal, setOpenModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [selectedEmployeeLabel, setSelectedEmployeeLabel] = useState([])
  const [selectedRole, setSelectedRole] = useState([])
  const [selectedRoleLabel, setSelectedRoleLabel] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [responseInfo, setResponseInfo] = useState(null)

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Simpleraport',
  })

  const handleSubmitReport = async () => {
    try {
      let response = await RequestReportStatement({
        employees: selectedEmployee,
        roles: selectedRole,
        type_doc: selectedType,
        statuses: selectedStatus.includes('Все') ? [] : selectedStatus,
        startDate: startDate,
        endDate: endDate,
      })

      setResponseInfo([...response.data.STATEMENT])
      setOpenModal(false)
    } catch (error) {
      console.log(error.response)

      setOpenModal(false)
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])
  useEffect(() => {
    width < 600 && handleSideNavToggle()
  })

  function handleSideNavToggle() {}

  const user = userInfo()
  const navigate = useNavigate()

  useEffect(() => {
    setRender(false)
  }, [render])

  const allStatements = useSelector((state) => state.statement)
  const [idSearch, setIdSearch] = useState(1)
  const [typeSearch, setTypeSearch] = useState('')
  const filter = [
    { id: 1, label: 'По названию' },
    { id: 2, label: 'По ответственному' },
  ]

  return (
    <Layout>
      {responseInfo === null ? (
        <div className={styles.wrapper}>
          <div className={styles.titile__wrapper}>
            <select
              className={styles.title}
              value={filterChoose}
              onChange={(e) => setFilterChoose(parseInt(e.target.value))}
            >
              <option value={5}>Все</option>
              <option value={6}>Входящие</option>
              <option value={4}>Мои обращения</option>
            </select>
            <div style={{ display: 'flex' }}>
              <Button
                className="create__statement__btn"
                onClick={() => setState({ isPaneOpen: true })}
              >
                Создать
              </Button>
              <Button
                className="create__statement__btn"
                onClick={() => setOpenModal(true)}
                style={{ marginLeft: '15px' }}
              >
                Создать отчет
              </Button>
            </div>
            <>
              {width > 600 ? (
                <SlidingPaneUtil
                  size="50%"
                  title="Новое обращение"
                  state={state}
                  setState={setState}
                >
                  <StatementForm setRender={setRender} setState={setState} />{' '}
                </SlidingPaneUtil>
              ) : (
                <SlidingPaneUtil
                  size="100%"
                  title="Новый обращение"
                  state={state}
                  setState={setState}
                >
                  <StatementForm setRender={setRender} setState={setState} />{' '}
                </SlidingPaneUtil>
              )}
            </>
          </div>

          <StatementTable
            render={render}
            filterChoose={filterChoose}
            setFilterChoose={setFilterChoose}
            searchTerm={searchTerm}
            SearchByTitle={SearchByTitle}
          />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <style>
            {`
      @media print {
        /* Стили, применяемые при печати */
        body {
          background-color: white;
          font-size: 12pt;
 
        }
        /* Пример стилизации элементов при печати */
        .print-only {
          padding: 15px;
          color: white;
        }
        /* Стилизация элемента h4 при печати */
        .print-only h4 {
          color: black !important;
        }
      }
    `}
          </style>
          <div className={styles.titile__wrapper}>
            <Button
              className="create__statement__btn"
              onClick={() => navigate(-1)}
              style={{ marginLeft: '15px', marginTop: '15px' }}
            >
              Назад
            </Button>
            <Button
              className="create__statement__btn"
              onClick={handlePrint}
              style={{ marginLeft: '15px', marginTop: '15px' }}
            >
              Распечатать
            </Button>
          </div>
          <div className="print-only" ref={componentRef}>
            <h4
              style={{
                color: 'black',
                paddingLeft: '15px',
                paddingTop: '15px',
              }}
            >
              Выбранные сотрудники:{' '}
              {selectedEmployeeLabel &&
                selectedEmployeeLabel.map((item) => (
                  <span style={{ paddingLeft: '4px' }}>{item}</span>
                ))}
            </h4>
            <h4 style={{ color: 'black', paddingLeft: '15px' }}>
              Выбранная роль: {selectedRole}
            </h4>
            <h4 style={{ color: 'black', paddingLeft: '15px' }}>
              Выбранный тип:{' '}
              {selectedType &&
                selectedType.map((item) => (
                  <span style={{ paddingLeft: '4px' }}>{item}</span>
                ))}
            </h4>

            <h4 style={{ color: 'black', paddingLeft: '15px' }}>
              Выбранный статус: {selectedStatus}
            </h4>
            <h4 style={{ color: 'black', paddingLeft: '15px' }}>
              Начало: {startDate}
            </h4>
            <h4
              style={{
                paddingBottom: '10px',
                color: 'black',
                paddingLeft: '15px',
              }}
            >
              Конец: {endDate}
            </h4>
            <StatementReportTable data={responseInfo} />
          </div>
        </div>
      )}

      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={'Создать отчет'}
      >
        <div
          className={styles.modal_report__wrapper}
          style={{ gap: '25px', flexDirection: 'column' }}
        >
          {user.is_admin_of ? (
            <EmployeeSelectUserId
              selectedEmployee={setSelectedEmployee}
              setSelectedEmployeeLabel={setSelectedEmployeeLabel}
              service={'document'}
              isMulti={true}
            />
          ) : (
            ''
          )}
          <EmployeeRoleSelect
            isStatement={true}
            setSelectedRole={setSelectedRole}
            isMulti={false}
          />
          <EmployeeTypeSelect
            setSelectedType={setSelectedType}
            isMulti={true}
          />
          <EmployeeStatusSelect
            setSelectedStatus={setSelectedStatus}
            isMulti={true}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                width: '48%',
              }}
            >
              <h4>с </h4>
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                name="start"
                required
                className={styles.discription_input}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                width: '48%',
              }}
            >
              <h4>по</h4>
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                name="end"
                required
                className={styles.discription_input}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className={styles.btn_pin_close}
              onClick={() => setOpenModal(false)}
            >
              Закрыть
            </button>
            <button className={styles.btn_pin} onClick={handleSubmitReport}>
              Создать
            </button>
          </div>
        </div>
      </ModalWindow>
    </Layout>
  )
}

export default StatementPage
