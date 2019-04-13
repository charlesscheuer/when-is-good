import React, { Component } from 'react'
import NumberDate from './NumberDate'
import WordDate from './WordDate'


export default class Weekdays extends Component {
  render() {
    return (
      <div>
      <div className="weekdays">
        <div className="weekdays_day">
          <NumberDate num={'4'} />
          <WordDate className="weekLetter" date={'Mon'}/>
        </div>
        <div className="weekdays_day">
          <NumberDate num={'5'} />
          <WordDate className="weekLetter" date={'Tue'}/>
        </div>
        <div className="weekdays_day">
          <NumberDate num={'6'} />
          <WordDate className="weekLetter" date={'Wed'}/>
        </div>
        <div className="weekdays_day">
          <NumberDate num={'7'} />
          <WordDate className="weekLetter" date={'Thu'}/>
        </div>
        <div className="weekdays_day">
          <NumberDate num={'8'} />
          <WordDate className="weekLetter" date={'Fri'}/>
        </div>
        <div className="weekdays_day">
          <NumberDate num={'9'} />
          <WordDate className="weekLetter" date={'Sat'}/>
        </div>
        <div className="weekdays_day">
          <NumberDate num={'10'} />
          <WordDate className="weekLetter" date={'Sun'}/>
        </div>    
      </div>
      </div>
      
    )
  }
}
