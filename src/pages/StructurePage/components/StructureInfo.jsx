import React, { useEffect, useState } from 'react'
import styles from './StructureInfo.module.scss'
import { Layout } from 'components'
import { useNavigate, useParams } from 'react-router-dom'
import StructureTree from './TreeStructure/StructureTree'
import { useDispatch, useSelector } from 'react-redux'
import { setStructureInfoById } from 'store/slices/StructureSlice'
import { getStructureDataId } from 'service/StructureService'
const StructureInfo = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const [render, setRender] = useState(false)
  const { id } = useParams()
  const getData = async () => {
    try {
      let response = await getStructureDataId(id, data)
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
    setRender(false)
  }, [render])
  const info = useSelector((state) => state.structure.structureInfo)

  return (
    <Layout>
      <div className={styles.structure_wrapper}>
        <div className={styles.heading}>
          <h2 style={{ paddingBottom: '15px' }}>Структура {info?.title}</h2>
        </div>

        <div className={styles.body}>
          <StructureTree setRender={setRender} data={info ?? []} />
        </div>
      </div>
    </Layout>
  )
}

export default StructureInfo
