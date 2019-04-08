import React, { Component } from 'react'
import ArrowButton from './arrowButton'

export default class WeekSelect extends Component {
  render() {
    return (
      <div>
        <ArrowButton></ArrowButton>
        <h4 className="week"></h4>
        <ArrowButton></ArrowButton>
      </div>
    )
  }
}
