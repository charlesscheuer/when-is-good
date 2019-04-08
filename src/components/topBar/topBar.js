import React, { Component } from 'react'
import timeButton from './timeButton';
export default class topBar extends Component {
  render() {
    return (
      <div className="topbar">
        <timeButton mins={'15'}></timeButton>
        <h3 className="topbar_title">Select time</h3>
      </div>
    )
  }
}


