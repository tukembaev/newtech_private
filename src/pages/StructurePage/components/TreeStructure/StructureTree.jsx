import AddEmployeeForm from 'components/Forms/StructureForm/AddEmployeeForm/AddEmployeeForm'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import SlidingPaneUtil from 'utils/SlidingPaneUtil'
import StructureTreeView from '../StructureTree/StructureTreeView'

const StructureTree = ({ data, setRender, setTitle }) => {
  const [state, setState] = useState({
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
  const dispatch = useDispatch()

  function transformData(data) {
    const transformedData = {
      id: data?.id,
      name: data?.title,
      structure_name: 'organization',
      creator: data?.employee,
      attributes: {
        status: `Ждет выполнения с ${data?.created}`,
        instructor: data?.employee,
      },
      children: [],
    }

    if (data?.managements.length === 0) {
      data?.branches?.forEach((branch) => {
        const branchNode = {
          id: branch.id,
          name: branch.title,
          creator: data?.employee,
          structure_name: 'branch',
          attributes: {},
          children: [],
        }

        branch.subbranches?.forEach((subbranch) => {
          const subbranchNode = {
            id: subbranch.id,
            name: subbranch.title,
            creator: data?.employee,
            structure_name: 'subbranch',
            attributes: {},
            children: [],
          }

          branchNode.children.push(subbranchNode)
        })

        transformedData.children.push(branchNode)
      })
    } else {
      data?.managements?.forEach((management) => {
        const managementNode = {
          id: management.id,
          name: management.title,
          structure_name: 'management',
          creator: data?.employee,
          attributes: {},
          children: [],
        }

        management.branches?.forEach((branch) => {
          const branchNode = {
            id: branch.id,
            name: branch.title,
            structure_name: 'branch',
            creator: data?.employee,
            attributes: {},
            children: [],
          }

          branch.subbranches?.forEach((subbranch) => {
            const subbranchNode = {
              id: subbranch.id,
              name: subbranch.title,
              structure_name: 'subbranch',
              creator: data?.employee,
              attributes: {},
              children: [],
            }

            branchNode.children.push(subbranchNode)
          })

          managementNode.children.push(branchNode)
        })

        transformedData.children.push(managementNode)
      })
    }

    return transformedData
  }

  const transformedData = transformData(data)

  setTitle(transformedData.name)
  return (
    <div>
      {/* <div style={{display:'flex'}}>
   <h1 style={{paddingBottom:'10px', color:'white' }}>{data.title} </h1>
   <img className={styles.plus3} src={add} alt="" onClick={() => setState({isPaneOpen: true })}/>
   </div>
    {f.map((management) => (
      <div key={management.title}>
        
        <h2 style={{color:'white'}}>Раздел с управлениями</h2>
        <div style={{display:'flex' ,gap:'25px'}}>
        {management?.managements?.map((branch) => (
          <TreeNode key={branch.title} node={branch} />
        ))}
        </div>
      </div>
    ))}

     {f.map((management) => (
      <div key={management.title}>
        <h2 style={{color:'white', paddingTop:'20px'}}>Раздел с отделами</h2>
        <div className={styles.help}>
        {management?.branches?.map((branch) => (
          <TreeNode key={branch.title} node={branch} isBranches = {true}/>
        ))}
        </div>
      </div>
    ))} */}

      <StructureTreeView
        data={transformedData}
        setState={setState}
        setRender={setRender}
      />
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
              data={data}
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
              data={data}
              setRender={setRender}
              setState={setState}
            />
          </SlidingPaneUtil>
        </>
      )}
    </div>
  )
}

export default StructureTree
