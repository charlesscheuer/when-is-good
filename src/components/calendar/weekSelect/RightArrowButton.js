import React, { Component } from 'react'

export default class RightArrowButton extends Component {
  render() {
    return (
      <button className="week_arrow" onClick={this.props.clicked}>
        &rarr;
      </button>
    )
  }
}
