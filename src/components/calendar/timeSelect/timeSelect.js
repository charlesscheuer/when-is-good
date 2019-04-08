import React, { Component } from 'react'

export default class TimeSelect extends Component {
  render() {
    // check the calendar.scss file for the styles here
    return (
      <div className="TimeSelect">
        <div className="TimeSelect_containTitle">
        <h1 className="TimeSelect_title">When is good?</h1>
        </div>
        <div className="TimeSelect_times"></div>
      </div>
    )
  }
}


