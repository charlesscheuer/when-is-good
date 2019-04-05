import React, { Component } from 'react'
import button from './button';
export default class topBar extends Component {
  render() {
    return (
      <div className="topbar">
        <button className="topbar_button">15 min</button>
        <button className="topbar_button">30 min</button>
        <h3 className="topbar_title">Select time</h3>
        <button className="topbar_button">45 min</button>
        <button className="topbar_button">60 min</button>
      </div>
    )
  }
}
