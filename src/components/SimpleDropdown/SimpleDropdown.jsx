import chevron from 'assets/icons/chevron.svg'
import { useState } from 'react'
import './SimpleDropdown.scss'
const SimpleDropdown = ({ selected, setSelected, options, title }) => {
  // states
  const [open, setOpen] = useState(false)

  return (
    <div className="dropdown">
      <div className="dropdown__header" onClick={() => setOpen(!open)}>
        <p>{selected ? selected : title}</p>
        <img
          src={chevron}
          className={`fa fa-chevron-right icon ${open && 'open'}`}
        ></img>
      </div>
      <div className={`dropdown__body ${open && 'open'}`}>
        {options.map((option) => (
          <div
            className="dropdown__item"
            onClick={() => {
              setSelected(option)
              setOpen(false)
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SimpleDropdown
