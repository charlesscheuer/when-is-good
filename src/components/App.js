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
        <h4 className="test">Mon</h4>
        <h4 className="test">Tue</h4>
        <h4 className="test">Wed</h4>
        <h4 className="test">Thu</h4>
        <h4 className="test">Fri</h4>
        <h4 className="test">Sat</h4>
      </div>
    );
  }
}

export default App;
