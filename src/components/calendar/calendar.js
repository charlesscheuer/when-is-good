import React, { Component } from 'react'
import WeekSelect from './weekSelect/weekSelect';
import TimeSelect from './timeSelect/timeSelect';

export default class Calendar extends Component {
  render() {
    // TimeSelect has the container for the 'when is good?' that is vertical on the page
    return (
      <div>
        <WeekSelect />
        <TimeSelect />
      </div>
    )
  }
}
