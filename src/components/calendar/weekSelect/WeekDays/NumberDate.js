import React, { Component } from 'react'

export default class NumberDate extends Component {
  render() {
    return (
        <p className="numberDate">{this.props.num}<sup>th</sup></p> 
    )
  }
}
