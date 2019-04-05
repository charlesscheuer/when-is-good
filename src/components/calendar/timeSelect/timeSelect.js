import React, { Component } from 'react'
import date from './date';

export default class timeSelect extends Component {
  render() {
    return (
      <div>
      <div className="dates">
        <date />
        <date />
        <date />
        <date />
        <date />
        <date />
        <date />
      </div>
      </div>
    )
  }
}
