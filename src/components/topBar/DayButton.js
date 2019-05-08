import React, { Component } from 'react'

class DayButton extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // toggleClass = () => {
  //   this.setState({ active: !this.state.active});
  // };

  render() {
    return (
      <div>
        <button
          className={this.props.isActive ? 'btn-active-day' : 'btn-day'}
          onClick={this.props.clicked}
        >
          Full Day
        </button>
      </div>
    )
  }
}
export default DayButton
