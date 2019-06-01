import React, { Component } from 'react';
import { throttle } from 'throttle-debounce';
import TopBar from '../topBar/TopBar';
import Calendar from '../calendar/Calendar';
import Creds from '../Creds';
import '../../SASS/main.scss';
import CalendarIcon from '../calendar/CalendarIcon';
import WeekDays from '../calendar/weekSelect/weekDays/WeekDays';
import WeekSelect from '../calendar/weekSelect/WeekSelect';

import {
  getPreviousNextWeek,
  getPreviousNextDay,
  convertToAppDates,
  getInitTimes,
  convertToStdDates
} from '../../lib/library.js';
import { backend_url } from '../../lib/controller.js';

class InviteePage extends Component {
  constructor(props) {
    super(props)
    this.state = { dates: [] }
  }

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

  onTimeSelect = (e, datetime) => {
    e.preventDefault()
    var newTable = [...this.state.table]
    if (this.state.window === 1) {
      newTable.forEach(row => {
        var rowObj = convertToStdDates(Object.keys(row))
        Object.keys(row).forEach((key, i) => {
          var date = rowObj[i].getDate()
          if(date === parseInt(datetime)) {
            row[key] = !row[key]
          }
        })
      })
    } else {
      newTable.forEach(row => {
        Object.keys(row).forEach(key => {
          if(key === datetime) row[key] = !row[key]
        })
      })
    }
    this.setState({
      table: newTable
    })
  }

  initWindow = () => {
    // updates the viewport width
    this.setState({ viewportWidth: window.innerWidth });
  };

  componentWillMount() {
    var id = this.props.id
    this.getCalendarEvent(id).then(state => this.setState(state))
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

  weekButtonHandler = next => {
    var vw = this.state.viewportWidth
    var start = this.state.dates[0];
    var end = this.state.dates[6];
    if(vw < 624) {
      var mDate = convertToStdDates(this.state.mobileTable)
      mDate = mDate.map(md => getPreviousNextDay(md, next))
      mDate = convertToAppDates(mDate)
      var timewindows = []
      var times = getInitTimes(this.state.startTime, this.state.endTime);
      times.forEach(time => {
        timewindows.push(`${time}:00`);
        timewindows.push(`${time}:15`);
        timewindows.push(`${time}:30`);
        timewindows.push(`${time}:45`);
      });
      var mobileTable  = []
      timewindows.forEach(time => {
        mobileTable.push(`${mDate[0]} ${time}`);
      });
      if(!this.state.dates.includes(mDate[0])) {
        if (next) var week = getPreviousNextWeek(end, next);
        else week = getPreviousNextWeek(start, next);
        week = convertToAppDates(week);
        this.setState({
          dates: week
        });
      }
      this.setState({
        mobileTable: mobileTable
      })
    } else {
      if (next) week = getPreviousNextWeek(end, next);
      else week = getPreviousNextWeek(start, next);
      week = convertToAppDates(week);
      this.setState({
        dates: week
      });
    }
  };

  createdEvent = () => {
    var id = this.props.match.params.id
    var state = this.getCalendarEvent(id)
    this.setState(state)
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
    var body = { "state" : this.state }
    var api = backend_url + 'user'
    fetch(api, {
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        this.setState({eventCode: data.id})
      }.bind(this))
  }

  getCalendarEvent = (id) => {
    var api = backend_url + id
    return fetch(api, {
        method: 'GET',
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log('Got:', JSON.parse(JSON.stringify(data)).data.state);
        return JSON.parse(JSON.stringify(data)).data.state
      })
  }

  render() {
    const { dates } = this.state
    return dates.length ? (
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
                  mobileTable={this.state.mobileTable}
                  weekButtonHandler={this.weekButtonHandler}
                  vw={this.state.viewportWidth}
                />
                <WeekDays
                  vw={this.state.viewportWidth}
                  dates={this.state.dates}
                  mobileTable={this.state.mobileTable}
                  className="stickyScroll"
                />
              </div>
              <Calendar
                dates={this.state.dates}
                mobileTable={this.state.mobileTable}
                window={this.state.window}
                table={this.state.table}
                onTimeSelect={this.onTimeSelect}
                vw={this.state.viewportWidth}
              />
              <div className="create">
                <button className="create_event">
                        {/* //onClick={() => this.getCalendarEvent(props.match.params.id)}> */}
                  Submit times
                </button>
              </div>
              <Creds />
          </div>) : <span>Loading event dates...</span>
  }
}

export default InviteePage;
