function addDays(date, days) {
  var dat = new Date(date)
  dat.setDate(dat.getDate() + days);
  return dat
}

function subtractDays(date, days) {
  var dat = new Date(date)
  dat.setDate(dat.getDate() - days);
  return dat
}

var months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

function getInitDate() {
  var startOfWeek = getMondayOftheWeek()
  var endOfWeek = addDays(startOfWeek, 6)
  var week = getDates(startOfWeek, endOfWeek)
  return convertToAppDates(week)
}

function getInitTimes(start, end) {
  var startTime = start.split(' ')
  var endTime = end.split(' ')
  if(startTime[1] === "pm" && startTime[0]<12) start = Number(startTime[0])+12
  else if(startTime[1] === "am" && startTime[0]===12) start = Number(startTime[0])-12
  else start = Number(startTime[0])
  if(endTime[1] === "pm" && endTime[0]<12) end = Number(endTime[0])+12
  else if(endTime[1] === "am" && endTime[0]===12) end = Number(endTime[0])-12
  else end = Number(endTime[0])
  var times = []
  while(start <= end) {
    times.push(start)
    start++
  }
  return times
}

function getMondayOftheWeek() {
  var date = new Date()
  var day = date.getDay()
  var diff = date.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

function getDates(startDate, stopDate) {
 var dateArray = []
 var currentDate = startDate;
 while (currentDate <= stopDate) {
   dateArray.push(currentDate)
   currentDate = addDays(currentDate, 1);
 }
 return dateArray
}

function getPreviousNextWeek(date, next) {
  var weekArray = []
  var count = 1
  while (count <= 7) {    
    if(next) {
      var newdate = addDays(date, count)
    }
    else {
      newdate = subtractDays(date, count)
    }
    weekArray.push(newdate)
    count += 1
  }
  if(next === false) weekArray.reverse()
  return weekArray
}

function getPreviousNextDay(date, next) {
  if(next) {
    var newdate = addDays(date, 1)
  }
  else {
    newdate = subtractDays(date, 1)
  }
  return newdate
}

function convertToStdDates(dates) {
  return dates.map((date) => new Date(date))
}

function convertToAppDates(stdDates) {
  return stdDates.map((stdDate) => {
    return `${months[stdDate.getMonth()]} ${stdDate.getDate()}, ${stdDate.getFullYear()}`
  })
}

function fillCurrentTimes(dates, times) {
  let table = []
  let mobileTable = []
  //let today = convertToAppDates([new Date()])
  let timewindows = []
  times.forEach(time => {
    timewindows.push(`${time}:00`)
    timewindows.push(`${time}:15`)
    timewindows.push(`${time}:30`)
    timewindows.push(`${time}:45`)
  })
  timewindows.forEach(time => {
    var row = {}
    dates.forEach(date => {
      row[`${date} ${time}`] = 0
    })
    table.push(row)
    mobileTable.push(`${dates[0]} ${time}`)
  })
  return [table, mobileTable]
}

function resetSelection(table) {
  table.map(row => {
    for(var key in row) {
      row[key] = 0
    }
    return row
  })
  return table
}

function mapSelectedDateTimes(table, selection) {
  table.map(row => {
    var keys = Object.keys(row)
    keys.forEach(key => {
      if(selection.includes(key)) {
        if(row[key] === 0) row[key] = 1
      } else {
        if(row[key] === 1) row[key] = 0
      }
    })
    return row
  })
  return table
}

function mapInviteeSelectedDateTimes(table, inviteeSelection) {
  table.map(row => {
    var keys = Object.keys(row)
    keys.forEach(key => {
      if(inviteeSelection.includes(key)) {
        if(row[key] === 1) row[key] = 2
      } else {
        if(row[key] === 2) row[key] = 1
      }
    })
    return row
  })
  return table
}

function getTimezoneDifference(tz1, tz2) {
  if(tz1 === 'PST' && tz2 === 'MST') return 1
  else if(tz1 === 'PST' && tz2 === 'CST') return 2
  else if(tz1 === 'PST' && tz2 === 'EST') return 3
  else if(tz1 === 'PST' && tz2 === 'WET') return 8
  else if(tz1 === 'PST' && tz2 === 'CET') return 9
  else if(tz1 === 'PST' && tz2 === 'EET') return 10
  else if(tz1 === 'PST' && tz2 === 'FET') return 11

  else if(tz1 === 'MST' && tz2 === 'PST') return -1
  else if(tz1 === 'MST' && tz2 === 'CST') return 1
  else if(tz1 === 'MST' && tz2 === 'EST') return 2
  else if(tz1 === 'MST' && tz2 === 'WET') return 7
  else if(tz1 === 'MST' && tz2 === 'CET') return 8
  else if(tz1 === 'MST' && tz2 === 'EET') return 9
  else if(tz1 === 'MST' && tz2 === 'FET') return 10

  else if(tz1 === 'CST' && tz2 === 'PST') return -2
  else if(tz1 === 'CST' && tz2 === 'MST') return -1
  else if(tz1 === 'CST' && tz2 === 'EST') return 1
  else if(tz1 === 'CST' && tz2 === 'WET') return 6
  else if(tz1 === 'CST' && tz2 === 'CET') return 7
  else if(tz1 === 'CST' && tz2 === 'EET') return 8
  else if(tz1 === 'CST' && tz2 === 'FET') return 9

  else if(tz1 === 'EST' && tz2 === 'PST') return -3
  else if(tz1 === 'EST' && tz2 === 'MST') return -2
  else if(tz1 === 'EST' && tz2 === 'CST') return -1
  else if(tz1 === 'EST' && tz2 === 'WET') return 5
  else if(tz1 === 'EST' && tz2 === 'CET') return 6
  else if(tz1 === 'EST' && tz2 === 'EET') return 7
  else if(tz1 === 'EST' && tz2 === 'FET') return 8

  else if(tz1 === 'WET' && tz2 === 'PST') return -8
  else if(tz1 === 'WET' && tz2 === 'MST') return -7
  else if(tz1 === 'WET' && tz2 === 'CST') return -6
  else if(tz1 === 'WET' && tz2 === 'EST') return -5
  else if(tz1 === 'WET' && tz2 === 'CET') return 1
  else if(tz1 === 'WET' && tz2 === 'EET') return 2
  else if(tz1 === 'WET' && tz2 === 'FET') return 3

  else if(tz1 === 'CET' && tz2 === 'PST') return -9
  else if(tz1 === 'CET' && tz2 === 'MST') return -8
  else if(tz1 === 'CET' && tz2 === 'CST') return -7
  else if(tz1 === 'CET' && tz2 === 'EST') return -6
  else if(tz1 === 'CET' && tz2 === 'WET') return -1
  else if(tz1 === 'CET' && tz2 === 'EET') return 1
  else if(tz1 === 'CET' && tz2 === 'FET') return 2

  else if(tz1 === 'EET' && tz2 === 'PST') return -10
  else if(tz1 === 'EET' && tz2 === 'MST') return -9
  else if(tz1 === 'EET' && tz2 === 'CST') return -8
  else if(tz1 === 'EET' && tz2 === 'EST') return -7
  else if(tz1 === 'EET' && tz2 === 'WET') return -2
  else if(tz1 === 'EET' && tz2 === 'CET') return -1
  else if(tz1 === 'EET' && tz2 === 'FET') return 1

  else if(tz1 === 'FET' && tz2 === 'PST') return -11
  else if(tz1 === 'FET' && tz2 === 'MST') return -10
  else if(tz1 === 'FET' && tz2 === 'CST') return -9
  else if(tz1 === 'FET' && tz2 === 'EST') return -8
  else if(tz1 === 'FET' && tz2 === 'WET') return -3
  else if(tz1 === 'FET' && tz2 === 'CET') return -2
  else if(tz1 === 'FET' && tz2 === 'EET') return -1

  return 0
}

export { getPreviousNextWeek,
         getPreviousNextDay,
         getDates,
         convertToStdDates,
         convertToAppDates,
         getInitDate,
         getInitTimes,
         getMondayOftheWeek,
         fillCurrentTimes,
         resetSelection,
         mapSelectedDateTimes,
         mapInviteeSelectedDateTimes,
         getTimezoneDifference }