import React, { Component } from 'react'
import TimeButton from './timeButton';
export default class TopBar extends Component {
  render() {
    return (
      <div className="topbar">
        <TimeButton mins={'15'}></TimeButton>
        <h3 className="topbar_title">Select time</h3>
      </div>
    )
  }
}


