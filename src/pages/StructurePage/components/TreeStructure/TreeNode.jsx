import add from 'assets/icons/plus.svg'
import AddEmployeeForm from 'components/Forms/StructureForm/AddEmployeeForm/AddEmployeeForm'
import { useEffect, useState } from 'react'
import SlidingPaneUtil from 'utils/SlidingPaneUtil'
import styles from './TreeNode.module.scss'
export default function TreeNode({ node, isBranches }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubbranches = node.branches && node.branches.length > 0
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  const [state, setState] = useState({
    isSubbranch: true,
    subbranch: [],
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })
  const [width, setWidth] = useState(window.innerWidth)

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

  return (
    <div className={styles.node}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <div
          className={`${styles['node_title']} arrow arrow-down`}
          onClick={handleClick}
        >
          {hasSubbranches ? (isOpen ? '▼ ' : '▶ ') : ' '}
          {hasSubbranches ? 'Управление - ' : 'Отдел - '} {node.title}
        </div>
        <img
          className={styles.plus}
          src={add}
          alt=""
          onClick={() => setState({ isPaneOpen: true })}
        />
      </div>
      {hasSubbranches && isOpen && (
        <div className={styles.node_branches}>
          {node.branches.map((branch) => (
            <TreeNode key={branch.title} node={branch} />
          ))}
        </div>
      )}
      {node.subbranches && (
        <div className={styles.node_subbranches}>
          {node.subbranches.map((subbranch) => (
            <div className={styles.subbranch} key={subbranch.title}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className={styles.subbranch_title}>
                  Сектор - {subbranch.title}
                </div>{' '}
                <img
                  className={styles.plus}
                  src={add}
                  alt=""
                  onClick={() =>
                    setState({
                      isSubbranch: true,
                      subbranch: subbranch,
                      isPaneOpen: true,
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {width > 600 ? (
        <>
          <SlidingPaneUtil
            size="900px"
            title="Отдел кадров"
            state={state}
            setState={setState}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              setState({ isPaneOpen: false })
            }}
          >
            {' '}
            <AddEmployeeForm
              data={state.isSubbranch ? state.subbranch : node}
            />
          </SlidingPaneUtil>
        </>
      ) : (
        <>
          <SlidingPaneUtil
            size="100%"
            title="Отдел кадров"
            state={state}
            setState={setState}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              setState({ isPaneOpen: false })
            }}
          >
            {' '}
            <AddEmployeeForm
              data={state.isSubbranch ? state.subbranch : node}
            />
          </SlidingPaneUtil>
        </>
      )}
    </div>
  )
}
