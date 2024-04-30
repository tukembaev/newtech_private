import { TextField } from '@mui/material'
import bucket from 'assets/icons/delete.svg'
import { Button } from 'components'
import Dropdown from 'components/Dropdown/Dropdown'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import useLoading from 'hooks/UseLoading/UseLoading'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { patchStageInfo } from 'service/ProjectService'
import { getCurrentDate } from 'utils/todayDateForInput'
import styles from './AddResources.module.scss'

const AddResources = ({ setState, setNotify }) => {
  const [idType, setIdType] = useState('')
  const [type_res, setType_Res] = useState('')
  const [title, setTitle] = useState('')
  const [entry_date, setEntry_date] = useState('')
  const [quantity, setQuantity] = useState('')
  const [cost, setCost] = useState('')
  const [data, setData] = useState([])
  const { loading, withLoading } = useLoading(false)
  const stageInfo = useSelector((state) => state.project.stageInfo)
  const [limit, setLimit] = useState(
    Number(stageInfo?.accounting?.current_budget),
  )

  const request_type = [
    { id: 0, label: 'кг.' },
    { id: 1, label: 'гр.' },
    { id: 2, label: 'л.' },
    { id: 3, label: 'мл.' },
    { id: 4, label: 'шт.' },
  ]
  const navigate = useNavigate()
  const { id } = useParams()
  const members = useSelector((state) => state.project.stageInfo)

  const handleChangeCost = (event, newValue) => {
    setCost(newValue)
  }
  const handleInputChange = (e) => {
    if (Number(e.target.value) <= limit) {
      setCost(Number(e.target.value))
    }
    return
  }

  const handleAddRes = () => {
    if (title === '') {
      setNotify({
        isOpen: true,
        message: 'Введите название ресурса',
        type: 'warning',
        sound: 'warning',
      })
    } else if (cost === '') {
      setNotify({
        isOpen: true,
        message: 'Укажите сумму ресурса',
        type: 'warning',
        sound: 'warning',
      })
    } else if (entry_date === '') {
      setNotify({
        isOpen: true,
        message: 'Укажите дату поступление',
        type: 'warning',
        sound: 'warning',
      })
    } else if (quantity === '') {
      setNotify({
        isOpen: true,
        message: 'Укажите количество',
        type: 'warning',
        sound: 'warning',
      })
    } else if (type_res === '') {
      setNotify({
        isOpen: true,
        message: 'Укажите единицу измерения',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      let quantityDouble = parseFloat(quantity)
      let costDouble = parseFloat(cost)
      const newIndex = data?.length

      setData((prev) => [
        ...prev,
        {
          id: newIndex,
          title,
          entry_date,
          unit: type_res,
          quantity: quantityDouble,
          cost: costDouble,
        },
      ])

      setNotify({
        isOpen: true,
        message: 'Ресурс успешно добавлен',
        type: 'success',
        sound: 'success',
      })
      setType_Res('')
      setTitle('')
      setEntry_date('')
      setQuantity('')
      setCost('')
      setLimit((prev) => prev - cost)
    }
  }

  const handleSubmit = async (event) => {
    try {
      await withLoading(async () => {
        const dataWithoutId = data?.map((item) => {
          const { id, ...rest } = item
          return rest
        })

        let response = await patchStageInfo(members.id, {
          resources: dataWithoutId,
        })

        setNotify({
          isOpen: true,
          message: 'Ресурсы успешно добавлены',
          type: 'success',
          sound: 'success',
        })
        setState({ isPaneOpen: true })
        navigate(-1)
      })
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
  const handleDeleteRes = (itemId) => {
    const updateLimit = data?.reduce((acc, item) => {
      if (itemId === item.id) {
        acc.cost = item.cost
      }
      return acc
    }, {})

    setLimit((prev) => prev + updateLimit?.cost)
    const newData = data?.filter((item) => item?.id !== itemId)
    setData(newData)
  }

  return (
    <div className={styles.add_res_wrapper}>
      <div className={styles.add_res_body}>
        <div className={styles.flex_col}>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
          >
            <h4 style={{ paddingBottom: '10px' }}>Название</h4>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.discription_input}
              maxLength={2000}
              placeholder="Название"
              required
            ></input>
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
          >
            <h4 style={{ paddingBottom: '10px' }}>Общая сумма</h4>

            <TextField
              type="number"
              onChange={handleInputChange}
              InputProps={{ inputProps: { min: '0', max: limit, step: '1' } }}
              value={cost}
              className={styles.discription_input2}
              maxLength={2000}
              placeholder={`Бюджет этапа : ${limit}`}
            />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
          >
            <h4 style={{ paddingBottom: '10px' }}>Дата поступления</h4>
            <input
              value={entry_date}
              onChange={(e) => setEntry_date(e.target.value)}
              type="date"
              className={styles.discription_input}
              placeholder="Дата поступления"
              max={getCurrentDate()}
              required
            ></input>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
          >
            <h4 style={{ paddingBottom: '10px' }}>Количество</h4>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={styles.discription_input}
              placeholder="Количество"
              type="number"
              required
            ></input>
          </div>

          <div style={{ width: '250px' }}>
            <h4 style={{ paddingBottom: '10px' }}>Единица измерения</h4>
            <Dropdown
              setId={setIdType}
              setType={setType_Res}
              title={'Единица измерения'}
              data={request_type ?? []}
            />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
          >
            <Button
              style={{ width: '250px' }}
              className={styles.add_pos}
              onClick={handleAddRes}
            >
              Добавить{' '}
            </Button>
          </div>

          {data?.length !== 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                overflowX: 'auto',
              }}
            >
              <table className={styles.table__wrapper}>
                <thead className={styles.table__head}>
                  <tr className={styles.table__row}>
                    <th className={styles.table__item}>
                      <span className={styles.table__title}>Название</span>
                    </th>
                    <th className={styles.table__item}>
                      <span className={styles.table__title}>Общая сумма</span>
                    </th>
                    <th className={styles.table__item}>
                      <span className={styles.table__title}>
                        Дата поступления{' '}
                      </span>
                    </th>
                    <th className={styles.table__item}>
                      <span className={styles.table__title}>Количество</span>
                    </th>
                    <th className={styles.table__item}>
                      <span className={styles.table__title}>
                        Единица измерения
                      </span>
                    </th>
                    <th className={styles.table__item}>
                      <span className={styles.table__title}></span>
                    </th>
                  </tr>
                </thead>

                <tbody className={styles.table__body}>
                  {data?.length !== 0 &&
                    data?.map((item) => (
                      <tr
                        className={styles.table__row}
                        style={{ zIndex: '1' }}
                        key={item?.id}
                      >
                        <td className={styles.table__item}>
                          <span
                            className={styles.table__title}
                            style={{ fontWeight: '700' }}
                          >
                            {item.title}
                          </span>
                        </td>
                        <td className={styles.table__item}>
                          <span className={styles.table__title}>
                            {item.cost}
                          </span>
                        </td>
                        <td className={styles.table__item}>
                          <span className={styles.table__title}>
                            {item.entry_date}
                          </span>
                        </td>
                        <td className={styles.table__item}>
                          <span className={styles.table__title}>
                            {item.quantity}
                          </span>
                        </td>{' '}
                        <td className={styles.table__item}>
                          <span className={styles.table__title}>
                            {item.unit}
                          </span>
                        </td>
                        <td className={styles.table__item}>
                          <img
                            onClick={() => handleDeleteRes(item?.id)}
                            className={styles.size}
                            src={bucket}
                            alt=""
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : null}
          <ButtonLoader loading={loading} position={'center'}>
            <Button
              style={{ width: '250px' }}
              className={styles.add_pos}
              onClick={handleSubmit}
            >
              Отправить{' '}
            </Button>
          </ButtonLoader>
        </div>
      </div>
    </div>
  )
}

export default AddResources
