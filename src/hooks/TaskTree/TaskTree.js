// import { createStyles, makeStyles } from '@emotion/styled'
import air from 'assets/img/air.jpg'
import bowser from 'bowser'
import { useEffect, useState } from 'react'
import Tree from 'react-d3-tree'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getSubTaskTree, getTaskTree } from 'service/TaskService'
import { setTaskTree } from 'store/slices/TaskSlice'
import { useCenteredTree } from './CenteredTree.js'
import styles from './TaskTree.module.scss'
import './custom-tree.css'
import { Button } from 'components/index.js'
const containerStyles = {
  width: '100vw',
  height: '100vh',
  background: `url(${air})`,
}

// const useStyles = makeStyles(
//   createStyles({
//     button: {
//       fontFamily: 'Nunito',
//       fontWeight: '800',
//       position: 'relative',
//       width: '250px',
//       borderRadius: '15px',

//       background: 'white',
//       color: 'black',

//       '& > span': {
//         flexFlow: 'column',
//       },
//       '& > p': {
//         paddingLeft: '155px',
//       },
//       '&:hover': {
//         background: 'white',
//       },
//       '& > p:first-of-type': {
//         display: 'none',
//       },
//     },
//     name: {
//       fontSize: '12px',
//       borderBottom: '1px solid black',
//     },
//     name_emp: {
//       fontSize: '12px',
//     },
//     edit: {
//       position: 'absolute',
//       fontSize: '12px',
//       top: '5px',
//       right: '15px',
//       color: '#4BA083',
//     },
//     attributes: {
//       position: 'absolute',
//       bottom: '5px',
//       right: '10px',
//     },
//     statusTextCompleted: {
//       display: 'inline-block',
//       color: '#131212',
//       backgroundColor: 'green',
//       padding: '0 8px 0px 8px',
//       fontSize: '10px',
//       textDecoration: 'none',
//       fontWeight: 'bold',
//       borderRadius: '9px',
//       border: '1px solid #e4e1e1',
//     },
//     statusTextPending: {
//       display: 'inline-block',
//       color: '#131212',
//       backgroundColor: 'orange',
//       padding: '0 8px',
//       fontSize: '10px',
//       textDecoration: 'none',
//       fontWeight: 'bold',
//       borderRadius: '9px',
//       border: '1px solid #e4e1e1',
//     },
//     statusText: {
//       display: 'inline-block',
//       color: '#131212',
//       padding: '0 8px',
//       fontSize: '10px',
//       textDecoration: 'none',
//       fontWeight: 'bold',
//     },
//     open: {
//       paddingLeft: '155px',
//       color: 'green',
//     },
//   }),
// )

export default function TaskTree() {
  const [data, setData] = useState({})
  const [translate, containerRef] = useCenteredTree()
  const nodeSize = { x: 300, y: 250 }
  const separation = { siblings: 2, nonSiblings: 2 }
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -125,
    y: -55,
  }
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const isSubtasks = location.state?.isSubtasks

  const getData = async () => {
    try {
      if (isSubtasks) {
        let response = await getSubTaskTree(id, data)
        dispatch(
          setTaskTree({
            task_tree: response.data,
          }),
        )
        setData(response.data)
      } else {
        let response = await getTaskTree(id, data)
        dispatch(
          setTaskTree({
            task_tree: response.data,
          }),
        )

        setData(response.data)
      }
    } catch (error) {
      console.log(error.response)
    }
  }
  const treeData = useSelector((state) => state?.task?.task_tree)
  useEffect(() => {
    getData()
  }, [])
  const isSafari =
    bowser.getParser(window.navigator.userAgent).getBrowserName() === 'Safari'

  useEffect(() => {
    if (!isSafari) {
      const button = document?.querySelector('foreignObject button')
      const firstParagraph = button?.querySelector('p:first-of-type')
      firstParagraph.style.display = 'none'
    }
  }, [])

  const buttonStyle = {
    background: 'rgba(219, 32, 32, 0.64)',
    border: 'none',
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
    fontFamily: '"Nunito", sans-serif',
    fontSize: '14px',
    borderRadius: '6px',
    transition: '0.3s',
    marginTop: '15px',
    marginLeft: '15px',
    '&:hover': {
      background: '#d1f071',
    },
  }

  return (
    <div style={containerStyles} ref={containerRef}>
      <Button onClick={() => navigate(-1)} style={buttonStyle}>
        {' '}
        Назад{' '}
      </Button>
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
        renderCustomNodeElement={(rd3tProps) => {
          if (
            navigator.userAgent.includes('Safari') &&
            !navigator.userAgent.includes('Chrome')
          ) {
            return renderNode({
              ...rd3tProps,
              foreignObjectProps,

              navigate,
              id,
            })
          } else {
            return renderForeignObjectNode({
              ...rd3tProps,
              foreignObjectProps,

              navigate,
              id,
            })
          }
        }}
        orientation="vertical"
      />
    </div>
  )
}
const renderNode = ({ nodeDatum, toggleNode, navigate, id }) => {
  return (
    <g
      transform={`translate(${nodeDatum.x},${nodeDatum.y})`}
      style={{ fontWeight: '100' }}
    >
      <rect
        x={-165}
        y={-45}
        width={330}
        height={120}
        fill="white"
        cursor="pointer"
        rx={15}
        ry={15}
        stroke="none"
        onClick={toggleNode}
      />
      {nodeDatum.id === parseInt(id) ? (
        ''
      ) : (
        <text
          x={110}
          y={-20}
          textAnchor="middle"
          style={{ fontSize: '14px', fill: 'green' }}
          onClick={() => navigate(`/subtask/${nodeDatum.id}`)}
        >
          Открыть
        </text>
      )}

      <text
        x={0}
        y={0}
        textAnchor="middle"
        style={{ fontSize: '12px', fontWeight: 'normal' }}
      >
        {nodeDatum.name}
      </text>
      <text
        x={0}
        y={20}
        textAnchor="middle"
        style={{ fontSize: '12px', fontWeight: 'normal' }}
      >
        {nodeDatum.attributes?.instructor}
      </text>
      <text
        x={0}
        y={40}
        textAnchor="middle"
        style={{ fontSize: '12px', fontWeight: 'normal' }}
      >
        Статус: {nodeDatum.attributes?.status}
      </text>
    </g>
  )
}
const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  classes,
  navigate,
}) => {
  return (
    <>
      <foreignObject {...foreignObjectProps}>
        <Button
          className={styles.button}
          variant="contained"
          onClick={toggleNode}
        >
          <p
            className={styles.open}
            onClick={() => navigate(`/subtask/${nodeDatum.id}`)}
          >
            Открыть
          </p>
          <div className={styles.name}>{nodeDatum?.name}</div>
          <div className={styles.name_emp}>
            {nodeDatum?.attributes?.instructor}
          </div>
          {nodeDatum?.attributes?.status === 'Завершена' ? (
            <div className={styles.statusTextCompleted}>
              Статус: {nodeDatum?.attributes?.status}
            </div>
          ) : nodeDatum?.attributes?.status === 'В процессе выполнения' ? (
            <div className={styles.statusTextPending}>
              Статус: {nodeDatum?.attributes?.status}
            </div>
          ) : (
            <div className={styles.statusText}>
              Статус: {nodeDatum?.attributes?.status}
            </div>
          )}
        </Button>
      </foreignObject>
    </>
  )
}
