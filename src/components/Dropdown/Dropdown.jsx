import chevron from 'assets/icons/chevron.svg'
import { useState } from 'react'
import './Dropdown.scss'

const Dropdown = ({ setId, setType, title, data, handleAddComponent }) => {
  //UseState
  const [isOpen, setOpen] = useState(false)

  const [selectedItem, setSelectedItem] = useState(null)

  //Functions
  const toggleDropdown = () => setOpen(!isOpen)

  const handleItemClick = (id, label) => {
    setId(id)
    setType(label)
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id)
    setOpen(!isOpen)
    handleAddComponent()
  }

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem
          ? data.find((item) => item.id == selectedItem).label
          : title}
        <img
          src={chevron}
          className={`fa fa-chevron-right icon ${isOpen && 'open'}`}
        ></img>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {data.map((item) => (
          <div
            key={item.id}
            className="dropdown-item"
            onClick={(e) => handleItemClick(e.target.id, item.label)}
            id={item.id}
          >
            <span
              className={`dropdown-item-dot  ${
                item.id == selectedItem && 'selected'
              }`}
            >
              {' '}
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
