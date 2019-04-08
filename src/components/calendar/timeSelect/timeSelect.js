import React, { Component } from 'react'
import Date from './date';

export default class TimeSelect extends Component {
  render() {
    return (
      <div>
      <div className="dates">
        <Date />
        <Date />
        <Date />
        <Date />
        <Date />
        <Date />
        <Date />
      </div>
      </div>
    )
  }
}
