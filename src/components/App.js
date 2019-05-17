import React, { Component } from 'react';
import { throttle } from 'throttle-debounce';
import { Route } from 'react-router-dom';
import TopBar from './topBar/TopBar';
import Calendar from './calendar/Calendar';
import Creds from './Creds';
import '../SASS/main.scss';
import CalendarIcon from './calendar/CalendarIcon';
import WeekDays from './calendar/weekSelect/weekDays/WeekDays';
import CreateEvent from './OtherRoutes/CreateEvent';
import WeekSelect from './calendar/weekSelect/WeekSelect';
import {
  getPreviousNextWeek,
  convertToAppDates,
  getInitDate
} from '../lib/library.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: 30,
      dates: [],
      times: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      table: [],
      selected: [],
      viewportWidth: 800,
      // the stuff below here is being set by the range from '/create'
      // it should be passed here to be used in TimeSelect.js
      value: [22, 62],
      startTime: '9 am',
      endTime: '5 pm',
      // 👆provides day of week for the single column mobile view
      creator: true,
      timezone: 'EST'
      // this is the timezone they chose when creating the event
    };
    this.onClick = this.onClick.bind(this);
    this.onSelectWindow = this.onSelectWindow.bind(this);
    this.resetSelection = this.resetSelection.bind(this);
  }

  fillCurrentTimes() {
    let table = [];
    let timewindows = [];
    let dates = getInitDate();
    let times = [...this.state.times];
    times.forEach(time => {
      timewindows.push(`${time}:00`);
      timewindows.push(`${time}:15`);
      timewindows.push(`${time}:30`);
      timewindows.push(`${time}:45`);
    });
    timewindows.forEach(time => {
      var row = [];
      dates.forEach(date => {
        row.push([`${date} ${time}`, false]);
      });
      table.push(row);
    });
    this.setState({
      dates: dates,
      table: table
    });
  }

  resetSelection(table) {
    table.map(row => {
      row.map(datetime => {
        datetime[1] = false;
        return datetime;
      });
      return row;
    });
    return table;
  }

  betweenTimes = value => {
    // this function determines the times to show the user as they set using the range input
    let timesMap = {
      '0-4': '5 am',
      '5-9': '6 am',
      '10-14': '7 am',
      '15-19': '8 am',
      '20-24': '9 am',
      '25-29': '10 am',
      '30-34': '11 am',
      '35-39': '12 pm',
      '40-44': '1 pm',
      '45-49': '2 pm',
      '50-54': '3 pm',
      '55-59': '4 pm',
      '60-64': '5 pm',
      '65-69': '6 pm',
      '70-74': '7 pm',
      '75-79': '8 pm',
      '80-86': '9 pm',
      '87-94': '10 pm',
      '95-100': '11 pm'
    };
    for (var key in timesMap) {
      var range = key.split('-');
      var val = timesMap[key];
      if (value[0] >= range[0] && value[0] < range[1]) {
        this.setState({ startTime: val });
      }
      if (value[1] >= range[0] && value[1] < range[1]) {
        this.setState({ endTime: val });
      }
    }
  };

  onSliderChange = value => {
    console.log(value);
    // this changes the state of the value array when user drags the range component from '/create'
    this.setState({
      value
    });
    this.betweenTimes(value);
  };

  onSelectWindow(value) {
    if (value === 1) {
      var table = this.state.table;
      table = this.resetSelection(table);
      this.setState({
        ...this.state,
        table: table,
        window: value
      });
    } else {
      this.setState({
        ...this.state,
        window: value
      });
    }
  }

  onClick(e, x, y) {
    e.preventDefault();
    var table = this.state.table;
    var newTable = [];
    if (this.state.window === 1) {
      table.forEach((row, xx) => {
        var newRow = [];
        row.forEach((datetime, yy) => {
          if (yy === y) newRow.push([datetime[0], true]);
          else newRow.push([datetime[0], datetime[1]]);
        });
        newTable.push(newRow);
      });
    } else {
      newTable = table;
      var newvar = table[x][y];
      newvar[1] = !newvar[1];
      newTable[x][y] = newvar;
    }
    this.setState({
      table: newTable
    });
  }

  initWindow() {
    // updates the viewport width
    this.setState({ viewportWidth: window.innerWidth });
  }

  componentWillMount() {
    this.fillCurrentTimes();
  }

  componentDidMount() {
    this.updateViewportWidth();
    window.addEventListener('resize', this.updateViewportWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewportWidth);
  }

  updateViewportWidth = () => {
    throttle(this.initWindow(), 500);
  };

  weekButtonHandler = nextWeek => {
    var start = this.state.dates[0];
    var end = this.state.dates[6];
    if (nextWeek) var week = getPreviousNextWeek(end, nextWeek);
    else week = getPreviousNextWeek(start, nextWeek);
    week = convertToAppDates(week);
    this.setState({
      dates: week
    });
    console.log(this.state.dates);
  };

  createdEvent = timezone => {
    this.setState({ creator: true, timezone: timezone });
  };

  render() {
    return (
      <div>
        <Route
          path="/create"
          exact
          render={() => (
            <CreateEvent
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              value={this.state.value}
              onSliderChange={this.onSliderChange}
              isCreator={this.createdEvent}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={() => (
            <div ref={this.viewportWidthRef} className="App">
              <div className="bar">
                <div className="brand">
                  <CalendarIcon />
                  <div className="brand-title">
                    <h1 className="brand-title-text">I'm Free FYI</h1>
                  </div>
                </div>
              </div>

              {this.state.creator ? (
                <TopBar onSelectWindow={this.onSelectWindow} />
              ) : null}
              <div className="sticks">
                <WeekSelect
                  dates={this.state.dates}
                  weekButtonHandler={this.weekButtonHandler}
                  vw={this.state.viewportWidth}
                />
                <WeekDays
                  vw={this.state.viewportWidth}
                  dates={this.state.dates}
                  className="stickyScroll"
                />
              </div>
              <Calendar
                dates={this.state.dates}
                window={this.state.window}
                table={this.state.table}
                onClick={this.onClick}
                vw={this.state.viewportWidth}
              />
              <Creds />
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
