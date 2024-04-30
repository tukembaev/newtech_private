import React, { useState, useEffect } from 'react'
import styles from './SupportPage.module.scss'
import { useNavigate } from 'react-router-dom'
import SupportForm from 'components/Forms/SupportForm/SupportForm'
import SlidingPaneUtil from 'utils/SlidingPaneUtil'
import SupportMenu from './components/SupportMenu/SupportMenu'
import SupportTable from './components/SupportTable/SupportTable'
import { Button, Layout } from 'components'

const SupportPage = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [filterChoose, setFilterChoose] = useState(0)
  const [render, setRender] = useState(false)
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

  const navigate = useNavigate()

  useEffect(() => {
    setRender(false)
  }, [render])

  //   const allStatements = useSelector((state) => state.statement);
  return (
    <Layout>
      <div className={styles.menu__wrapper}>
        <SupportMenu
          first={'На рассмотрении'}
          second={'Рассмотрено'}
          setFilterChoose={setFilterChoose}
        />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.titile__wrapper}>
          {filterChoose === 0 ? (
            <div className={styles.title}>На рассмотрении</div>
          ) : filterChoose === 1 ? (
            <div className={styles.title}>Рассмотрено</div>
          ) : (
            ''
          )}
          <div>
            {width > 600 ? (
              <SlidingPaneUtil
                size="50%"
                title="Новое обращение в службу"
                state={state}
                setState={setState}
              >
                <SupportForm setRender={setRender} setState={setState} />{' '}
              </SlidingPaneUtil>
            ) : (
              <SlidingPaneUtil
                size="100%"
                title="Новое обращение в службу"
                state={state}
                setState={setState}
              >
                <SupportForm setRender={setRender} setState={setState} />{' '}
              </SlidingPaneUtil>
            )}
            <Button
              className="create__statement__btn"
              onClick={() => setState({ isPaneOpen: true })}
            >
              Отправить сообщение в поддержку
            </Button>
          </div>
        </div>

        <SupportTable render={render} filterChoose={filterChoose} />
      </div>
    </Layout>
  )
}

export default SupportPage
