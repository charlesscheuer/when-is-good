import React, { Component } from 'react'

class TimeButton extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // toggleClass = () => {
  //   this.setState({ active: !this.state.active});
  // };
  
  render() {
    return (
      <div>
      <button className={ this.props.isActive ? 'btn-active': 'btn'} onClick={this.props.clicked}>{this.props.mins} min</button>
      </div>
    )
  }
}
export default TimeButton;
