import { routes } from 'constants/routes'
import WsNotifications from 'hooks/WsNotifications/WsNotifications'
import NoMatch from 'pages/NoMatch/NoMatch'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          )
        })}

        <Route path="*" element={<NoMatch />} />
      </Routes>

      <WsNotifications />

    </div>
  )
}

export default App
