import React, { useEffect, useState } from 'react'
import styles from './StructurePage.module.scss'
import { Layout } from 'components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getStructureDataId,
  getUserStructure,
} from 'service/StructureService'
import {
  setAllMineStructure,
  setStructureInfoById,
} from 'store/slices/StructureSlice'
import StructureTree from './components/TreeStructure/StructureTree'

const StructurePage = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [render, setRender] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const getData = async () => {
    try {
      let response = await getStructureDataId(data)
      dispatch(
        setStructureInfoById({
          structureInfo: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    getData()
  }, [render])
  const info = useSelector((state) => state.structure.structureInfo)
  useEffect(() => {
    if (location.pathname === '/structure') {
      // Выполните необходимые действия для обработки перехода на страницу "/add-structure"
      // Например, обновите состояние или вызовите функцию getData()
      setRender(true)
    }
  }, [location])

  return (
    <Layout>
      <div className={styles.structure_wrapper}>
        <div className={styles.heading}>
          {info.length === 0 ? <h2>Структура</h2> : <h2>Структура {title}</h2>}
          {info.length === 0 ? (
            <button
              className={styles.btn_add_structure}
              onClick={() => navigate('/add-structure')}
            >
              Создать структуру
            </button>
          ) : (
            ''
          )}
        </div>

        <div className={styles.body}>
          {info.length === 0 ? (
            <h2 style={{ color: 'white' }}>Пусто! Создайте структуру</h2>
          ) : (
            <StructureTree data={info[0]} setTitle={setTitle} />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default StructurePage
