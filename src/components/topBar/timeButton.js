import React, { Component } from 'react'

class TimeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: false,
    };
  }

  toggleClass = () => {
    this.setState({ active: !this.state.active});
  };
  
  render() {
    return (
      <div>
      <button className={this.state.active && this.props.isActive ? 'btn-active': 'btn'} 
              onClick={this.toggleClass}>{this.props.mins} min</button>
      </div>
    )
  }
}
export default TimeButton;
