import React, { Component } from 'react';
import '../SASS/main.scss';
import topBar from './topBar/topBar';
import slider from './slider/slider';
import calendar from './calendar/calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <topBar></topBar>
        <div className="container">
        <div className="topBar">
        <button className="btn">15 mins</button>
        <button className="btn">30 mins</button>
        <p className="topBar_title">select time</p>
        <button className="btn">45 mins</button>
        <button className="btn">60 mins</button>
        </div>
        </div>
        
        
      </div>
    );
  }
}

export default App;
