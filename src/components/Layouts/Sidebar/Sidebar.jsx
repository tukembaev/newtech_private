import { useState } from 'react'
import MenuDrawer from './components/Menu/MenuDrawer'
function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <MenuDrawer open={open} setOpen={setOpen} />
    </div>
  )
}

export default Sidebar
