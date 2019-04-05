import React, { Component } from 'react'
import arrowButton from './arrowButton'

export default class weekSelect extends Component {
  render() {
    return (
      <div>
        <arrowButton></arrowButton>
        <h4 className="week"></h4>
        <arrowButton></arrowButton>
      </div>
    )
  }
}
