import React, { Component } from 'react';
import TopBar from './topBar/topBar'
import '../SASS/main.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar></TopBar>
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
