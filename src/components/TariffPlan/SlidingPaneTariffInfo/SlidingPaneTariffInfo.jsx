import ModalWindow from 'hooks/ModalWindow/ModalWindow'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import {
    getTariffOrders,
    getTariffSubscription,
} from 'service/TariffService'
import { setMyTariff, setOrderTariffs } from 'store/slices/TariffSlice'

import CustomServiceForm from 'components/Forms/TariffForm/CustomServiceForm/CustomServiceForm'
import CustomTariffForm from 'components/Forms/TariffForm/CustomTariffForm/CustomTariffForm'
import SlidingPaneTariffCards from '../SlidingPaneTariffCards/SlidingPaneTariffCards'
import UserTariffPlan from '../SlidingPaneTariffCards/UserTariffPlan'
import styles from './SlidingPaneTariffInfo.module.scss'
import SlidingPaneOrders from './components/SlidingPaneOrders'
const SlidingPaneTariffInfo = () => {
  const [data, setData] = useState()
  const [constructor, setConstructor] = useState(false)
  const [microservice, setMicroservice] = useState(false)
  const [loading, setLoading] = useState(true)
  const [render, setRender] = useState(false)
  const [render2, setRender2] = useState(false)
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      setLoading(true)
      let response = await getTariffSubscription(data)

      dispatch(
        setMyTariff({
          myTariff: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    } finally {
      setLoading(false)
    }
  }

  const getMyOrders = async () => {
    try {
      setLoading(true)
      let response = await getTariffOrders(data)

      dispatch(
        setOrderTariffs({
          tariffOrders: response.data,
        }),
      )
    } catch (error) {
      console.log(error.response)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
    setRender2(false)
  }, [render2])

  useEffect(() => {
    getMyOrders()
    setRender(false)
  }, [render])
  const myTariffInfo = useSelector((state) => state.tariff.myTariff)
  const myOrders = useSelector((state) => state.tariff.tariffOrders)

  return (
    <div className={styles.sliding_tariff_container}>
      <UserTariffPlan
        setRender={setRender2}
        myTariff={myTariffInfo.subscription?.[0]}
      />
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
          }}
        >
          <ScaleLoader color="black" size={30} />
        </div>
      ) : (
        <div className={styles.tariff_cards}>
          <SlidingPaneTariffCards
            id={myTariffInfo.tariff?.[0]?.id}
            title={myTariffInfo.tariff?.[0]?.title}
            popular={myTariffInfo.tariff?.[0]?.popular}
            status={myTariffInfo.tariff?.[0]?.status}
            text={myTariffInfo.tariff?.[0]?.text}
            price={myTariffInfo.tariff?.[0]?.price}
            color={myTariffInfo.tariff?.[0]?.color}
            hdd_memory={myTariffInfo.tariff?.[0]?.hdd_memory}
            ram_memory={myTariffInfo.tariff?.[0]?.ram_memory}
            icon={myTariffInfo.tariff?.[0]?.icon}
            count_users={myTariffInfo.tariff?.[0]?.count_users}
            storage={myTariffInfo.tariff?.[0]?.icon}
            features={myTariffInfo.tariff?.[0]?.features}
          />
          <SlidingPaneTariffCards
            id={myTariffInfo.tariff?.[1]?.id}
            title={myTariffInfo?.tariff?.[1]?.title}
            popular={myTariffInfo.tariff?.[1]?.popular}
            status={myTariffInfo.tariff?.[1]?.status}
            text={myTariffInfo.tariff?.[1]?.text}
            price={myTariffInfo.tariff?.[1]?.price}
            color={myTariffInfo.tariff?.[1]?.color}
            hdd_memory={myTariffInfo.tariff?.[1]?.hdd_memory}
            ram_memory={myTariffInfo.tariff?.[1]?.ram_memory}
            icon={myTariffInfo.tariff?.[1]?.icon}
            count_users={myTariffInfo.tariff?.[1]?.count_users}
            storage={myTariffInfo.tariff?.[1]?.icon}
            features={myTariffInfo.tariff?.[1]?.features}
          />
          <SlidingPaneTariffCards
            id={myTariffInfo.tariff?.[2]?.id}
            title={myTariffInfo.tariff?.[2]?.title}
            popular={myTariffInfo.tariff?.[2]?.popular}
            status={myTariffInfo.tariff?.[2]?.status}
            text={myTariffInfo.tariff?.[2]?.text}
            price={myTariffInfo.tariff?.[2]?.price}
            color={myTariffInfo.tariff?.[2]?.color}
            hdd_memory={myTariffInfo.tariff?.[2]?.hdd_memory}
            ram_memory={myTariffInfo.tariff?.[2]?.ram_memory}
            icon={myTariffInfo.tariff?.[2]?.icon}
            count_users={myTariffInfo.tariff?.[2]?.count_users}
            storage={myTariffInfo.tariff?.[2]?.icon}
            features={myTariffInfo.tariff?.[2]?.features}
          />
        </div>
      )}

      <div style={{ display: 'flex', gap: '15px', paddingTop: '10px' }}>
        <button
          className={styles.btn_pin}
          onClick={() => setConstructor((prevState) => !prevState)}
        >
          {constructor ? 'Закрыть конструктор' : 'Собрать свой тариф'}{' '}
        </button>
        <button
          className={styles.btn_pin}
          onClick={() => setMicroservice(true)}
        >
          Заказать новый микросервис
        </button>
      </div>

      <h2 style={{ padding: '15px 0' }}>Ваши заказы</h2>
      {constructor ? (
        <CustomTariffForm setConstructor={setConstructor} />
      ) : (
        <SlidingPaneOrders
          myConstructor={
            myOrders.length === 0 ? [] : myOrders?.orders_constructor
          }
          myMicroservices={
            myOrders.length === 0 ? [] : myOrders?.orders_microservices
          }
        />
      )}
      <ModalWindow openModal={microservice} setOpenModal={setMicroservice}>
        <CustomServiceForm
          setMicroservice={setMicroservice}
          setRender={setRender}
        />
      </ModalWindow>
    </div>
  )
}

export default SlidingPaneTariffInfo
