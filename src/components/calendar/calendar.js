import React, { Component } from 'react'
import weekSelect from './weekSelect/weekSelect';
import timeSelect from './timeSelect/timeSelect';

export default class calendar extends Component {
  render() {
    return (
      <div>
        <weekSelect />
        <timeSelect />
      </div>
    )
  }
}
