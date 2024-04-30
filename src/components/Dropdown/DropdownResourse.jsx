import chevron from 'assets/icons/chevron.svg'
import { useState } from 'react'

const DropdownResourse = ({
  selected,
  setSelected,
  setQuantity,
  setId,
  setRemain,
  setUnit,
  title,
  data,
}) => {
  // states

  const [open, setopen] = useState(false)

  // functions
  const handleItemClick = (id, label, remain, unit) => {
    setUnit(unit)
    setId(id)
    setSelected(label)
    setRemain(Number(remain))
    setQuantity(0)
    setopen(false)
  }

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={() => setopen(!open)}>
        <p>{selected ? selected : title}</p>
        <img
          src={chevron}
          className={`fa fa-chevron-right icon ${open && 'open'}`}
        />
      </div>
      <div className={`dropdown-body ${open && 'open'}`}>
        {data.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="dropdown-item"
            onClick={(e) =>
              handleItemClick(item.id, item.label, item.remain, item.unit)
            }
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropdownResourse
