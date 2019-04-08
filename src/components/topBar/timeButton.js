import React, { Component } from 'react'

class timeButton extends Component {
  render() {
    return (
      <div>
      <div className="btn">`${this.props.mins} min`</div>
      </div>
    )
  }
}
export default timeButton;
