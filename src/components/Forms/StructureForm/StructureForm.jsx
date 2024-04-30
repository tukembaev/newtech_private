
import { Layout } from 'components'
import Dropdown from 'components/Dropdown/Dropdown'
import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createStructureData } from 'service/StructureService'
import Notification from 'utils/Notifications'
import styles from './StructureForm.module.scss'
import DynamicFields from './components/DynamicFields'

const StructureForm = () => {
  const [organization, setOrganization] = useState()
  const [finishedStructer, setFinishedStructer] = useState([])
  const [dynamicInput, setDynamicInput] = useState([])
  const [dynamicInputBranch, setDynamicInputBranch] = useState([])
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [id, setId] = useState()
  const [idBranch, setIdBranch] = useState()
  const dispatch = useDispatch()
  const [type, setType] = useState()
  const [typeBranch, setTypeBranch] = useState()

  const isDepartment = useMemo(() => {
    if (dynamicInput.length === 1 && type === 'Отдел') {
      return true
    }
    return false
  }, [type])

  const isDepartmentBranch = useMemo(() => {
    if (dynamicInputBranch.length === 1 && typeBranch === 'Отдел') {
      return true
    }
    return false
  }, [typeBranch])
  const handleClear = (deleteManagement) => {
    if (deleteManagement) {
      setDynamicInput([])
    } else {
      setDynamicInputBranch([])
    }
  }

  const handleAddComponent = () => {
    setDynamicInput((prevComponents) => [
      ...prevComponents,
      { id: Date.now(), title: '' },
    ])
  }

  const handleAddComponentBranch = () => {
    setDynamicInputBranch((prevComponents) => [
      ...prevComponents,
      { id: Date.now(), title: '' },
    ])
  }
  const handleValueChange = (id, newValue, branches) => {
    setDynamicInput((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === id) {
          if (isDepartment) {
            return { ...component, title: newValue, subbranches: branches }
          } else {
            return { ...component, title: newValue, branches: branches }
          }
        }
        return component
      }),
    )
  }

  const handleValueChangeBranch = (id, newValue, branches) => {
    setDynamicInputBranch((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === id) {
          if (isDepartmentBranch) {
            return { ...component, title: newValue, subbranches: branches }
          } else {
            return { ...component, title: newValue, branches: branches }
          }
        }
        return component
      }),
    )
  }
  let request_type = [{ id: 0, label: 'Управление' }]
  let request_type_branch = [{ id: 0, label: 'Отдел' }]

  function removeIds(json) {
    return JSON.parse(JSON.stringify(json), function (key, value) {
      if (key === 'id') {
        return undefined
      }
      return value
    })
  }

  const navigate = useNavigate()
  // function handleClick() {
  //   let result = dynamicInput.map(removeIds);
  //   let res;
  //   if (isDepartment) {
  //     res = [{ title: organization, branches: result }];
  //   } else {
  //     res = [{ title: organization, managements: result }];
  //   }

  //   console.log(...res);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (type === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не указали тему документа',
        type: 'warning',
        sound: 'warning',
      })
    } else
      try {
        let result = dynamicInput.map(removeIds)
        let result2 = dynamicInputBranch.map(removeIds)
        let res

        res = { title: organization, managements: result, branches: result2 }

        let response = await createStructureData(res)

        setNotify({
          isOpen: true,
          message: 'Структура добавлена',
          type: 'success',
          sound: 'success',
        })

        // setRender(true)
        navigate('/structure')
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

  return (
    <Layout>
      <div className={styles.structure_wrapper}>
        <div className={styles.heading}>
          <h2>Новая структура</h2>
        </div>

        <div className={styles.body}>
          <div className={styles.structure_form}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'auto',
              }}
            >
              <h3>Название организации</h3>
              <input
                type="text"
                placeholder="Введите название организации"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className={styles.title}
              />
              <div style={{ display: 'flex', gap: '15px' }}>
                {dynamicInput.length !== 0 ? (
                  <button
                    onClick={() => handleClear(true)}
                    className={styles.btn_clear}
                  >
                    Очистить Управления
                  </button>
                ) : (
                  ''
                )}

                {dynamicInputBranch.length !== 0 ? (
                  <button
                    onClick={() => handleClear(false)}
                    className={styles.btn_clear}
                  >
                    Очистить Отделы
                  </button>
                ) : (
                  ''
                )}
              </div>
              {dynamicInputBranch.length !== 0 ? (
                ''
              ) : (
                <>
                  <h3 style={{ paddingTop: '15px' }}>Добавление управлений</h3>
                  {dynamicInput.length === 0 ? (
                    <div style={{ width: '260px' }}>
                      <Dropdown
                        setId={setId}
                        setType={setType}
                        handleAddComponent={handleAddComponent}
                        title={'Добавить управление'}
                        data={request_type ?? []}
                      />
                    </div>
                  ) : (
                    ''
                  )}

                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      paddingTop: '25px',
                      flexDirection: 'column',
                    }}
                  >
                    {dynamicInput.map((component) => (
                      <DynamicFields
                        key={component.id}
                        title={organization}
                        type={type}
                        department={isDepartment}
                        component={component}
                        onValueChange={handleValueChange}
                        handleAddComponent={handleAddComponent}
                        request_type={request_type}
                      />
                    ))}
                  </div>
                </>
              )}

              {dynamicInput.length !== 0 ? (
                ''
              ) : (
                <>
                  <h3 style={{ paddingTop: '20px' }}>Добавление отделов</h3>
                  {dynamicInputBranch.length === 0 ? (
                    <div style={{ width: '260px' }}>
                      <Dropdown
                        setId={setIdBranch}
                        setType={setTypeBranch}
                        handleAddComponent={handleAddComponentBranch}
                        title={'Добавить отдел'}
                        data={request_type_branch ?? []}
                      />
                    </div>
                  ) : (
                    ''
                  )}

                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      paddingTop: '25px',
                      flexDirection: 'column',
                    }}
                  >
                    {dynamicInputBranch.map((component) => (
                      <DynamicFields
                        key={component.id}
                        title={organization}
                        type={typeBranch}
                        department={isDepartmentBranch}
                        component={component}
                        onValueChange={handleValueChangeBranch}
                        handleAddComponent={handleAddComponentBranch}
                        request_type={request_type_branch}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* <button className={styles.btn_add_field}><h5>Добавить поле </h5></button> */}
            </div>
            <button
              className={styles.btn_save_structure}
              onClick={handleSubmit}
            >
              <h5>Сохранить структуру</h5>
            </button>
          </div>
        </div>
      </div>

      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  )
}

export default StructureForm
