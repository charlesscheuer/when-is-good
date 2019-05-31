import React from 'react'
import '../../SASS/main.scss';

var EventCreated = ({eventCode}) => { 
  return eventCode.length? (
    <div>
      <h1 className="topBar_center_title">{`http://imfree.fyi/event/${eventCode}`}</h1>
    </div>
  ) : <span>Loading ...</span>
}

export default EventCreated