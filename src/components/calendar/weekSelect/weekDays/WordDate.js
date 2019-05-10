import React, { Component } from 'react'

export default class WordDate extends Component {
    render() {
        return (
            <p className="wordDate">{this.props.date}</p>
          );
    }
  
}