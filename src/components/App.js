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
        
      </div>
    );
  }
}

export default App;
