import React, { Component } from 'react';
import TopBar from './topBar/topBar'
import '../SASS/main.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar></TopBar>
        
      </div>
    );
  }
}

export default App;
