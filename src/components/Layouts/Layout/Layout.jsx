import { useAuth } from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Layout.module.scss'

function Layout({ children }) {
  // states
  const { isAuth } = useAuth()
  const [width, setWidth] = useState(window.innerWidth)
  const [render, setRender] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState(
    localStorage.getItem('background'),
  )

  // functions
  useEffect(() => {
    setRender(true)
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  return (
    <div>
      {width >= 1000 ? <Sidebar /> : null}

      <div
        className={styles.layout__wrapper}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          objectFit: 'cover',
        }}
      >
        <div className={styles.body__wrapper}>
          <Header width={width} setBackgroundImage={setBackgroundImage} />
          <div>{children}</div>
        </div>
      </div>

      <div
        className={styles.layout__wrapper2}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          objectFit: 'cover',
        }}
      >
        <Header width={width} setBackgroundImage={setBackgroundImage} />
        <div className={styles.body__wrapper}>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
