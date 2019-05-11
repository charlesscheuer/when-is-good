import React, { Component } from 'react'

export default class LeftArrowButton extends Component {
  render() {
    return (
      <button onClick={this.props.clicked} className="week_arrow">
        &larr;
      </button>
    )
  }
}
