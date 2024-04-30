import React from 'react'
import { useState } from 'react'
function TaskForm() {
  const [serviceList, setServiceList] = useState([{ service: '' }])
  const [watchList, setWatchList] = useState([{ watch: '' }])

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target
    const list = [...serviceList]
    list[index][name] = value
    setServiceList(list)
  }

  const handleServiceRemove = (index) => {
    const list = [...serviceList]
    list.splice(index, 1)
    setServiceList(list)
  }

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: '' }])
  }

  // dsdsd
  const handleWatchChange = (e, index) => {
    const { name, value } = e.target
    const list = [...watchList]
    list[index][name] = value
    setWatchList(list)
  }

  const handleWatchRemove = (index) => {
    const list = [...watchList]
    list.splice(index, 1)
    setWatchList(list)
  }

  const handleWatchAdd = () => {
    setWatchList([...watchList, { watch: '' }])
  }
  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service">Service(s)</label>
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <input
                name="service"
                type="text"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              {serviceList.length - 1 === index && serviceList.length < 4 && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                >
                  <span>Add a Service</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="form-field">
        <label htmlFor="watch">WATCH(s)</label>
        {watchList.map((singleWatch, index) => (
          <div key={index} className="watchs">
            <div className="first-division">
              <input
                name="watch"
                type="text"
                id="watch"
                value={singleWatch.watch}
                onChange={(e) => handleWatchChange(e, index)}
                required
              />
              {watchList.length - 1 === index && watchList.length < 4 && (
                <button
                  type="button"
                  onClick={handleWatchAdd}
                  className="add-btn"
                >
                  <span>Add a Watch</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {watchList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleWatchRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </form>
  )
}

export default TaskForm
