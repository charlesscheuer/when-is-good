import React from 'react'
import CalendarIcon from 'components/calendar/CalendarIcon'

const Error = (props) => {
  return(
    <div>
      <div className="App">
        <div className="bar">
          <div className="brand">
            <CalendarIcon />
            <div className="brand-title">
              <h1 className="brand-title-text">I'm Free FYI</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="sharing">
        <p>Oops! Something went wrong</p>
      </div>
    </div>
  )
}

export default Error