import React from 'react'
import CalendarIcon from '../calendar/CalendarIcon'
import AddToCalendar from 'react-add-to-calendar'

const InviteeConfirmed = (props) => {
  var data = props.data.location.data
  var title = data.eventTitle.length === 0 ? "imfree.fyi meeting" : data.eventTitle
  var startTime = data.calStart.toISOString()
  var endTime = data.calEnd.toISOString()
  let event = {
    title: title,
    startTime: startTime,
    endTime: endTime,
    description: "Powered by imfree.fyi",
    location: "Here",
  }
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
      <div className="create">
        <div>
          <AddToCalendar event={event} />
        </div>
      </div>
    </div>
  )
}

export default InviteeConfirmed