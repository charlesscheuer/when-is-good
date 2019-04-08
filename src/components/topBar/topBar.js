import React, { Component } from 'react'
import TimeButton from './timeButton';
export default class TopBar extends Component {

  constructor() {
    super() 
    this.state = {
      active: ''
    }
  }

  changedMins = (mins) => {
    this.setState({active: mins});
  }
  // how could you pass a prop to ^ this function
  // for example if you wanted it to pass the mins prop value
  
  render() {
    return (
      <div className="topbar">
        <div className="container">
        <div className="topBar">
        <TimeButton mins={'15'} onClick={() => this.changedMins(15)} isActive={this.state.active === '15'}></TimeButton>
        <TimeButton mins={'30'} onClick={() => this.changedMins(30)} isActive={this.state.active === '30'}></TimeButton>
        <p className="topBar_title">select time</p>
        <TimeButton mins={'45'} onClick={() => this.changedMins(45)} isActive={this.state.active === '45'}></TimeButton>
        <TimeButton mins={'60'} onClick={() => this.changedMins(60)} isActive={this.state.active === '60'}></TimeButton>
        </div>
        </div>
      </div>
    )
  }
}


