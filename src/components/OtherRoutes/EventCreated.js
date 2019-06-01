import React from 'react'
import Loader from '../calendar/Loader'
import CalendarIcon from '../calendar/CalendarIcon'
import '../../SASS/main.scss';

var EventCreated = (props) => { 
  return props.eventCode.length? (
    <div>
      <div className="bar">
        <div className="brand">
          <CalendarIcon />
          <div className="brand-title">
            <h1 className="brand-title-text">I'm Free FYI</h1>
          </div>
        </div>
      </div>
      <div className="create">
        <p>You can share this URL with your invitees</p>
        <a href={`http://localhost:3000/event/${props.eventCode}`}>{`https://imfree.fyi/event/${props.eventCode}`}</a>
      </div>
    </div>
  ) : <Loader />
}

export default EventCreated