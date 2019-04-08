import React, { Component } from 'react'

export default class NumberDate extends Component {
  render() {
    return (
      <div className="numberDate">
        <div className="numberDate_num">
            <p className="numberDate_num-digit">{this.props.num}</p>
        </div>
        <div className="numberDate_th">
        <p className="numberDate_th-letter">th</p>
        </div>
        
      </div>
    )
  }
}
