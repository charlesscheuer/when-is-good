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
  getInitDate,
  getInitTimes
} from '../lib/library.js';
import { backend_url } from '../lib/controller.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: 30,
      dates: [],
      times: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      table: [],
      viewportWidth: 800,
      // Pass the below to <CreateEvent>
      value: [22, 62],
      startTime: '9 am',
      endTime: '5 pm',
      timezone: 'PST',
      shouldEmail: false,
      yourEmail: '',
      theirEmails: [''],
      numPeople: 2,
      eventCode: ''
      // the code for their event (if no link emailed?)
    };
  }

  fillCurrentTimes = () => {
    let table = [];
    let timewindows = [];
    let dates = getInitDate();
    var times = getInitTimes(this.state.startTime, this.state.endTime);
    times.forEach(time => {
      timewindows.push(`${time}:00`);
      timewindows.push(`${time}:15`);
      timewindows.push(`${time}:30`);
      timewindows.push(`${time}:45`);
    });
    // timewindows.forEach(time => {
    //   var row = [];
    //   dates.forEach(date => {
    //     row.push([`${date} ${time}`, false]);
    //   });
    //   table.push(row);
    // });
    timewindows.forEach(time => {
      var row = {};
      dates.forEach(date => {
        row[`${date} ${time}`] = false
      });
      table.push(row);
    });
    console.log(table)
    this.setState({
      dates: dates,
      table: table,
      times: times
    });
  };

  resetSelection = table => {
    table.map(row => {
      for(var key in row) {
        row[key] = false;
      }
      return row;
    });
    return table;
  };

  onSliderChange = value => {
    // this changes the state of the value array when user drags the range component from '/create'
    this.setState({
      value
    });
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

  onSelectWindow = value => {
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
  };

  onClick = (e, x, y) => {
    e.preventDefault();
    var table = this.state.table;
    var newTable = [];
    if (this.state.window === 1) {
      table.forEach((row, xx) => {
        var newRow = {};
        Object.keys(row).forEach((datetime, yy) => {
          if (yy === y) newRow[datetime] = true
          else newRow[datetime] = row[datetime]
        });
        newTable.push(newRow);
      });
    } else {
      newTable = table;
      var keys = Object.keys(table[x])
      var newvar = keys[y];
      newTable[x][newvar] = !newTable[x][newvar];
    }
    this.setState({
      table: newTable
    });
  };

  initWindow = () => {
    // updates the viewport width
    this.setState({ viewportWidth: window.innerWidth });
  };

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
  };

  createdEvent = () => {
    this.fillCurrentTimes();
    // Save the state to the backend db here.
  };

  handleEmailToggle = () => {
    this.setState({ shouldEmail: !this.state.shouldEmail });
    setTimeout(() => {
      if (this.state.shouldEmail) {
        window.scrollTo(0, 1000);
      }
    }, 100);
  };

  onTimezoneChange = event => {
    this.setState({ timezone: event.target.value });
  };

  emailHandler = emailState => {
    this.setState(emailState);
  };

  eventCodeSubmission = code => {
    // fetch the times that have been posted here using the 'eventCode' from this.state
    this.setState({ eventCode: code });
  };

  eventCodeHandler = input => {
    this.setState({ eventCode: input });
    // if anything is typed in at this point it will change the state to the time selection
  };

  createCalendarEvent = () => {
    var body = {'state': this.state}
    console.log(body)
    var api = backend_url + 'user'

    // fetch(api, {
    //     method: 'post',
    //     body: JSON.stringify(body)
    //   }).then(function(response) {
    //     return response.json();
    //   }).then(function(data) {
    //     console.log('Posted:', data);
    //   })
  }

  render() {
    this.createCalendarEvent()
    console.log(this.state)
    return (
      <div>
        <Route
          path="/"
          exact
          render={() => (
            <CreateEvent
              value={this.state.value}
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              timezone={this.state.timezone}
              shouldEmail={this.state.shouldEmail}
              yourEmail={this.state.yourEmail}
              theirEmails={this.state.theirEmails}
              numPeople={this.state.numPeople}
              emailHandler={this.emailHandler}
              onSliderChange={this.onSliderChange}
              createdEvent={this.createdEvent}
              onTimezoneChange={this.onTimezoneChange}
              handleEmailToggle={this.handleEmailToggle}
            />
          )}
        />
        <Route
          path="/create"
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
              <TopBar onSelectWindow={this.onSelectWindow} />
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
              <div className="create">
                <button className="create_event">Submit times</button>
                {/*onclick to submit the time info here */}
              </div>
              <Creds />
            </div>
          )}
        />
        <Route
          path="/addtime"
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

              {this.state.eventCode === '' ? (
                <div className="create">
                  <p>Please input your code</p>
                  <div className="create_emails_yours">
                    <form className="create_emails_form">
                      <input
                        className="create_emails_form_input"
                        placeholder="Enter the event code"
                        id="email"
                        onChange={this.eventCodeHandler}
                        required
                        type="text"
                      />
                      <label
                        htmlFor="email"
                        className="create_emails_form_input_label"
                      >
                        Enter your event code
                      </label>
                    </form>
                  </div>
                  <button
                    className="create_event"
                    onClick={this.codeSubmission}
                  >
                    Submit code
                  </button>
                </div>
              ) : (
                <div className="create">
                  <h1 className="create_addtime">
                    Add the times that work best for you.
                  </h1>
                </div>
              )}
              {this.state.eventCode === '' ? null : (
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
              )}
              {this.state.eventCode === '' ? null : (
                <Calendar
                  dates={this.state.dates}
                  window={this.state.window}
                  table={this.state.table}
                  onClick={this.onClick}
                  vw={this.state.viewportWidth}
                />
              )}
              {this.state.eventCode === '' ? null : (
                <div className="create">
                  <button className="create_event">Submit times</button>
                  {/*onclick to submit the time info here */}
                </div>
              )}
              <Creds />
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
