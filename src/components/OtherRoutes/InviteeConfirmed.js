import React from 'react'
import CalendarIcon from '../calendar/CalendarIcon'

const InviteeConfirmed = (props) => {
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
        <p>Great! Your meeting is booked</p>
        <p>Look for a meeting invite on your inbox and add it to your calendar</p>
      </div>
    </div>
  )
}

export default InviteeConfirmed