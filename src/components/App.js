import React, { Component } from 'react';
import '../SASS/main.scss';
import topBar from './tobBar/topBar';
import slider from './slider/slider';
import calendar from './calendar/calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <topBar></topBar>
        <h4 className="name">when is good?</h4>
      </div>
    );
  }
}

export default App;
