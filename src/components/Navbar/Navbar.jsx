import { Button } from 'components'
import KanbanTable from 'pages/TasksPage/components/KanbanTable/KanbanTable'
import { useState } from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import styles from './Navbar.module.scss'

function Navbar() {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })
  const [state1, setState1] = useState({
    isPaneOpen1: false,
    isPaneOpenLeft1: false,
  })
  return (
    <div className={styles.navbar_wrapper}>
      <div className={styles.navbar_item}>
        <span className={styles.navbar_active}>Профиль</span>
      </div>
      <div className={styles.navbar_item}>
        <SlidingPane
          className={styles.some_custom_class2}
          overlayClassName={styles.some_custom_overlay_class2}
          isOpen={state.isPaneOpen}
          title="Мои задачи"
          width="1000px"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            setState({ isPaneOpen: false })
          }}
        >
          <div className={styles.kanban_wrapper}>
            <div className={styles.kanban_heading}>
              <h2>Мои задачи</h2>

              <SlidingPane
                className={styles.some_custom_class2}
                overlayClassName={styles.some_custom_overlay_class2}
                isOpen={state1.isPaneOpen1}
                title="Новая задача"
                onRequestClose={() => {
                  // triggered on "<" on left top click or on outside click
                  setState1({ isPaneOpen1: false })
                }}
              ></SlidingPane>
              <Button
                className={styles.btn}
                onClick={() => setState1({ isPaneOpen1: true })}
              >
                Добавить задачу
              </Button>
            </div>
            <div className={styles.kanban_body}>
              <div className={styles.kanban_nav}>
                <p>Список</p>
                <p>Сроки</p>
              </div>
              <KanbanTable />
            </div>
          </div>
        </SlidingPane>
        <span onClick={() => setState({ isPaneOpen: true })}>Задачи</span>
      </div>
    </div>
  )
}

export default Navbar
