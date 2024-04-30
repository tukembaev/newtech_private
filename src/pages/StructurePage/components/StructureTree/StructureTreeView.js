import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import Tree from 'react-d3-tree'
import { useNavigate } from 'react-router-dom'
import { useCenteredTree } from './CenteredTree.js'
import AddEmployeeForm from 'components/Forms/StructureForm/AddEmployeeForm/AddEmployeeForm'
import { useLocation } from 'react-router-dom'
import SlidingPaneUtil from 'utils/SlidingPaneUtil'
import userInfo from 'utils/userInfo'
import './custom-tree.css'
import styles from './StructureTreeView.module.scss'
const containerStyles = {
  width: '80vw',
  height: '70vh',
}

// Here we're using `renderCustomNodeElement` render a component that uses
// both SVG and HTML tags side-by-side.
// This is made possible by `foreignObject`, which wraps the HTML tags to
// allow for them to be injected into the SVG namespace.

export default function StructureTreeView({ data, setRender }) {
  const [translate, containerRef] = useCenteredTree()
  const nodeSize = { x: 300, y: 150 }
  const separation = { siblings: 2, nonSiblings: 2 }
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -125,
    y: -55,
  }

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  const [state, setState] = useState({
    id: '',
    structure_name: '',
    title: '',
    isPaneOpen: false,
    isPaneOpenLeft: false,
  })
  const navigate = useNavigate()
  const location = useLocation()
  const isSubtasks = location.state?.isSubtasks

  const handleOpen = () => {
    // Perform actions when the button is clicked
    setState({ isPaneOpen: true })
  }

  const buttonStyle = {
    background: 'rgba(219, 32, 32, 0.64)',
    border: 'none',
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
    fontFamily: '"Nunito", sans-serif',
    fontSize: '14px',
    borderRadius: '6px',

    marginTop: '15px',
    marginLeft: '15px',
  }

  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={data ?? []}
        translate={translate}
        nodeSize={nodeSize}
        separation={separation}
        transitionDuration="1000"
        pathFunc="step"
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({
            ...rd3tProps,
            foreignObjectProps,
            navigate,
            isSubtasks,
            setState,
            width,
            state,
            setRender,
            data,
          })
        }
        orientation="vertical"
      />
    </div>
  )
}

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  classes,
  setState,
  width,
  state,
  setRender,
  data,
  navigate,
  isSubtasks,
}) => {
  const user = userInfo()
  return (
    <>
      {/* `foreignObject` requires width & height to be explicitly set. */}

      <foreignObject {...foreignObjectProps}>
        <Button className={styles.button} variant="contained">
          {data.creator.includes(user.surName) ? (
            <p
              className={styles.open}
              onClick={() =>
                setState({
                  isPaneOpen: true,
                  id: nodeDatum?.id,
                  title: nodeDatum?.name,
                  structure_name: nodeDatum?.structure_name,
                })
              }
            >
              Добавить
            </p>
          ) : null}

          <p>
            {nodeDatum?.structure_name === 'organization'
              ? 'Организация'
              : nodeDatum?.structure_name === 'management'
                ? 'Управление'
                : nodeDatum?.structure_name === 'branch'
                  ? 'Отдел'
                  : 'Сектор'}
          </p>
          <div className={styles.name}>{nodeDatum?.name}</div>
        </Button>
      </foreignObject>
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
              data={{
                id: state?.id,
                title: state?.title,
                structure_name: state?.structure_name,
              }}
              setRender={setRender}
              setState={setState}
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
              data={{
                id: state?.id,
                title: state?.title,
                structure_name: state?.structure_name,
              }}
              setRender={setRender}
              setState={setState}
            />
          </SlidingPaneUtil>
        </>
      )}
    </>
  )
}
