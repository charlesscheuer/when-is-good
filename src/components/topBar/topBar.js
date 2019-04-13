import React, { Component } from 'react'
import TimeButton from './timeButton';
export default class TopBar extends Component {

  constructor() {
    super() 
    this.state = {
      active: 30
      // 30 minutes is the default time 
    }
  }

  changedMins = (mins) => {
    this.setState({
      active: mins
    });
    // function that passes mins to a function from props to change the minutes for the calendar view
  }
  
  render() {
    return (
      <div className="topbar">
        <div className="container">
        <div className="topBar">
        <TimeButton mins={'15'} clicked={() => this.changedMins(15)} isActive={this.state.active === 15}></TimeButton>
        <TimeButton mins={'30'} clicked={() => this.changedMins(30)} isActive={this.state.active === 30}></TimeButton>
        <p className="topBar_title">select time</p>
        <TimeButton mins={'45'} clicked={() => this.changedMins(45)} isActive={this.state.active === 45}></TimeButton>
        <TimeButton mins={'60'} clicked={() => this.changedMins(60)} isActive={this.state.active === 60}></TimeButton>
        </div>
        </div>
      </div>
    )
  }
}


