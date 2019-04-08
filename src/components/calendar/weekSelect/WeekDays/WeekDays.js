import React, { Component } from 'react'
import NumberDate from './NumberDate'
import WordDate from './WordDate'

export default class Weekdays extends Component {
  render() {
    return (
      <div className="weekdays">
        <NumberDate num={'4'} />
        <NumberDate num={'5'} />
        <NumberDate num={'6'} />
        <NumberDate num={'7'} />
        <NumberDate num={'8'} />
        <NumberDate num={'9'} />
        <NumberDate num={'10'} />
      </div>
    )
  }
}
